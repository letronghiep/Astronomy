"use client";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { htmlToMarkdown } from "~/lib/Parser";
function ReactQuillComponent(props) {
  const [value, setValue] = useState("");
  const reactQuillRef = useRef(null);
  const onChange = (content) => {
    setValue(content);
    if (props.onChange) {
      props.onChange({
        text: content,
        markdown: htmlToMarkdown(content),
      });
    }
  };
  return (
    <>
      <ReactQuill
        className="border-none max-h-full h-full w-full"
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
            handlers: {},
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
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default ReactQuillComponent;
