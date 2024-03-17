import { Button, Flex, Input, Modal, Space, Upload, UploadProps } from "antd";
import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-textmate";

const FileReader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [yamlValue, setYamlValue] = useState<string>("");

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: "application/x-yaml",
    beforeUpload: () => false,
  };

  const onClickModalOk = () => {
    setIsOpen(false);
    // 추가 기능
  };

  return (
    <>
      <Space size={"small"}>
        <Upload {...uploadProps}>
          <Button>File Upload</Button>
        </Upload>
        <Button onClick={() => setIsOpen(true)}>open editor</Button>
      </Space>
      <Modal
        title="Editor"
        open={isOpen}
        onOk={onClickModalOk}
        onCancel={() => setIsOpen(false)}
      >
        <Flex vertical gap={"8px"}>
          <Input
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <AceEditor
            value={yamlValue}
            onChange={(e) => setYamlValue(e)}
            mode="yaml"
            theme="textmate"
            width="100%"
            height="400px"
            setOptions={{ useWorker: false }}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default FileReader;
