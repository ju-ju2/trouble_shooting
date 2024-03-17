import { notification as AntdNotification } from "antd";
import { IconType, NotificationInstance } from "antd/es/notification/interface";
import React, { createContext } from "react";

interface NotificationType {
  //   type?: IconType | "loading";
  message: string;
  description?: string;
  key?: React.Key;
}

interface GlobalContextContainerProps {
  children?: JSX.Element;
}

interface GlobalConfig {
  notification: ({}: NotificationType) => void;
  notificationApi: NotificationInstance;
}

export const GlobalContext = createContext<GlobalConfig | undefined>(undefined);

const GlobalContextContainer = ({
  children,
}: React.PropsWithChildren<GlobalContextContainerProps>): React.ReactElement => {
  const [notificationApi, contextHolder] = AntdNotification.useNotification();

  const notification = ({
    // type = "success",
    message,
    description,
    key,
  }: NotificationType) => {
    notificationApi.open({
      message,
      description,
      key,
    });
  };

  const value = {
    notification,
    notificationApi,
  };

  return (
    <GlobalContext.Provider value={value}>
      {contextHolder}
      <div>{children}</div>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "GlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

export default GlobalContextContainer;
