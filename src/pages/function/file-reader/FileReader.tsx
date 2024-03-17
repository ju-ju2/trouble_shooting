import { Button, Flex, Input, Modal, Space, Upload } from "antd";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-textmate";
import { useFileReaderController } from "./useFileReaderController.ts";

const FileReader = () => {
  const {
    isOpen,
    fileName,
    yamlValue,
    uploadProps,
    onClickModalOk,
    handleEditorOpenState,
    handleFileName,
    handleYamlValue,
  } = useFileReaderController();

  return (
    <>
      <Space size={"small"} align="start">
        <Upload {...uploadProps}>
          <Button>File Upload</Button>
        </Upload>
        <Button onClick={() => handleEditorOpenState(true)}>open editor</Button>
      </Space>
      <Modal
        title="Editor"
        open={isOpen}
        onOk={onClickModalOk}
        onCancel={() => handleEditorOpenState(false)}
      >
        <Flex vertical gap={"8px"}>
          <Input
            placeholder="File Name"
            value={fileName}
            onChange={(e) => handleFileName(e.target.value)}
          />
          <AceEditor
            value={yamlValue}
            onChange={(e) => handleYamlValue(e)}
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
