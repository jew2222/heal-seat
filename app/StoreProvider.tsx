"use client";

import { Provider } from "react-redux";
import { useRef } from "react";
import { makeStore, AppStore } from "../lib/store";
//import { initializeCount } from "../lib/features/counter/counterSlice";

export default function StoreProvider({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(initializeCount(count));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
