import {useEffect, useRef} from "react";

export function useInterval(callback: Function, delay: number = 300000) {
    const savedCallback = useRef<Function>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback && savedCallback.current) {
                savedCallback.current()
            }
        }

        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => {
                clearInterval(id)
            }
        }
    }, [callback, delay]);
}