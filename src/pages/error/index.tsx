import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface ErrorProps {}

const Error = (props: ErrorProps): React.ReactElement => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        존재하지 않는 페이지입니다.
        <br />
        <Link to="/trouble_shooting/table/checkbox">메인 페이지로 이동</Link>
      </div>
    </div>
  );
};

export default Error;
