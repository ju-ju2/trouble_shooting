import { message } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { useEffect, useState } from "react";

interface FileProps {}

interface State {
  isOpen: boolean;
  fileName: string;
  yamlValue: string;
  uploadProps: UploadProps;
}

interface Action {
  onClickModalOk: () => void;
  handleEditorOpenState: (state: boolean) => void;
  handleFileName: (name: string) => void;
  handleYamlValue: (value: string) => void;
}

type Controller = State & Action;

export const useFileReaderController = (props: FileProps = {}): Controller => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [yamlValue, setYamlValue] = useState<string>("");
  const [file, setFile] = useState<RcFile>();

  useEffect(() => {
    if (file) {
      const getFile = () => {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {
          if (typeof fileReader.result === "string") {
            setYamlValue(fileReader.result);
          }
        };
      };
      getFile();
    }
  }, [file]);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: "application/x-yaml",
    beforeUpload: () => false,
    onChange: (info) => {
      if (info.file.status !== "done") {
        const file = info.fileList[0]; // originFileObj 존재
        const fileName = file.name;
        setFileName(fileName);
        setFile(file.originFileObj);
      }
    },
  };

  const onClickModalOk = () => {
    setIsOpen(false);
    const handleConvertFile = (): File => {
      // Blob 객체로 변환
      // const blob = new Blob([yamlValue], { type: "application/x-yaml" });

      // File 객체로 다시 변환
      const file = new File([yamlValue], fileName, {
        type: "application/x-yaml",
      });

      return file;
    };
    handleConvertFile();
    console.log(handleConvertFile());
  };

  const handleEditorOpenState = (state: boolean) => {
    setIsOpen(state);
  };

  const handleFileName = (name: string) => setFileName(name);

  const handleYamlValue = (value: string) => setYamlValue(value);

  return {
    isOpen,
    fileName,
    yamlValue,
    uploadProps,
    onClickModalOk,
    handleEditorOpenState,
    handleFileName,
    handleYamlValue,
  };
};
