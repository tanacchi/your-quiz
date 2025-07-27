# API エンドポイント設計（一時保存）

このファイルは `communication-patterns.md` から移動された詳細API設計内容です。
API設計工程で使用してください。

## エンドポイント設計

| リソース | HTTP Method | エンドポイント | 説明 | レスポンス時間 |
|----------|-------------|----------------|------|---------------|
| **クイズ** | GET | `/api/quizzes` | クイズ一覧取得（タグフィルタ対応） | 100ms |
| **クイズ** | GET | `/api/quizzes/{id}` | 個別クイズ取得 | 50ms |
| **クイズ** | POST | `/api/quizzes` | クイズ作成（承認待ち） | 200ms |
| **回答** | POST | `/api/quizzes/{id}/answers` | 回答提出 | 100ms |
| **履歴** | GET | `/api/answers/history` | 回答履歴取得 | 150ms |
| **管理** | PATCH | `/api/admin/quizzes/{id}` | クイズ承認・非承認 | 200ms |

## データ形式標準化

```typescript
// 統一レスポンス形式
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
  };
}

// ページネーション対応
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}
```

---

**移動元**: `docs/project/architecture/communication-patterns.md`  
**移動日**: 2025-07-27  
**移動理由**: アーキテクチャ策定工程では詳細API設計は含めず、API設計工程で実施するため