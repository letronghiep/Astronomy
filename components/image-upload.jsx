"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { upload_image } from "~/services/CKEditor/image";
import { htmlToMarkdown } from "~/lib/Parser";
import { toast } from "react-toastify";
import { Progress } from "flowbite-react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

const ImageUpload = (props) => {
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
      if (typeof document !== undefined) {

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
            console.log("====================================");
            console.log(quill);
            console.log("====================================");
            if (quill) {
              const range = quill.getEditorSelection();
              console.log("====================================");
              console.log(range);
              console.log("====================================");
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
      }
    } catch (error) {
      setProgress(0);
      setIsLoading(false); // Set loading state to false in case of error
      console.error("Error uploading image:", error);
    }
  }, []);
  const modules = {
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
  };

  return (
    <>
      <ReactQuill
        forwardedRef={reactQuillRef}
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
};
export default ImageUpload;
