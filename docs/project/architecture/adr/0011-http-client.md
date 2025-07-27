# ADR-0011: HTTPクライアント選定

## Status

Accepted

## Context

フロントエンドからバックエンドAPIへの通信、および将来的な外部システム連携において、HTTP通信クライアントライブラリの選定が必要となる。エラーハンドリング統一、型安全性、パフォーマンスを考慮した選択が求められる。

### Background

- フロントエンド（Next.js）からHono APIへの通信
- 将来的な外部API連携（認証・通知システム等）
- エラーハンドリングライブラリ（neverthrow）との統合
- オフライン対応・リトライ機能の実装

### Drivers

- エラーハンドリングの統一性
- TypeScript型安全性
- 設定の柔軟性とカスタマイズ性
- ブラウザ・Node.js両環境対応
- バンドルサイズとパフォーマンス

## Decision

### Chosen Option

選定技術: fetch (native)

シンプルかつモダンで標準技術であることを重視。クイズアプリのシンプルなAPI通信要件には十分で、追加依存なしでバンドルサイズを最小化できる。

### Alternatives Considered

以下の代替案を検討した：

| 選択肢 | メリット | デメリット | 適用場面 | 型安全性 | エラーハンドリング | 設定柔軟性 | 評価 |
|--------|----------|------------|----------|----------|------------------|------------|------|
| **fetch (native)** | **標準API<br>軽量<br>Promise対応<br>追加依存なし<br>モダンブラウザ対応** | **機能限定<br>設定繁雑<br>エラーハンドリング要実装** | **シンプル通信<br>軽量アプリ<br>モダンブラウザ限定<br>標準技術重視** | **無** | **低** | **低** | **★★★** |
| axios | 豊富な機能<br>エコシステム成熟<br>インターセプター<br>ブラウザ/Node両対応 | Bundle size大<br>設定複雑<br>TypeScript対応弱 | 複雑API連携<br>認証処理<br>エラーハンドリング | 低 | 中 | 高 | ★★ |
| ky | 軽量<br>TypeScript最適化<br>モダンAPI<br>Promise/async最適化 | エコシステム小<br>学習リソース少<br>企業採用実績少 | TypeScript重視<br>軽量アプリ<br>モダン開発 | 中 | 中 | 中 | ★ |

## Consequences

### Positive

- 標準API使用による長期安定性と将来性確保
- 追加依存なしによるバンドルサイズ最小化
- シンプルなAPI通信要件に最適
- モダンブラウザでの優秀なパフォーマンス
- 学習リソースが豊富（Web標準）

### Negative

- 高度なエラーハンドリング機能の手動実装が必要
- インターセプター機能なし（手動実装要）
- リクエスト/レスポンス変換の手動処理
- 型安全性は手動型定義で補完が必要

### Neutral

- 機能はシンプルだが、クイズアプリには十分
- neverthrowとの組み合わせでエラーハンドリング強化可能

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| エラーハンドリング複雑化 | 中 | 中 | neverthrow統合、共通エラー処理関数作成 |
| 型安全性不足 | 中 | 中 | openapi-typescript連携、型定義作成 |
| 機能不足による開発効率低下 | 低 | 低 | 必要時のユーティリティ関数作成 |

## Implementation Notes

### Action Items

- [ ] fetch API ベースクライアント設定の実装
- [ ] neverthrow との統合エラーハンドリング実装
- [ ] 共通リクエスト・レスポンス処理関数作成
- [ ] TypeScript型定義の整備

### Usage Guidelines

- fetch APIは共通ユーティリティ関数で統一
- エラーハンドリングは neverthrow Result型で統一
- タイムアウト・リトライ設定の標準化
- 型安全性は openapi-typescript で補完

### Configuration Example

```typescript
import { Result, err, ok } from 'neverthrow';

interface ApiResponse<T> {
  data: T;
  status: number;
}

const apiRequest = async <T>(
  endpoint: string, 
  options?: RequestInit
): Promise<Result<ApiResponse<T>, Error>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      }
    );

    if (!response.ok) {
      return err(new Error(`HTTP ${response.status}: ${response.statusText}`));
    }

    const data = await response.json();
    return ok({ data, status: response.status });
  } catch (error) {
    return err(error instanceof Error ? error : new Error('Unknown error'));
  }
};
```

### Timeline

- **決定日**: 2025-01-27
- **実装開始**: DDD設計工程
- **完了予定**: API設計工程

## References

- [axios 公式ドキュメント](https://axios-http.com/)
- [neverthrow HTTPクライアント統合例](https://github.com/supermacro/neverthrow#examples)
- [ADR-0010: バリデーションライブラリ選定](0010-validation-library.md)
- [docs/project/architecture/tech-selection.md](../tech-selection.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: [@tanacchi](https://github.com/tanacchi)
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
