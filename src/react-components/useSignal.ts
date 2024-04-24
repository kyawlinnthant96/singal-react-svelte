import {useSyncExternalStore} from "react";
import {effect} from "../effect.ts";
import {Signal} from "signal-polyfill";

export function useSignal<T>(signal: Signal.State<T>): [T, (val: T) => void] {
    let value = signal.get();
    return [
        useSyncExternalStore(
            (cb) =>
                effect(() => {
                    value = signal.get();
                    cb();
                }),
            () => value,
            () => value,
        ),
        (value) => signal.set(value),
    ]
}

export function useComputed<T>(signal: Signal.Computed<T>): T {
    let value = signal.get();
    return useSyncExternalStore(
        (cb) =>
            effect(() => {
                value = signal.get();
                cb();
            }),
        ()=> value,
        () => value
    )
}
