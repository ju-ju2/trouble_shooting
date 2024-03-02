import React, { FC, ReactNode } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

interface DefaultLayoutProps {
  children: ReactNode; // children을 ReactNode로 타입 지정
}

const cx = classNames.bind(styles);
const { Header, Content, Sider } = Layout;

const headerMenu: MenuProps["items"] = ["트러블슈팅"].map((key) => ({
  key,
  label: key,
}));

const sideMenu: MenuProps["items"] = [
  {
    key: "table",
    label: "테이블",
    children: [
      {
        key: "checkbox_click",
        label: "체크박스 클릭",
      },
      {
        key: "pagination",
        label: "페이지네이션 ",
      },
    ],
  },
  {
    key: "router",
    label: "라우터",
    children: [
      {
        key: "router setting",
        label: "라우터 세팅",
      },
    ],
  },
];

const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className={cx("app")}>
      <Layout className={cx("layout")}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={headerMenu}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "white" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={sideMenu}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                background: "white",
                borderRadius: 8,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default DefaultLayout;
