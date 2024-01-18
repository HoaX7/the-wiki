import { useEffect } from "react";

export const useWindowEvent = (event: string, callback: () => void) => {
    useEffect(() => {
        window.addEventListener(event, callback);
        return () => {
            window.removeEventListener(event, callback);
        };
    }, [callback]);
}