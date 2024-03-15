import { FC, lazy, LazyExoticComponent } from "react";

export interface Path {
  key: string;
  label: string; // 타이틀
  subtitle?: string; // 서브타이틀
  component?: LazyExoticComponent<FC>;
  authority?: string; // 메뉴 접근권한
  showMenu?: string; // 메뉴 표시여부, 3depth 부터 미사용
  noLayout?: boolean; // 헤더/사이드바 표시 여부
  noSidemenu?: boolean; // 사이드바 표시 여부
  children?: Path[]; // 서브 메뉴
}

export const enum PATH_LABEL {
  ERROR = "에러",
  TROUBLE_SHOOTING = "트러블 슈팅",
  TABLE = "테이블",
  TABLE_CHECKBOX = "체크박스 클릭",
  TABLE_CHECKBOX_DETAIL = "체크박스 상세",
  TABLE_PAGINATION = "페이지네이션",
  LIBRARY = "라이브러리",
  LIBRARY_CKEDITOR = "Ckeditor5",
}

export const paths: Path[] = [
  {
    label: PATH_LABEL.TROUBLE_SHOOTING,
    key: "/trouble_shooting",
    showMenu: "true",
    children: [
      {
        label: PATH_LABEL.TABLE_CHECKBOX,
        key: "/trouble_shooting/table/checkbox",
        component: lazy(
          () => import("../pages/table/check-column/CheckColumn")
        ),
        showMenu: "true",
        children: [
          {
            label: PATH_LABEL.TABLE_CHECKBOX_DETAIL,
            key: "/trouble_shooting/table/checkbox/detail",
            component: lazy(() => import("../pages/table/check-column/Detail")),
          },
        ],
      },
      {
        label: PATH_LABEL.TABLE_PAGINATION,
        key: "/trouble_shooting/table/pagination",
        component: lazy(() => import("../pages/table/pagination")),
        showMenu: "true",
      },
      {
        label: PATH_LABEL.LIBRARY_CKEDITOR,
        key: "/trouble_shooting/library/ckeditor",
        component: lazy(() => import("../pages/library/ck-editor5/Editor")),
        showMenu: "true",
      },
    ],
  },
  {
    label: PATH_LABEL.ERROR,
    key: "/*",
    component: lazy(() => import("../pages/error")),
    noLayout: true,
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
