import React, { ErrorInfo, ReactNode } from "react";
import Error from "../pages/error";

class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("errorInfo: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
