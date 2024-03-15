import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";

const Editor = () => {
  return (
    <>
      <CKEditor editor={CustomEditor} />
    </>
  );
};

export default Editor;
