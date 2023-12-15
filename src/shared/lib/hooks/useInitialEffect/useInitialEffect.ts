import { useEffect } from "react";

/**
 * Эффект, который вызывается ОДИН РАЗ при инциализации компонента
 * @param callback
 */
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && __PROJECT_ENV__ !== "jest") {
            callback();
        }
        // eslint-disable-next-line
    }, []);
}
