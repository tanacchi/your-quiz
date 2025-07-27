# ADR-0005: 状態管理ライブラリ選定

## Status

Accepted

## Context

### Background

- クイズアプリケーションのフロントエンド状態管理ライブラリの選択が必要
- クイズ状態・回答履歴・オフライン同期等の管理が重要
- TypeScript統一による型安全性と開発体験向上を重視する
- **2025年最新データ**: Redux依然として最大シェア(1,452万DL/週)、Zustand急成長(854万DL/週)、原子的状態管理の台頭

### Drivers

- **クイズ状態管理**: 現在問題・回答状況・進捗管理
- **回答履歴管理**: ローカル・サーバー同期とオフライン対応
- **TypeScript対応**: 型安全性・IntelliSense・リファクタリング支援
- **学習コスト**: 小規模チームでの迅速な開発
- **軽量性**: モバイル環境でのパフォーマンス
- **Next.js統合**: SSR・ハイドレーション対応

## Decision

### Chosen Option

### Jotai

クイズ状態・履歴管理において理論的に美しい原子的状態管理を重視し、適度な複雑さを持つ状態依存関係に最適であることから、Jotaiを採用する。

**2025年調査結果**: Jotaiは原子的状態管理（~4KB）で細粒度レンダリング最適化、Zustandは軽量（~3KB）だがシンプルな要件向け。複雑な状態相互依存がある中規模アプリでのJotai選択は業界トレンドと一致。

### Alternatives Considered

| ライブラリ | メリット | デメリット | 適用場面 | TypeScript対応 | 学習コスト | バンドルサイズ | 判定 |
|-----------|----------|------------|----------|---------------|-----------|-------------|------|
| **Jotai** | **・原子的設計**<br>**・TypeScript対応**<br>**・軽量（~4KB）**<br>**・柔軟な構成**<br>**・React統合**<br>**・SSR対応**<br>**・細粒度レンダリング最適化**<br>**・useState+useContext代替** | **・概念理解必要**<br>**・エコシステム小**<br>**・デバッグ困難**<br>**・複雑依存関係**<br>**・atom管理コスト** | **・小中規模アプリ**<br>**・原子的状態**<br>**・TypeScript重視**<br>**・複雑な状態相互依存**<br>**・精密なレンダリング制御** | **★★★** | **中** | **★★★** | **○** |
| Zustand | ・軽量（~3KB）<br>・TypeScript最適<br>・設定シンプル<br>・React統合良好<br>・ボイラープレート最小<br>・SSR対応<br>・2025年成長率高（854万DL/週） | ・エコシステムはReduxより小<br>・複雑状態管理制限<br>・DevTools制限<br>・手動最適化必要 | ・中小規模アプリ<br>・TypeScript重視<br>・シンプル要件<br>・軽量性重視<br>・迅速プロトタイピング | ★★★ | 低 | ★★★ | △ |
| Redux Toolkit | ・成熟・安定<br>・DevTools充実<br>・パターン確立<br>・コミュニティ最大<br>・複雑状態対応<br>・ミドルウェア豊富<br>・エンタープライズ実績<br>・**業界標準（1,452万DL/週）** | ・設定複雑<br>・ボイラープレート多<br>・学習コスト高<br>・バンドルサイズ大<br>・小規模には過剰 | ・大規模アプリ<br>・複雑状態管理<br>・チーム開発<br>・長期運用<br>・エンタープライズ | ★★ | 高 | ★ | △ |
| Recoil | ・Meta製<br>・原子的設計<br>・非同期対応<br>・TypeScript対応<br>・React最適化 | ・**開発停滞中**<br>・**実験的ステータス継続**<br>・学習コスト高<br>・エコシステム限定<br>・**将来性リスク高** | ・**非推奨**<br>・Jotai移行検討 | ★★ | 中 | ★★ | **×** |
| MobX | ・リアクティブ<br>・TypeScript対応<br>・直感的<br>・オブザーバブル<br>・柔軟な設計 | ・学習コスト中<br>・パターン多様<br>・デバッグ困難<br>・バンドルサイズ中 | ・中規模アプリ<br>・リアクティブ重視<br>・OOP指向 | ★★ | 中 | ★★ | △ |
| TanStack Query | ・サーバー状態特化<br>・キャッシュ最適<br>・TypeScript対応<br>・非同期処理<br>・エラーハンドリング | ・サーバー状態のみ<br>・学習コスト中<br>・設定複雑<br>・クライアント状態別途 | ・API中心アプリ<br>・サーバー状態重視<br>・キャッシュ重要 | ★★★ | 中 | ★★ | △ |
| React Context | ・標準API<br>・追加ライブラリ不要<br>・TypeScript対応<br>・シンプル | ・パフォーマンス問題<br>・複雑状態困難<br>・ボイラープレート多<br>・DevTools なし | ・シンプル状態<br>・ライブラリ回避<br>・軽量重視 | ★★ | 低 | ★★★ | △ |

