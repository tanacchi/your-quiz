# ライブラリ使用ガイド（Your Quiz プロジェクト）

## 概要

Your Quizプロジェクトで採用しているライブラリの正しい使用方法、バージョン指定、禁止パターンと代替案を定義します。

## 採用ライブラリ一覧

### APIフレームワーク

#### Hono `^4.8.10`

**採用理由**: Cloudflare Workers最適化、TypeScript First、軽量性、高パフォーマンス

**基本使用法**:

```typescript
import { Hono, type Context } from "hono";

// アプリケーション初期化
const app = new Hono<{ Bindings: CloudflareBindings }>();

// ルート定義
app.get("/path", handler);
app.post("/path", handler);
app.put("/path/:id", handler);
app.delete("/path/:id", handler);

// コンテキスト型定義
type AppContext = Context<{ Bindings: CloudflareBindings }>;
```

**ベストプラクティス**:

- 型安全性のためのContext型の使用
- ミドルウェアの適切な設定
- エラーハンドリングの統一

**禁止パターン**:

```typescript
// ❌ 型なしの使用
const app = new Hono();

// ❌ 適切でないミドルウェア使用
app.use("/*", someBrokenMiddleware);
```

### エラーハンドリング

#### neverthrow `^8.2.0`

**採用理由**: TypeScript環境での型安全なResult型、関数型エラーハンドリング

**基本使用法**:

```typescript
import { Result, ok, err } from "neverthrow";

// Result型の定義
type ApiResult<T> = Result<T, string>;

// 成功ケース
const success = (): ApiResult<string> => ok("success");

// 失敗ケース
const failure = (): ApiResult<string> => err("error message");

// Result型の処理
const result = someOperation();
if (result.isErr()) {
  console.error(result.error);
  return;
}
console.log(result.value);
```

**推奨パターン**:

```typescript
// ✅ 非同期処理での使用
const fetchData = async (): Promise<Result<Data, string>> => {
  try {
    const data = await externalApiCall();
    return ok(data);
  } catch (error) {
    return err("EXTERNAL_API_ERROR");
  }
};

// ✅ チェーン処理
const processData = (input: string): Result<ProcessedData, string> => {
  return validateInput(input)
    .andThen(parseInput)
    .andThen(processInput)
    .map(formatOutput);
};
```

**禁止パターン**:

```typescript
// ❌ try-catchの直接使用（neverthrow使用時）
try {
  const result = riskyOperation();
  return result;
} catch (error) {
  throw new Error("Something went wrong");
}

// ❌ エラーの投げっぱなし
const badFunction = () => {
  if (someCondition) {
    throw new Error("Bad error handling");
  }
};
```

### バリデーション

#### Zod `^4.0.14`

**採用理由**: TypeScript統合、ランタイム型検証、豊富な検証機能

**基本使用法**:

```typescript
import { z } from "zod";

// 基本スキーマ定義
const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(120).optional(),
});

// 型の生成
type User = z.infer<typeof userSchema>;

// バリデーション実行
const result = userSchema.safeParse(userData);
if (result.success) {
  console.log(result.data); // 型安全なデータ
} else {
  console.error(result.error); // エラー詳細
}
```

**推奨パターン**:

```typescript
// ✅ TypeSpecとの整合性確保
const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

// ✅ カスタムバリデーション
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain uppercase letter")
  .regex(/[a-z]/, "Password must contain lowercase letter")
  .regex(/[0-9]/, "Password must contain number");

// ✅ 条件付きバリデーション
const quizSchema = z.object({
  type: z.enum(["multiple_choice", "free_text"]),
  options: z.array(z.string()).optional(),
}).refine((data) => {
  if (data.type === "multiple_choice") {
    return data.options && data.options.length >= 2;
  }
  return true;
}, "Multiple choice questions must have at least 2 options");
```

**禁止パターン**:

```typescript
// ❌ TypeSpecとの不整合
const badSchema = z.object({
  title: z.string(), // TypeSpecでは"question"フィールド
});

// ❌ エラーハンドリングなし
const data = schema.parse(input); // throwする可能性
```

### TypeScript

#### TypeScript `^5.9.2`

**採用理由**: 型安全性、最新機能、開発体験向上

**推奨設定**:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**ベストプラクティス**:

