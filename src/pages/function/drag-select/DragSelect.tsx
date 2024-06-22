import React, { useEffect, useRef, useState } from "react";
import styles from "./DragSelect.module.scss";
import classNames from "classnames/bind";
import Selecto from "react-selecto";
import { Col, Row } from "antd";

const cx = classNames.bind(styles);

const DragSelect = (props) => {
  return (
    <>
      <Selecto
        dragContainer={`.${cx("selecto-area")}`}
        selectableTargets={[`.${cx("item")}`]}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add(cx("selected"));
          });
          e.removed.forEach((el) => {
            el.classList.remove(cx("selected"));
          });
        }}
        hitRate={0}
        selectByClick={true}
        selectFromInside={true}
        continueSelect={false}
        continueSelectWithoutDeselect={true}
        toggleContinueSelect={"shift"}
        toggleContinueSelectWithoutDeselect={[["ctrl"], ["meta"]]}
        ratio={0}
      />
      <Row gutter={[16, 16]} className={cx("selecto-area")}>
        {Array.from({ length: 60 }, (_, idx) => (
          <Col span={6} key={idx}>
            <div className={cx("item")}></div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DragSelect;
