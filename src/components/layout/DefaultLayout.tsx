import React, { FC, ReactNode, useCallback } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import { Path, paths, routePaths } from "../../routes/paths";
import { MenuInfo, MenuItemType } from "rc-menu/lib/interface";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

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
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const topPage = routePaths.find(({ key }) =>
    matchPath({ path: key, end: false }, pathname)
  );
  // const showSider = !topPage?.noSidemenu ?? true;
  const getActivePaths = (paths: Path[], pathname: string) => {
    const node: {
      key: string;
      label: string;
      subtitle?: string;
    }[] = [];
    const skipNodes = ["/", "/*"];

    paths.map(({ key, label, subtitle, children }) => {
      const match = matchPath({ path: key, end: false }, pathname);

      if (match && !skipNodes.includes(key)) {
        node.push({ key, label, subtitle });
        if (children) {
          const childMatches = getActivePaths(children, pathname);
          node.push(...childMatches);
        }
      }
    });

    return node;
  };

  const makeMenuItems = (menus: Path[]): MenuItemType[] =>
    menus.map((menu: Path) => ({ key: menu.key, label: menu.label }));

  const mainMenuItems = makeMenuItems(paths.filter((path) => path.showMenu));

  const subMenuItems = makeMenuItems(
    paths.filter((path) => path.key === topPage?.key)[0].children ?? []
  );

  const activePaths = getActivePaths(paths, pathname);

  const selectedMainMenu = topPage?.key ? [topPage?.key] : [];

  const selectedSubMenu = subMenuItems
    .filter((menu) => pathname.includes(`${menu.key}`))
    .map((menu) => `${menu.key}`);

  const { label: pageTitle, subtitle: pageSubTitle } =
    activePaths[activePaths.length - 1];

  const getChildComponent = useCallback((child: Path): Path | undefined => {
    if (child.component) return child;
    if (child.children) return getChildComponent(child.children[0]);
    return;
  }, []);

  const onClickMenu = ({ key: menu }: MenuInfo) => {
    console.log("onClick menu");
    const path = routePaths.find(({ key }) => matchPath({ path: key }, menu));

    if (path?.component) {
      navigate(menu);
    } else if (path?.children) {
      const childWithComponent = getChildComponent(path?.children[0]);

      if (childWithComponent) {
        navigate(childWithComponent.key);
      }
    }
  };

  return (
    <div className={cx("app")}>
      <Layout className={cx("layout")}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["트러블슈팅"]}
            items={mainMenuItems}
            selectedKeys={selectedMainMenu}
            style={{ flex: 1, minWidth: 0 }}
            onClick={onClickMenu}
          />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "white" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["트러블슈팅"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={subMenuItems}
              selectedKeys={selectedSubMenu}
              onClick={onClickMenu}
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
