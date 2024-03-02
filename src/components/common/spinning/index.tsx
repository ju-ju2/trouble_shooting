import { Spin } from "antd";
import classNames from "classnames/bind";
import React from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface SpinningProps {
  style?: React.CSSProperties;
}

const Spinning = ({ style }: SpinningProps): React.ReactElement => {
  return (
    <div className={cx("wrapper")} style={style}>
      <Spin spinning size={"large"} />
    </div>
  );
};

export default Spinning;
