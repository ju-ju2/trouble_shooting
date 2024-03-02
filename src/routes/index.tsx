// import DefaultLayout from 'components/layout';
import { ComponentType, LazyExoticComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { getAccessToken } from 'utils';
import ErrorBoundary from "./errorBoundary";
import Spinning from "../components/common/spinning";
import { routePaths } from "./paths";
import DefaultLayout from "../components/layout/DefaultLayout";

const Router = (): React.ReactElement => {
  return (
    <Suspense fallback={<Spinning />}>
      <ErrorBoundary>
        <Routes>
          {routePaths.map((path) => {
            const Component =
              path.component as LazyExoticComponent<ComponentType>;
            const Element = path.noLayout ? (
              <Component />
            ) : (
              <DefaultLayout>
                <Component />
              </DefaultLayout>
            );
            return <Route key={path.key} path={path.key} element={Element} />;
          })}
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Router;
