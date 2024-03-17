import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const handleChangePage = () => {
    navigate("/trouble_shooting/function/context/notification/detail");
  };
  return <Button onClick={handleChangePage}>페이지 이동</Button>;
};

export default Notification;
