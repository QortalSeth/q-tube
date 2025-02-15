import React from "react";

import ReactQuill, { Quill } from "react-quill-new";
import "./TextEditor.css";

// The quill-image-resize-module-react package does not have ts types defined,
// so the ts error must be ignored
// @ts-ignore
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const modules = {
  imageResize: {
    // This line crashes on release build, but NOT Dev Mode for some reason.  <_<
    // parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
  toolbar: [
    ["bold", "italic", "underline", "strike"], // styled text
    ["blockquote", "code-block"], // blocks
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }], // lists
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // custom button values
    [{ color: [] }, { background: [] }], // dropdown with defaults
    [{ font: [] }], // font family
    [{ align: [] }], // text align
    ["clean"], // remove formatting
  ],
};
export const TextEditor = ({ inlineContent, setInlineContent }) => {
  return (
    <ReactQuill
      theme="snow"
      value={inlineContent}
      onChange={setInlineContent}
      modules={modules}
    />
  );
};
