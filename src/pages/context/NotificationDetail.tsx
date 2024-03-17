import { Button, Space, Typography, notification } from "antd";
import { useGlobalContext } from "context/GlobalContext";
import { useNavigate } from "react-router-dom";

const NotificationDetail = () => {
  const navigate = useNavigate();

  // const [api, contextHolder] = notification.useNotification();

  // type NotificationType = "success" | "info" | "warning" | "error";

  // const onClickOpenNotification = (type: NotificationType = "success") => {
  //   api[type]({
  //     message: "Notification",
  //     description: "This is the content of the notification. ",
  //   });
  //   navigate(-1);
  // };

  const { notification } = useGlobalContext();
  const onClickOpenNotification = () => {
    notification({ message: "노티!" });
    navigate(-1);
  };
  return (
    <>
      {/* {contextHolder} */}
      <Space size={"small"}>
        <Typography.Text>상세페이지</Typography.Text>
        <Button onClick={() => onClickOpenNotification()}>notification</Button>
      </Space>
    </>
  );
};

export default NotificationDetail;