## Consequences

### Positive

- 原子的状態管理による理論的に美しい設計（~4KB）
- TypeScript型安全性とIntelliSense支援
- 細粒度レンダリング最適化による高パフォーマンス
- React統合とSSR対応による Next.js 親和性
- 複雑な状態相互依存関係への柔軟な対応
- 自動的なレンダリング最適化による開発効率向上
- **2025年のトレンド**: 複雑な状態相互依存がある中規模アプリでの推奨選択
- **atom依存関係**: 精密なレンダリング制御
- **関数型アプローチ**: 最小限で美しいコード

### Negative

- エコシステムの制約（Redux比較でプラグイン・ミドルウェア限定）
- 概念理解の学習コスト（原子的設計パターンの習得必要）
- DevToolsの機能制限（Redux DevToolsほど高機能でない）
- **atom管理コスト**: 原子的状態の管理・設計コスト
- **デバッグ困難**: 複雑な依存関係のデバッグが困難

### Neutral

- 原子的設計による柔軟な構成可能性
- TypeScript統合による型安全な開発環境

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 原子的設計の学習コスト増加 | 中 | 中 | 段階的導入、ドキュメント・サンプルコード充実化 |
| エコシステム制約による機能不足 | 低 | 低 | 必要機能の事前検証、カスタム実装オプション |
| atom依存関係デバッグの困難 | 中 | 低 | ログベースデバッグ、テスト充実化、atom設計の単純化 |

## Implementation Notes

### Action Items

- [ ] Jotai セットアップとNext.js統合
- [ ] TypeScript型定義設計（Atom interfaces）
- [ ] クイズ状態管理atom設計
- [ ] 回答履歴管理atom設計
- [ ] オフライン同期機能実装
- [ ] SSR・ハイドレーション対応確認

### 状態管理設計

```typescript
// クイズ状態atom
const currentQuizAtom = atom<Quiz | null>(null)
const answersAtom = atom<Answer[]>([])
const progressAtom = atom<QuizProgress>((get) => ({
  current: get(answersAtom).length,
  total: get(currentQuizAtom)?.questions.length ?? 0
}))

// 履歴管理atom
const historyAtom = atom<QuizHistory[]>([])
const syncStatusAtom = atom<'idle' | 'syncing' | 'error'>('idle')

// 派生atom
const addAnswerAtom = atom(
  null,
  (get, set, answer: Answer) => {
    set(answersAtom, [...get(answersAtom), answer])
  }
)
```

### Timeline

- **決定日**: 2025-01-27
- **見直し日**: 2025-07-27（Zustand → Jotai変更）
- **調査更新**: 2025-07-27（最新トレンド・データ反映）
- **実装開始**: フロントエンド実装フェーズ
- **完了予定**: 状態管理基盤完了時

### 2025年調査結果サマリー

**NPM週間ダウンロード数（2025年）**:

- Redux: 14,526,486 DL/週（業界標準）
- Zustand: 8,543,642 DL/週（急成長中）
- Jotai: 1,792,594 DL/週（原子的状態管理）
- Recoil: 533,741 DL/週（開発停滞）

**バンドルサイズ比較**:

- Zustand: ~3KB (軽量)
- Jotai: ~4KB (軽量)
- Redux Toolkit: 大（フル機能セット）

**2025年推奨パターン**:

- **小〜中規模（シンプル）**: Zustand
- **大規模・エンタープライズ**: Redux Toolkit
- **複雑な状態相互依存**: Jotai（本プロジェクト該当）
- **Recoil**: 新規採用非推奨（開発停滞）

## References

- [Jotai 公式ドキュメント](https://jotai.org/)
- [TypeScript with Jotai](https://jotai.org/docs/core/atom#typescript)
- [2025年状態管理比較 - Dev.to](https://dev.to/hijazi313/state-management-in-2025-when-to-use-context-redux-zustand-or-jotai-2d2k)
- [NPM Trends 2025](https://npmtrends.com/jotai-vs-react-redux-vs-recoil-vs-zustand)
- [Jotai vs Zustand Comparison](https://jotai.org/docs/basics/comparison)
- [ADR-0003: フロントエンドフレームワーク選定](0003-frontend-framework.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-07-27（Zustand → Jotai変更、最新調査データ反映）
**Authors**: Claude
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
