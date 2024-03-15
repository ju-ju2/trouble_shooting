import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const Editor = () => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: ["bold", "italic", "|", "indent", "outdent"],
        }}
      />
    </>
  );
};

export default Editor;
