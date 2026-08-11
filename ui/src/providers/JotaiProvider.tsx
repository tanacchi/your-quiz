"use client";

import { createStore, Provider } from "jotai";
import { type ReactNode, useState } from "react";

interface JotaiProviderProps {
  readonly children: ReactNode;
}

/**
 * jotai の Provider（ADR-0005）。
 *
 * `useState(() => createStore())` でコンポーネントインスタンスごとに
 * ストアを生成する。jotai は Provider 無しでもモジュールスコープの
 * 既定ストアで動作するが、Next.js の SSR ではモジュールスコープが
 * サーバー上の複数リクエスト間で共有されてしまうため、
 * リクエスト（= コンポーネントインスタンス）ごとに独立したストアを
 * 明示的に用意する。
 */
export function JotaiProvider({ children }: JotaiProviderProps) {
  const [store] = useState(() => createStore());
  return <Provider store={store}>{children}</Provider>;
}
