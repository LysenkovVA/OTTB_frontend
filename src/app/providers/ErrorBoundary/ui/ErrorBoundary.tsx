import { Button, Result } from "antd";
import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.log(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            console.log("Render error boundary");
            // You can render any custom fallback UI
            return (
                <Result
                    status="500"
                    title="500"
                    subTitle="Что-то пошло не так"
                    extra={<Button type="primary">На главную</Button>}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
