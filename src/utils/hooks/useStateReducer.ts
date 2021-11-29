import { useReducer } from "react";

function reduce<T>(prevState: T, nextState: Partial<T>): T {
  return Object.assign({}, prevState, nextState);
}

export function useStateReducer<T>(
  initialState?: T
): [T, React.Dispatch<Partial<T>>] {
  return useReducer<(prevState: T, nextState: Partial<T>) => T>(
    reduce,
    initialState || ({} as T)
  );
}
