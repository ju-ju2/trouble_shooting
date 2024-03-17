import { Button, Modal, Space, Upload, UploadProps } from "antd";
import { useState } from "react";

const FileReader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: "application/x-yaml",
    beforeUpload: () => false,
  };

  const onClickOpenEditor = () => {
    setIsOpen(true);
  };

  const onClickOnOk = () => {
    setIsOpen(false);
    // 추가 기능
  };

  return (
    <>
      <Space size={"small"}>
        <Upload {...uploadProps}>
          <Button>File Upload</Button>
        </Upload>
        <Button onClick={onClickOpenEditor}>open editor</Button>
      </Space>
      <Modal
        title="Editor"
        open={isOpen}
        onOk={onClickOnOk}
        onCancel={() => setIsOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default FileReader;
