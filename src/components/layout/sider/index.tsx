import { Menu } from "antd";
import classNames from "classnames/bind";
import { MenuInfo, MenuItemType } from "rc-menu/lib/interface";
import React, { useCallback } from "react";
import { matchPath, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Path, routePaths } from "../../../routes/paths";

const cx = classNames.bind(styles);

interface SiderMenuProps {
  items: MenuItemType[];
  selectedKeys: string[];
}

const SiderMenu = ({
  items,
  selectedKeys,
}: SiderMenuProps): React.ReactElement => {
  const navigate = useNavigate();

  const getChildComponent = useCallback((child: Path): Path | undefined => {
    if (child.component) return child;
    if (child.children) return getChildComponent(child.children[0]);
    return;
  }, []);

  const onClick = ({ key: menu }: MenuInfo) => {
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
    <Menu
      className={cx("sider-menu")}
      mode="inline"
      selectedKeys={selectedKeys}
      items={items}
      onClick={onClick}
    />
  );
};

export default SiderMenu;
