"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { upload_image } from "~/services/CKEditor/image";
import "react-quill/dist/quill.snow.css";
import { htmlToMarkdown } from "~/lib/Parser";
import { toast } from "react-toastify";
import { Progress } from "flowbite-react";
function ImageUpload(props) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const reactQuillRef = useRef(null);
  const onChange = (content) => {
    setValue(content);
    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content),
      });
    }
  };
  const imageHandler = useCallback(() => {
    try {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.setAttribute("name", "files[]");
      input.multiple = true;
      input.click();
      input.onchange = async () => {
        if (input !== null && input.files !== null) {
          setIsLoading(true); // Set loading state to true
          const files = input.files;
          const url = await upload_image(files, setProgress);
          const quill = reactQuillRef.current;
          if (quill) {
            const range = quill.getEditorSelection();
            url.forEach((item) => {
              props.setImageUrl((prev) => [...prev, item]);
              range &&
                quill
                  .getEditor()
                  .insertEmbed(range.index, "image", item?.webContentLink);
            });
            toast.success("Uploaded!!!");
          }
          setProgress(0);
        }
        setIsLoading(false); // Set loading state to false in case of error
      };
    } catch (error) {
      setProgress(0);
      setIsLoading(false); // Set loading state to false in case of error
      console.error("Error uploading image:", error);
    }
  }, []);
  return (
    <>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        placeholder="Start writing..."
        modules={{
          toolbar: {
            container: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["code-block"],
              ["clean"],
            ],
            handlers: {
              image: imageHandler,
            },
          },

          clipboard: {
            matchVisual: false,
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
          "code-block",
        ]}
        value={value || props.text}
        onChange={onChange}
        style={{ height: "85%" }}
      />
      {isLoading && <Progress progress={progress} size="md" color="dark" />}
    </>
  );
}

export default ImageUpload;
