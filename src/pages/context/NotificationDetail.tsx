import { Button, Space, Typography } from "antd";
import { useGlobalContext } from "context/GlobalContext";
import { useNavigate } from "react-router-dom";

const NotificationDetail = () => {
  const navigate = useNavigate();

  const { notification } = useGlobalContext();
  const onClickOpenNotification = () => {
    notification({ message: "노티!😵" });
    navigate(-1);
  };
  return (
    <Space size={"small"}>
      <Typography.Text>상세페이지</Typography.Text>
      <Button onClick={() => onClickOpenNotification()}>notification</Button>
    </Space>
  );
};

export default NotificationDetail;
