import { FC, lazy, LazyExoticComponent } from "react";

export interface Path {
  key: string;
  label: string; // 타이틀
  subtitle?: string; // 서브타이틀
  component?: LazyExoticComponent<FC>;
  authority?: string; // 메뉴 접근권한
  showMenu?: string; // 메뉴 표시여부, 3depth 부터 미사용
  // noAuthication?: boolean; // 인증없이 접근 가능한 페이지 여부
  noLayout?: boolean; // 헤더/사이드바 표시 여부
  noSidemenu?: boolean; // 사이드바 표시 여부
  children?: Path[]; // 서브 메뉴
}

export const enum PATH_LABEL {
  ERROR = "에러",
  TABLE = "테이블",
}

export const paths: Path[] = [
  {
    label: PATH_LABEL.TABLE,
    key: "/table",
    component: lazy(() => import("../pages/table/CheckColumn")),
    showMenu: "true",
    noSidemenu: true,
  },
  {
    label: PATH_LABEL.ERROR,
    key: "/*",
    component: lazy(() => import("../pages/error")),
    noLayout: true,
    // noAuthication: true,
  },
];

const flatPaths = (path: Path) => {
  const paths: Path[] = [];
  const children = path.children?.map((child) => flatPaths(child)).flat() ?? [];

  paths.push(path);
  children.map((child) => paths.push(child));

  return paths;
};

export const routePaths = paths.map((path: Path) => flatPaths(path)).flat();