```typescript
// ✅ 適切な型定義
interface ApiHandler<T = unknown> {
  (c: AppContext): Promise<Response>;
}

// ✅ ユニオン型の活用
type QuizType = "boolean" | "free_text" | "single_choice" | "multiple_choice";

// ✅ ジェネリクスの活用
const createRepository = <T>(schema: z.ZodSchema<T>) => ({
  validate: (data: unknown): Result<T, string> => {
    const result = schema.safeParse(data);
    return result.success ? ok(result.data) : err("VALIDATION_ERROR");
  },
});
```

## Cloudflare Workers関連

### Wrangler

**バージョン**: `^4.27.0`

**基本コマンド**:

```bash
# 開発サーバー起動
pnpm dev

# デプロイ
pnpm deploy

# 型生成
pnpm cf-typegen
```

**設定ファイル例**:

```toml
# wrangler.toml
name = "your-quiz-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[env.production]
vars = { ENVIRONMENT = "production" }

[[env.production.d1_databases]]
binding = "DB"
database_name = "your-quiz-prod"
database_id = "xxx"
```

## テストライブラリ

### Vitest（推奨）

**採用理由**: Vite統合、高速、TypeScript対応

**基本使用法**:

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Hono } from "hono";

describe("API Tests", () => {
  let app: Hono;

  beforeEach(() => {
    app = new Hono();
    // setup
  });

  it("should handle GET request", async () => {
    const res = await app.request("/api/test");
    
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(expectedData);
  });

  it("should validate input", async () => {
    const mockHandler = vi.fn();
    
    // テストロジック
  });
});
```

## 開発ツール

### Biome（Linting & Formatting）

**採用理由**: 高速、TypeScript最適化、設定の単純化

**基本設定**:

```json
// biome.json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space"
  }
}
```

## 禁止ライブラリ・パターン

### 1. 型安全性を損なうライブラリ

```typescript
// ❌ 禁止: any型を助長するライブラリ
import someUnsafeLibrary from "unsafe-lib";

// ❌ 禁止: TypeScript未対応ライブラリ（型定義なし）
const legacyLib = require("legacy-library");
```

### 2. Cloudflare Workers非対応

```typescript
// ❌ 禁止: Node.js専用ライブラリ
import fs from "fs";
import path from "path";

// ❌ 禁止: ブラウザ専用API
import { localStorage } from "browser-storage";
```

### 3. パフォーマンス問題のあるライブラリ

```typescript
// ❌ 禁止: 重いライブラリ（バンドルサイズが大きい）
import massiveLibrary from "massive-lib"; // 500KB+

// ❌ 禁止: 同期的なブロッキング処理
import syncProcessor from "sync-heavy-lib";
```

## 代替案

### 除外されたライブラリとその代替

| 除外ライブラリ | 除外理由 | 代替案 |
|---------------|----------|--------|
| Chanfana | 型制約の問題 | Pure Hono実装 |
| axios | バンドルサイズ | native fetch |
| lodash | パフォーマンス | 必要な機能のみ自作 |
| moment.js | 重い | native Date API |
| express | Cloudflare Workers非対応 | Hono |

### 自作ヘルパー関数

```typescript
// lodash の代替
const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
};

const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};
```

## バージョン管理

### パッケージ更新時の注意点

1. **セマンティックバージョニングの遵守**
   - メジャーバージョンアップは慎重に検討
   - 破壊的変更の確認

2. **依存関係の競合チェック**

   ```bash
   pnpm list --depth=0
   pnpm audit
   ```

3. **TypeScript互換性の確認**
   - 新バージョンでの型エラーチェック
   - `pnpm typecheck` の実行

### 推奨更新スケジュール

- **セキュリティアップデート**: 即座に適用
- **パッチバージョン**: 月次で適用
- **マイナーバージョン**: 四半期で検討
- **メジャーバージョン**: 半年〜年次で検討

## 実装チェックリスト

新しいライブラリ導入時：

- [ ] TypeScript対応が完全である
- [ ] Cloudflare Workers互換性がある
- [ ] バンドルサイズが適切である（<50KB目安）
- [ ] メンテナンスが活発である
- [ ] 既存ライブラリと競合しない
- [ ] セキュリティ脆弱性がない
- [ ] プロジェクトの技術選定方針と一致する

このガイドに従って、一貫性と品質を保ったライブラリ使用を心がけてください。
