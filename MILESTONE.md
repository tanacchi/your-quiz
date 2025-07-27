# 開発マイルストーン：クイズアプリケーション

## 📋 プロジェクト概要

### 技術スタック

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + Zustand
- **Backend**: Hono + TypeScript + Cloudflare Workers
- **Database**: D1 Database (SQLite互換)
- **ORM**: Drizzle ORM
- **開発ツール**: Biome (Lint/Format)
- **CI/CD**: GitHub Actions
- **ホスティング**: Vercel (Frontend) + Cloudflare Workers (Backend)

### アーキテクチャ

- **システム**: モジュラーモノリス
- **アプリケーション**: ヘキサゴナルアーキテクチャ
- **通信**: 同期REST API + オフライン対応

---

## 🎯 Phase 1: 環境セットアップ・基盤構築

### Milestone 1.1: 開発環境セットアップ

#### ✅ 1.1.1 Node.js環境構築

```bash
# Node.js 18以上をインストール
node --version  # v18.0.0以上確認

# pnpm インストール (高速パッケージマネージャー)
npm install -g pnpm
pnpm --version
```

#### ✅ 1.1.2 GitHubリポジトリ初期化

```bash
# GitHubで新しいリポジトリ作成: your-quiz
git clone https://github.com/[username]/your-quiz.git
cd your-quiz

# 初期コミット
echo "# Your Quiz Application" > README.md
git add README.md
git commit -m "Initial commit"
git push origin main
```

#### ✅ 1.1.3 モノレポ構造作成

```bash
# プロジェクト構造作成
mkdir -p {frontend,backend,shared,docs}
mkdir -p shared/{types,utils}
mkdir -p docs/{architecture,api}

# パッケージ管理設定
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - frontend
  - backend
  - shared/*
EOF

# ルートレベルのpackage.json
cat > package.json << 'EOF'
{
  "name": "your-quiz",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"pnpm --filter frontend dev\" \"pnpm --filter backend dev\"",
    "build": "pnpm --filter shared build && pnpm --filter backend build && pnpm --filter frontend build",
    "lint": "pnpm -r lint",
    "type-check": "pnpm -r type-check",
    "test": "pnpm -r test",
    "clean": "pnpm -r clean"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "@biomejs/biome": "^1.4.1",
    "typescript": "^5.3.3"
  }
}
EOF

pnpm install
```

#### ✅ 1.1.4 Biome設定 (Lint/Format統一)

```bash
# Biome設定ファイル作成
cat > biome.json << 'EOF'
{
  "$schema": "https://biomejs.dev/schemas/1.4.1/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "useImportType": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingComma": "es5",
      "semicolons": "always"
    }
  },
  "json": {
    "formatter": {
      "trailingCommas": "none"
    }
  }
}
EOF
```

### Milestone 1.2: Shared Types・Utilities作成

#### ✅ 1.2.1 共通型定義パッケージ

```bash
cd shared
mkdir types
cd types

# package.json
cat > package.json << 'EOF'
{
  "name": "@your-quiz/types",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist",
    "lint": "biome check src",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
EOF

# TypeScript設定
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
EOF

# 共通型定義
mkdir src
cat > src/quiz.ts << 'EOF'
export interface Quiz {
  id: string;
  question: string;
  correctAnswer: boolean;
  explanation?: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  approvedAt?: Date;
  createdByHash: string;
}

export interface CreateQuizRequest {
  question: string;
  correctAnswer: boolean;
  explanation?: string;
  tags: string[];
}

export interface QuizListQuery {
  tags?: string[];
  limit?: number;
  offset?: number;
}
EOF

cat > src/answer.ts << 'EOF'
export interface Answer {
  id: string;
  quizId: string;
  userAnswer: boolean;
  isCorrect: boolean;
  answeredAt: Date;
  syncStatus: 'pending' | 'synced';
}

export interface SubmitAnswerRequest {
  quizId: string;
  userAnswer: boolean;
}

export interface AnswerHistory {
  answers: Answer[];
  total: number;
  correctCount: number;
  accuracy: number;
}
EOF

cat > src/api.ts << 'EOF'
export interface ApiResponse<T = unknown> {
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

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}
EOF

cat > src/index.ts << 'EOF'
export * from './quiz';
export * from './answer';
export * from './api';
EOF

cd ../..
```

#### ✅ 1.2.2 共通ユーティリティパッケージ

```bash
cd shared
mkdir utils
cd utils

# package.json
cat > package.json << 'EOF'
{
  "name": "@your-quiz/utils",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch", 
    "clean": "rm -rf dist",
    "lint": "biome check src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "nanoid": "^5.0.4"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.10.5"
  }
}
EOF

# TypeScript設定
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
EOF

mkdir src

# ID生成ユーティリティ
cat > src/id.ts << 'EOF'
import { nanoid } from 'nanoid';

export const generateId = (): string => nanoid();

export const generateUserHash = (salt: string): string => {
  // 簡易的なハッシュ生成（本番環境ではより堅牢な実装を使用）
  const timestamp = Date.now().toString();
  const randomPart = nanoid(8);
  return btoa(salt + timestamp + randomPart).slice(0, 32);
};
EOF

# バリデーションユーティリティ
cat > src/validation.ts << 'EOF'
export const validateQuizQuestion = (question: string): string[] => {
  const errors: string[] = [];
  
  if (!question.trim()) {
    errors.push('問題文は必須です');
  }
  
  if (question.length > 500) {
    errors.push('問題文は500文字以内で入力してください');
  }
  
  return errors;
};

export const validateQuizExplanation = (explanation?: string): string[] => {
  const errors: string[] = [];
  
  if (explanation && explanation.length > 1000) {
    errors.push('解説は1000文字以内で入力してください');
  }
  
  return errors;
};

export const validateTags = (tags: string[]): string[] => {
  const errors: string[] = [];
  
  if (tags.length > 10) {
    errors.push('タグは10個以内で設定してください');
  }
  
  for (const tag of tags) {
    if (tag.length > 50) {
      errors.push('タグは50文字以内で入力してください');
      break;
    }
    
    if (!/^[a-zA-Z0-9ひらがなカタカナ漢字]+$/.test(tag)) {
      errors.push('タグは英数字・日本語のみ使用可能です');
      break;
    }
  }
  
  return errors;
};
EOF

# 時間ユーティリティ
cat > src/time.ts << 'EOF'
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const isRecent = (date: Date, hoursAgo = 24): boolean => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff < hoursAgo * 60 * 60 * 1000;
};
EOF

cat > src/index.ts << 'EOF'
export * from './id';
export * from './validation';
export * from './time';
EOF

cd ../..
```

### Milestone 1.3: Backend (Cloudflare Workers + Hono) セットアップ

#### ✅ 1.3.1 Cloudflare Workers環境構築

```bash
cd backend

# Cloudflare Workers CLI インストール
npm install -g wrangler

# Cloudflare にログイン
wrangler login

# プロジェクト初期化
cat > package.json << 'EOF'
{
  "name": "@your-quiz/backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "build": "tsc && wrangler deploy --dry-run",
    "lint": "biome check src",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "wrangler d1 migrations apply your-quiz-db",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "hono": "^3.12.6",
    "drizzle-orm": "^0.29.1",
    "zod": "^3.22.4",
    "@your-quiz/types": "workspace:*",
    "@your-quiz/utils": "workspace:*"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20231218.0",
    "drizzle-kit": "^0.20.6",
    "typescript": "^5.3.3"
  }
}
EOF

pnpm install
```

#### ✅ 1.3.2 Wrangler設定

```bash
# wrangler.toml設定
cat > wrangler.toml << 'EOF'
name = "your-quiz-api"
main = "src/index.ts"
compatibility_date = "2023-12-01"

[env.development]
name = "your-quiz-api-dev"

[env.production]
name = "your-quiz-api-prod"

[[d1_databases]]
binding = "DB"
database_name = "your-quiz-db"
database_id = "" # 後で設定

[vars]
ENVIRONMENT = "development"
EOF

# TypeScript設定
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "checkJs": false,
    "declaration": false,
    "declarationMap": false,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "strict": true,
    "noEmit": true,
    "types": ["@cloudflare/workers-types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

#### ✅ 1.3.3 D1データベースセットアップ

```bash
# D1データベース作成
wrangler d1 create your-quiz-db

# 出力されたdatabase_idをwrangler.tomlに設定
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# Drizzle設定
cat > drizzle.config.ts << 'EOF'
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: './wrangler.toml',
    dbName: 'your-quiz-db',
  },
} satisfies Config;
EOF

mkdir -p src/db

# データベーススキーマ定義
cat > src/db/schema.ts << 'EOF'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const quizzes = sqliteTable('quizzes', {
  id: text('id').primaryKey(),
  question: text('question').notNull(),
  correctAnswer: integer('correct_answer', { mode: 'boolean' }).notNull(),
  explanation: text('explanation'),
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull().default(sql`'[]'`),
  status: text('status').$type<'pending' | 'approved' | 'rejected'>().notNull().default('pending'),
  createdAt: real('created_at').notNull().default(sql`(unixepoch())`),
  approvedAt: real('approved_at'),
  createdByHash: text('created_by_hash').notNull(),
});

export const answerEvents = sqliteTable('answer_events', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id').notNull().references(() => quizzes.id),
  userHash: text('user_hash').notNull(),
  userAnswer: integer('user_answer', { mode: 'boolean' }).notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull(),
  answeredAt: real('answered_at').notNull().default(sql`(unixepoch())`),
  sourceIp: text('source_ip'),
  userAgent: text('user_agent'),
});

export const approvalLogs = sqliteTable('approval_logs', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id').notNull().references(() => quizzes.id),
  action: text('action').$type<'approve' | 'reject'>().notNull(),
  reason: text('reason'),
  adminId: text('admin_id').notNull(),
  performedAt: real('performed_at').notNull().default(sql`(unixepoch())`),
});

export type Quiz = typeof quizzes.$inferSelect;
export type NewQuiz = typeof quizzes.$inferInsert;
export type AnswerEvent = typeof answerEvents.$inferSelect;
export type NewAnswerEvent = typeof answerEvents.$inferInsert;
export type ApprovalLog = typeof approvalLogs.$inferSelect;
export type NewApprovalLog = typeof approvalLogs.$inferInsert;
EOF

# マイグレーション生成・実行
pnpm db:generate
pnpm db:migrate
```

#### ✅ 1.3.4 Hono アプリケーション実装

```bash
mkdir -p src/{routes,middleware,services,repositories}

# 型定義
cat > src/types.ts << 'EOF'
export interface Env {
  DB: D1Database;
  ENVIRONMENT: string;
}

export interface Variables {
  requestId: string;
  startTime: number;
}
EOF

# ミドルウェア実装
cat > src/middleware/cors.ts << 'EOF'
import { createMiddleware } from 'hono/factory';

export const corsMiddleware = () => createMiddleware(async (c, next) => {
  const origin = c.req.header('origin');
  
  // 許可するオリジンの設定
  const allowedOrigins = [
    'http://localhost:3000',
    'https://your-quiz-frontend.vercel.app', // 実際のVercelドメインに変更
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    c.header('Access-Control-Allow-Origin', origin);
  }
  
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.header('Access-Control-Max-Age', '86400');
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  
  await next();
});
EOF

cat > src/middleware/logger.ts << 'EOF'
import { createMiddleware } from 'hono/factory';
import type { Variables } from '../types';

export const loggerMiddleware = () => createMiddleware<{ Variables: Variables }>(async (c, next) => {
  const start = Date.now();
  const requestId = crypto.randomUUID();
  
  c.set('requestId', requestId);
  c.set('startTime', start);
  
  console.log(`[${requestId}] ${c.req.method} ${c.req.url}`);
  
  await next();
  
  const duration = Date.now() - start;
  console.log(`[${requestId}] Completed in ${duration}ms`);
});
EOF

# リポジトリ実装
cat > src/repositories/quiz.ts << 'EOF'
import { drizzle } from 'drizzle-orm/d1';
import { eq, desc, and, sql } from 'drizzle-orm';
import { quizzes, type Quiz, type NewQuiz } from '../db/schema';

export class QuizRepository {
  private db;
  
  constructor(d1: D1Database) {
    this.db = drizzle(d1);
  }
  
  async findById(id: string): Promise<Quiz | null> {
    const result = await this.db
      .select()
      .from(quizzes)
      .where(eq(quizzes.id, id))
      .limit(1);
    
    return result[0] || null;
  }
  
  async findApproved(limit = 50, offset = 0, tags?: string[]): Promise<Quiz[]> {
    let query = this.db
      .select()
      .from(quizzes)
      .where(eq(quizzes.status, 'approved'))
      .orderBy(desc(quizzes.createdAt))
      .limit(limit)
      .offset(offset);
    
    // タグフィルタリング（簡易実装）
    if (tags && tags.length > 0) {
      // SQLiteのJSON操作は制限的なので、シンプルなLIKE検索
      const tagConditions = tags.map(tag => 
        sql`${quizzes.tags} LIKE ${'%"' + tag + '"%'}`
      );
      query = query.where(and(...tagConditions));
    }
    
    return await query;
  }
  
  async create(quiz: NewQuiz): Promise<Quiz> {
    const result = await this.db
      .insert(quizzes)
      .values(quiz)
      .returning();
    
    return result[0];
  }
  
  async updateStatus(id: string, status: 'approved' | 'rejected', approvedAt?: number): Promise<void> {
    await this.db
      .update(quizzes)
      .set({ status, approvedAt })
      .where(eq(quizzes.id, id));
  }
}
EOF

cat > src/repositories/answer.ts << 'EOF'
import { drizzle } from 'drizzle-orm/d1';
import { eq, desc, count } from 'drizzle-orm';
import { answerEvents, type AnswerEvent, type NewAnswerEvent } from '../db/schema';

export class AnswerRepository {
  private db;
  
  constructor(d1: D1Database) {
    this.db = drizzle(d1);
  }
  
  async create(answer: NewAnswerEvent): Promise<AnswerEvent> {
    const result = await this.db
      .insert(answerEvents)
      .values(answer)
      .returning();
    
    return result[0];
  }
  
  async findByUserHash(userHash: string, limit = 50, offset = 0): Promise<AnswerEvent[]> {
    return await this.db
      .select()
      .from(answerEvents)
      .where(eq(answerEvents.userHash, userHash))
      .orderBy(desc(answerEvents.answeredAt))
      .limit(limit)
      .offset(offset);
  }
  
  async getUserStats(userHash: string): Promise<{ total: number; correct: number }> {
    const [totalResult, correctResult] = await Promise.all([
      this.db
        .select({ count: count() })
        .from(answerEvents)
        .where(eq(answerEvents.userHash, userHash)),
      this.db
        .select({ count: count() })
        .from(answerEvents)
        .where(eq(answerEvents.userHash, userHash))
        .where(eq(answerEvents.isCorrect, true))
    ]);
    
    return {
      total: totalResult[0]?.count || 0,
      correct: correctResult[0]?.count || 0,
    };
  }
}
EOF

# サービス実装
cat > src/services/quiz.ts << 'EOF'
import { QuizRepository } from '../repositories/quiz';
import { generateId } from '@your-quiz/utils';
import { validateQuizQuestion, validateQuizExplanation, validateTags } from '@your-quiz/utils';
import type { CreateQuizRequest, Quiz } from '@your-quiz/types';

export class QuizService {
  constructor(private quizRepo: QuizRepository) {}
  
  async getApprovedQuizzes(limit = 50, offset = 0, tags?: string[]): Promise<Quiz[]> {
    return await this.quizRepo.findApproved(limit, offset, tags);
  }
  
  async getQuizById(id: string): Promise<Quiz | null> {
    const quiz = await this.quizRepo.findById(id);
    
    // 承認済みのクイズのみ返却
    if (quiz && quiz.status === 'approved') {
      return quiz;
    }
    
    return null;
  }
  
  async createQuiz(request: CreateQuizRequest, createdByHash: string): Promise<Quiz> {
    // バリデーション
    const errors = [
      ...validateQuizQuestion(request.question),
      ...validateQuizExplanation(request.explanation),
      ...validateTags(request.tags),
    ];
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    const newQuiz = {
      id: generateId(),
      question: request.question.trim(),
      correctAnswer: request.correctAnswer,
      explanation: request.explanation?.trim() || null,
      tags: request.tags,
      status: 'pending' as const,
      createdAt: Date.now() / 1000,
      createdByHash,
    };
    
    return await this.quizRepo.create(newQuiz);
  }
}
EOF

cat > src/services/answer.ts << 'EOF'
import { AnswerRepository } from '../repositories/answer';
import { QuizRepository } from '../repositories/quiz';
import { generateId } from '@your-quiz/utils';
import type { SubmitAnswerRequest, AnswerHistory } from '@your-quiz/types';

export class AnswerService {
  constructor(
    private answerRepo: AnswerRepository,
    private quizRepo: QuizRepository
  ) {}
  
  async submitAnswer(request: SubmitAnswerRequest, userHash: string, sourceIp?: string, userAgent?: string) {
    // クイズの存在確認
    const quiz = await this.quizRepo.findById(request.quizId);
    if (!quiz || quiz.status !== 'approved') {
      throw new Error('Quiz not found or not approved');
    }
    
    const isCorrect = request.userAnswer === quiz.correctAnswer;
    
    const answerEvent = {
      id: generateId(),
      quizId: request.quizId,
      userHash,
      userAnswer: request.userAnswer,
      isCorrect,
      answeredAt: Date.now() / 1000,
      sourceIp,
      userAgent,
    };
    
    await this.answerRepo.create(answerEvent);
    
    return {
      isCorrect,
      correctAnswer: quiz.correctAnswer,
      explanation: quiz.explanation,
    };
  }
  
  async getAnswerHistory(userHash: string, limit = 50, offset = 0): Promise<AnswerHistory> {
    const [answers, stats] = await Promise.all([
      this.answerRepo.findByUserHash(userHash, limit, offset),
      this.answerRepo.getUserStats(userHash),
    ]);
    
    return {
      answers: answers.map(a => ({
        id: a.id,
        quizId: a.quizId,
        userAnswer: a.userAnswer,
        isCorrect: a.isCorrect,
        answeredAt: new Date(a.answeredAt * 1000),
        syncStatus: 'synced' as const,
      })),
      total: stats.total,
      correctCount: stats.correct,
      accuracy: stats.total > 0 ? stats.correct / stats.total : 0,
    };
  }
}
EOF

# ルート実装
cat > src/routes/quiz.ts << 'EOF'
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { QuizService } from '../services/quiz';
import { QuizRepository } from '../repositories/quiz';
import { generateUserHash } from '@your-quiz/utils';
import type { Env, Variables } from '../types';

const quiz = new Hono<{ Bindings: Env; Variables: Variables }>();

const createQuizSchema = z.object({
  question: z.string().min(1).max(500),
  correctAnswer: z.boolean(),
  explanation: z.string().max(1000).optional(),
  tags: z.array(z.string().max(50)).max(10),
});

const querySchema = z.object({
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
  offset: z.string().transform(Number).pipe(z.number().min(0)).optional(),
  tags: z.string().transform(val => val.split(',')).optional(),
});

quiz.get('/', zValidator('query', querySchema), async (c) => {
  const { limit = 50, offset = 0, tags } = c.req.valid('query');
  
  const quizRepo = new QuizRepository(c.env.DB);
  const quizService = new QuizService(quizRepo);
  
  try {
    const quizzes = await quizService.getApprovedQuizzes(limit, offset, tags);
    
    return c.json({
      success: true,
      data: quizzes,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: c.get('requestId'),
      },
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return c.json({
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch quizzes',
      },
    }, 500);
  }
});

quiz.get('/:id', async (c) => {
  const id = c.req.param('id');
  
  const quizRepo = new QuizRepository(c.env.DB);
  const quizService = new QuizService(quizRepo);
  
  try {
    const quiz = await quizService.getQuizById(id);
    
    if (!quiz) {
      return c.json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Quiz not found',
        },
      }, 404);
    }
    
    return c.json({
      success: true,
      data: quiz,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: c.get('requestId'),
      },
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return c.json({
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch quiz',
      },
    }, 500);
  }
});

quiz.post('/', zValidator('json', createQuizSchema), async (c) => {
  const body = c.req.valid('json');
  
  // 簡易的なユーザーハッシュ生成（実際のIPアドレス + User-Agent）
  const sourceIp = c.req.header('CF-Connecting-IP') || 'unknown';
  const userAgent = c.req.header('User-Agent') || 'unknown';
  const createdByHash = generateUserHash(sourceIp + userAgent);
  
  const quizRepo = new QuizRepository(c.env.DB);
  const quizService = new QuizService(quizRepo);
  
  try {
    const quiz = await quizService.createQuiz(body, createdByHash);
    
    return c.json({
      success: true,
      data: quiz,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: c.get('requestId'),
      },
    }, 201);
  } catch (error) {
    console.error('Error creating quiz:', error);
    
    if (error instanceof Error && error.message.includes('Validation failed')) {
      return c.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.message,
        },
      }, 400);
    }
    
    return c.json({
      success: false,
      error: {
        code: 'CREATE_ERROR',
        message: 'Failed to create quiz',
      },
    }, 500);
  }
});

export { quiz };
EOF

cat > src/routes/answer.ts << 'EOF'
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { AnswerService } from '../services/answer';
import { AnswerRepository } from '../repositories/answer';
import { QuizRepository } from '../repositories/quiz';
import { generateUserHash } from '@your-quiz/utils';
import type { Env, Variables } from '../types';

const answer = new Hono<{ Bindings: Env; Variables: Variables }>();

const submitAnswerSchema = z.object({
  userAnswer: z.boolean(),
});

const historyQuerySchema = z.object({
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
  offset: z.string().transform(Number).pipe(z.number().min(0)).optional(),
});

// ユーザーハッシュ生成ヘルパー
const getUserHash = (c: any): string => {
  const sourceIp = c.req.header('CF-Connecting-IP') || 'unknown';
  const userAgent = c.req.header('User-Agent') || 'unknown';
  return generateUserHash(sourceIp + userAgent);
};

answer.post('/:quizId/submit', zValidator('json', submitAnswerSchema), async (c) => {
  const quizId = c.req.param('quizId');
  const { userAnswer } = c.req.valid('json');
  
  const userHash = getUserHash(c);
  const sourceIp = c.req.header('CF-Connecting-IP');
  const userAgent = c.req.header('User-Agent');
  
  const answerRepo = new AnswerRepository(c.env.DB);
  const quizRepo = new QuizRepository(c.env.DB);
  const answerService = new AnswerService(answerRepo, quizRepo);
  
  try {
    const result = await answerService.submitAnswer(
      { quizId, userAnswer },
      userHash,
      sourceIp,
      userAgent
    );
    
    return c.json({
      success: true,
      data: result,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: c.get('requestId'),
      },
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    
    if (error instanceof Error && error.message.includes('not found')) {
      return c.json({
        success: false,
        error: {
          code: 'QUIZ_NOT_FOUND',
          message: 'Quiz not found or not approved',
        },
      }, 404);
    }
    
    return c.json({
      success: false,
      error: {
        code: 'SUBMIT_ERROR',
        message: 'Failed to submit answer',
      },
    }, 500);
  }
});

answer.get('/history', zValidator('query', historyQuerySchema), async (c) => {
  const { limit = 50, offset = 0 } = c.req.valid('query');
  const userHash = getUserHash(c);
  
  const answerRepo = new AnswerRepository(c.env.DB);
  const quizRepo = new QuizRepository(c.env.DB);
  const answerService = new AnswerService(answerRepo, quizRepo);
  
  try {
    const history = await answerService.getAnswerHistory(userHash, limit, offset);
    
    return c.json({
      success: true,
      data: history,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: c.get('requestId'),
      },
    });
  } catch (error) {
    console.error('Error fetching answer history:', error);
    return c.json({
      success: false,
      error: {
        code: 'HISTORY_ERROR',
        message: 'Failed to fetch answer history',
      },
    }, 500);
  }
});

export { answer };
EOF

# メインアプリケーション
cat > src/index.ts << 'EOF'
import { Hono } from 'hono';
import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { quiz } from './routes/quiz';
import { answer } from './routes/answer';
import type { Env, Variables } from './types';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// ミドルウェア適用
app.use('*', corsMiddleware());
app.use('*', loggerMiddleware());

// ヘルスチェック
app.get('/', (c) => {
  return c.json({
    success: true,
    data: {
      service: 'your-quiz-api',
      version: '1.0.0',
      environment: c.env.ENVIRONMENT,
      timestamp: new Date().toISOString(),
    },
  });
});

// ルート設定
app.route('/api/quizzes', quiz);
app.route('/api/answers', answer);

// 404ハンドラー
app.notFound((c) => {
  return c.json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
    },
  }, 404);
});

// エラーハンドラー
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  
  return c.json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
    },
  }, 500);
});

export default app;
EOF

cd ..
```

### Milestone 1.4: Frontend (Next.js 15) セットアップ

#### ✅ 1.4.1 Next.js プロジェクト作成

```bash
cd frontend

# Next.js プロジェクト初期化
cat > package.json << 'EOF'
{
  "name": "@your-quiz/frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check src",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next out"
  },
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.7",
    "zod": "^3.22.4",
    "ky": "^1.1.3",
    "@your-quiz/types": "workspace:*",
    "@your-quiz/utils": "workspace:*"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
EOF

pnpm install

# Next.js設定
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
EOF

# TypeScript設定
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
```

#### ✅ 1.4.2 Tailwind CSS セットアップ

```bash
# Tailwind設定
npx tailwindcss init -p

cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
EOF

# グローバルCSS
mkdir -p src/app
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply h-full;
  }
  
  body {
    @apply h-full bg-gray-50 text-gray-900;
  }
  
  * {
    @apply box-border;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold
           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
           disabled:bg-gray-400 disabled:cursor-not-allowed
           transition-all duration-200;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold
           hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
           disabled:bg-gray-100 disabled:cursor-not-allowed
           transition-all duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg p-6 border border-gray-200;
  }
  
  .input-field {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
           placeholder-gray-400;
  }
}

/* スワイプアニメーション */
.swipe-left {
  animation: swipeLeft 0.3s ease-out forwards;
}

.swipe-right {
  animation: swipeRight 0.3s ease-out forwards;
}

@keyframes swipeLeft {
  0% { transform: translateX(0) rotate(0deg); opacity: 1; }
  100% { transform: translateX(-100vw) rotate(-30deg); opacity: 0; }
}

@keyframes swipeRight {
  0% { transform: translateX(0) rotate(0deg); opacity: 1; }
  100% { transform: translateX(100vw) rotate(30deg); opacity: 0; }
}

/* 正誤表示アニメーション */
.result-correct {
  @apply text-green-600 text-6xl font-bold;
  animation: bounceIn 0.6s ease-out;
}

.result-incorrect {
  @apply text-red-600 text-6xl font-bold;
  animation: bounceIn 0.6s ease-out;
}
EOF
```

#### ✅ 1.4.3 状態管理 (Zustand) セットアップ

```bash
mkdir -p src/{stores,lib,components,hooks}

# API クライアント設定
cat > src/lib/api.ts << 'EOF'
import ky from 'ky';
import type { ApiResponse, PaginatedResponse } from '@your-quiz/types';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get'],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        console.log(`API Request: ${request.method} ${request.url}`);
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        console.log(`API Response: ${response.status} ${response.url}`);
      },
    ],
  },
});

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const data: ApiResponse<T> = await response.json();
  
  if (!data.success) {
    throw new ApiError(
      response.status,
      data.error?.code || 'UNKNOWN_ERROR',
      data.error?.message || 'Unknown error occurred',
      data.error?.details
    );
  }
  
  return data.data as T;
};

export { api };
EOF

# Zustand ストア
cat > src/stores/quiz.ts << 'EOF'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quiz, QuizListQuery, CreateQuizRequest } from '@your-quiz/types';
import { api, handleApiResponse } from '@/lib/api';

interface QuizState {
  // State
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchQuizzes: (query?: QuizListQuery) => Promise<void>;
  fetchQuizById: (id: string) => Promise<void>;
  createQuiz: (quiz: CreateQuizRequest) => Promise<void>;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  clearError: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // Initial state
      quizzes: [],
      currentQuiz: null,
      loading: false,
      error: null,
      
      // Actions
      fetchQuizzes: async (query?: QuizListQuery) => {
        set({ loading: true, error: null });
        
        try {
          const searchParams = new URLSearchParams();
          if (query?.limit) searchParams.set('limit', query.limit.toString());
          if (query?.offset) searchParams.set('offset', query.offset.toString());
          if (query?.tags?.length) searchParams.set('tags', query.tags.join(','));
          
          const response = await api.get(`api/quizzes?${searchParams}`);
          const quizzes = await handleApiResponse<Quiz[]>(response);
          
          set({ quizzes, loading: false });
        } catch (error) {
          console.error('Failed to fetch quizzes:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch quizzes',
            loading: false 
          });
        }
      },
      
      fetchQuizById: async (id: string) => {
        set({ loading: true, error: null });
        
        try {
          const response = await api.get(`api/quizzes/${id}`);
          const quiz = await handleApiResponse<Quiz>(response);
          
          set({ currentQuiz: quiz, loading: false });
        } catch (error) {
          console.error('Failed to fetch quiz:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch quiz',
            loading: false 
          });
        }
      },
      
      createQuiz: async (quiz: CreateQuizRequest) => {
        set({ loading: true, error: null });
        
        try {
          const response = await api.post('api/quizzes', { json: quiz });
          const newQuiz = await handleApiResponse<Quiz>(response);
          
          // 作成されたクイズをリストに追加（承認待ち状態）
          set(state => ({ 
            quizzes: [newQuiz, ...state.quizzes],
            loading: false 
          }));
        } catch (error) {
          console.error('Failed to create quiz:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create quiz',
            loading: false 
          });
          throw error; // コンポーネント側でハンドリング
        }
      },
      
      setCurrentQuiz: (quiz: Quiz | null) => {
        set({ currentQuiz: quiz });
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'quiz-store',
      partialize: (state) => ({ 
        quizzes: state.quizzes.slice(0, 50), // 最新50件のみ永続化
      }),
    }
  )
);
EOF

cat > src/stores/answer.ts << 'EOF'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Answer, AnswerHistory, SubmitAnswerRequest } from '@your-quiz/types';
import { api, handleApiResponse } from '@/lib/api';

interface AnswerResult {
  isCorrect: boolean;
  correctAnswer: boolean;
  explanation?: string;
}

interface AnswerState {
  // State
  currentAnswer: AnswerResult | null;
  answerHistory: AnswerHistory | null;
  offlineAnswers: Answer[];
  loading: boolean;
  error: string | null;
  
  // Actions
  submitAnswer: (quizId: string, userAnswer: boolean) => Promise<AnswerResult>;
  fetchAnswerHistory: () => Promise<void>;
  saveOfflineAnswer: (answer: Answer) => void;
  syncOfflineAnswers: () => Promise<void>;
  clearCurrentAnswer: () => void;
  clearError: () => void;
}

export const useAnswerStore = create<AnswerState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentAnswer: null,
      answerHistory: null,
      offlineAnswers: [],
      loading: false,
      error: null,
      
      // Actions
      submitAnswer: async (quizId: string, userAnswer: boolean) => {
        set({ loading: true, error: null });
        
        try {
          const response = await api.post(`api/answers/${quizId}/submit`, {
            json: { userAnswer }
          });
          const result = await handleApiResponse<AnswerResult>(response);
          
          set({ currentAnswer: result, loading: false });
          return result;
        } catch (error) {
          console.error('Failed to submit answer:', error);
          
          // オフライン時はローカルに保存
          const offlineAnswer: Answer = {
            id: crypto.randomUUID(),
            quizId,
            userAnswer,
            isCorrect: false, // オフライン時は正誤不明
            answeredAt: new Date(),
            syncStatus: 'pending',
          };
          
          get().saveOfflineAnswer(offlineAnswer);
          
          set({ 
            error: 'オフラインモードで回答を保存しました',
            loading: false 
          });
          
          throw error;
        }
      },
      
      fetchAnswerHistory: async () => {
        set({ loading: true, error: null });
        
        try {
          const response = await api.get('api/answers/history');
          const history = await handleApiResponse<AnswerHistory>(response);
          
          set({ answerHistory: history, loading: false });
        } catch (error) {
          console.error('Failed to fetch answer history:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch answer history',
            loading: false 
          });
        }
      },
      
      saveOfflineAnswer: (answer: Answer) => {
        set(state => ({
          offlineAnswers: [...state.offlineAnswers, answer]
        }));
      },
      
      syncOfflineAnswers: async () => {
        const { offlineAnswers } = get();
        
        if (offlineAnswers.length === 0) return;
        
        set({ loading: true });
        
        try {
          // オフライン回答を順次送信
          for (const answer of offlineAnswers) {
            await api.post(`api/answers/${answer.quizId}/submit`, {
              json: { userAnswer: answer.userAnswer }
            });
          }
          
          // 同期完了後、オフライン回答をクリア
          set({ offlineAnswers: [], loading: false });
          
          // 履歴を再取得
          await get().fetchAnswerHistory();
        } catch (error) {
          console.error('Failed to sync offline answers:', error);
          set({ 
            error: 'オフライン回答の同期に失敗しました',
            loading: false 
          });
        }
      },
      
      clearCurrentAnswer: () => {
        set({ currentAnswer: null });
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'answer-store',
      partialize: (state) => ({ 
        offlineAnswers: state.offlineAnswers,
        answerHistory: state.answerHistory,
      }),
    }
  )
);
EOF

cat > src/stores/app.ts << 'EOF'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // State
  isOnline: boolean;
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  autoSync: boolean;
  
  // Actions
  setOnlineStatus: (isOnline: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSoundEnabled: (enabled: boolean) => void;
  setAutoSync: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      isOnline: true,
      theme: 'light',
      soundEnabled: true,
      autoSync: true,
      
      // Actions
      setOnlineStatus: (isOnline: boolean) => {
        set({ isOnline });
      },
      
      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
      },
      
      setSoundEnabled: (enabled: boolean) => {
        set({ soundEnabled: enabled });
      },
      
      setAutoSync: (enabled: boolean) => {
        set({ autoSync: enabled });
      },
    }),
    {
      name: 'app-store',
    }
  )
);
EOF
```

#### ✅ 1.4.4 共通コンポーネント作成

```bash
mkdir -p src/components/{ui,quiz,layout}

# 基本UIコンポーネント
cat > src/components/ui/Button.tsx << 'EOF'
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        'disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          読み込み中...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
EOF

cat > src/components/ui/Card.tsx << 'EOF'
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className, hover = false }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-lg p-6 border border-gray-200',
        hover && 'hover:shadow-xl transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};
EOF

cat > src/components/ui/Input.tsx << 'EOF'
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border border-gray-300 rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'placeholder-gray-400',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
EOF

cat > src/components/ui/Textarea.tsx << 'EOF'
import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border border-gray-300 rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'placeholder-gray-400 resize-none',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
EOF

# ユーティリティ関数
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};
EOF

cd ..
```

### Milestone 1.5: GitHub Actions CI/CD セットアップ

#### ✅ 1.5.1 ワークフロー設定

```bash
mkdir -p .github/workflows

cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  PNPM_VERSION: '8'

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
          
      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
            
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build shared packages
        run: pnpm --filter shared build
        
      - name: Lint
        run: pnpm lint
        
      - name: Type check
        run: pnpm type-check
        
      - name: Test
        run: pnpm test

  build-frontend:
    name: Build Frontend
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build shared packages
        run: pnpm --filter shared build
        
      - name: Build frontend
        run: pnpm --filter frontend build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

  build-backend:
    name: Build Backend
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build shared packages
        run: pnpm --filter shared build
        
      - name: Build backend
        run: pnpm --filter backend build

  deploy-backend:
    name: Deploy Backend
    runs-on: ubuntu-latest
    needs: [test, build-backend]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build shared packages
        run: pnpm --filter shared build
        
      - name: Deploy to Cloudflare Workers
        run: cd backend && pnpm deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
EOF

cat > .github/workflows/deploy-frontend.yml << 'EOF'
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ['frontend/**', 'shared/**']

jobs:
  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: '8'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build shared packages
        run: pnpm --filter shared build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'
EOF
```

---

## 🎯 Phase 2: 基本機能実装

### Milestone 2.1: クイズ一覧・詳細表示

#### ✅ 2.1.1 クイズカードコンポーネント

```bash
cd frontend/src/components/quiz

cat > QuizCard.tsx << 'EOF'
import { Quiz } from '@your-quiz/types';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface QuizCardProps {
  quiz: Quiz;
  onClick: () => void;
}

export const QuizCard = ({ quiz, onClick }: QuizCardProps) => {
  return (
    <Card hover className="cursor-pointer" onClick={onClick}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {quiz.question}
          </h3>
          {quiz.status === 'pending' && (
            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
              承認待ち
            </span>
          )}
        </div>
        
        {quiz.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {quiz.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          作成日: {formatDate(quiz.createdAt)}
        </div>
      </div>
    </Card>
  );
};
EOF

cat > QuizList.tsx << 'EOF'
'use client';

import { useEffect, useState } from 'react';
import { useQuizStore } from '@/stores/quiz';
import { QuizCard } from './QuizCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const QuizList = () => {
  const { quizzes, loading, error, fetchQuizzes, clearError } = useQuizStore();
  const [searchTags, setSearchTags] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleSearch = async () => {
    const tags = searchTags.split(',').map(tag => tag.trim()).filter(Boolean);
    await fetchQuizzes({ tags, limit: 50, offset: 0 });
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const tags = searchTags.split(',').map(tag => tag.trim()).filter(Boolean);
      await fetchQuizzes({ 
        tags: tags.length > 0 ? tags : undefined, 
        limit: 20, 
        offset: quizzes.length 
      });
    } finally {
      setLoadingMore(false);
    }
  };

  const handleQuizClick = (quiz: Quiz) => {
    // クイズ詳細ページまたは回答ページに遷移
    window.location.href = `/quiz/${quiz.id}`;
  };

  if (loading && quizzes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 検索フィルター */}
      <div className="flex gap-4">
        <Input
          placeholder="タグで絞り込み (カンマ区切り)"
          value={searchTags}
          onChange={(e) => setSearchTags(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} loading={loading}>
          検索
        </Button>
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <Button
            variant="secondary"
            size="sm"
            className="ml-2"
            onClick={clearError}
          >
            閉じる
          </Button>
        </div>
      )}

      {/* クイズ一覧 */}
      {quizzes.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onClick={() => handleQuizClick(quiz)}
              />
            ))}
          </div>
          
          {/* もっと読み込むボタン */}
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={handleLoadMore}
              loading={loadingMore}
            >
              もっと読み込む
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          クイズが見つかりませんでした。
        </div>
      )}
    </div>
  );
};
EOF
```

#### ✅ 2.1.2 Tinder UI (スワイプ) コンポーネント

```bash
cat > TinderQuiz.tsx << 'EOF'
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAnswerStore } from '@/stores/answer';
import { useQuizStore } from '@/stores/quiz';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Quiz } from '@your-quiz/types';

interface TinderQuizProps {
  quiz: Quiz;
  onNext: () => void;
  onFinish: () => void;
}

export const TinderQuiz = ({ quiz, onNext, onFinish }: TinderQuizProps) => {
  const { submitAnswer, currentAnswer, clearCurrentAnswer, loading } = useAnswerStore();
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // クリーンアップ
    return () => {
      clearCurrentAnswer();
    };
  }, [quiz.id, clearCurrentAnswer]);

  const handleAnswer = async (userAnswer: boolean) => {
    if (isAnswered || loading) return;

    setIsAnswered(true);
    setSwipeDirection(userAnswer ? 'right' : 'left');

    try {
      await submitAnswer(quiz.id, userAnswer);
      
      // スワイプアニメーション後に結果表示
      setTimeout(() => {
        setShowResult(true);
        setSwipeDirection(null);
      }, 300);
    } catch (error) {
      console.error('Answer submission failed:', error);
      setIsAnswered(false);
      setSwipeDirection(null);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setShowResult(false);
    clearCurrentAnswer();
    onNext();
  };

  // スワイプジェスチャー処理
  useEffect(() => {
    const card = cardRef.current;
    if (!card || isAnswered) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      
      // カードの移動と回転
      const rotation = diff * 0.1;
      card.style.transform = `translateX(${diff}px) rotate(${rotation}deg)`;
      
      // 色の変化
      if (diff > 50) {
        card.style.borderColor = '#10b981'; // green
      } else if (diff < -50) {
        card.style.borderColor = '#ef4444'; // red
      } else {
        card.style.borderColor = '#e5e7eb'; // gray
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      
      const diff = currentX - startX;
      const threshold = 100;
      
      if (Math.abs(diff) > threshold) {
        // スワイプ完了
        handleAnswer(diff > 0);
      } else {
        // 元の位置に戻す
        card.style.transform = '';
        card.style.borderColor = '#e5e7eb';
      }
    };

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnswered, handleAnswer]);

  return (
    <div className="max-w-md mx-auto">
      {!showResult ? (
        <div
          ref={cardRef}
          className={`transition-transform duration-300 ${
            swipeDirection === 'left' ? 'swipe-left' : 
            swipeDirection === 'right' ? 'swipe-right' : ''
          }`}
        >
          <Card className="border-2 transition-colors duration-200">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">
                {quiz.question}
              </h2>
              
              <div className="text-center text-gray-500">
                左スワイプ: ×　右スワイプ: ○
              </div>
              
              {/* タップボタン（スワイプ以外の操作用） */}
              <div className="flex gap-4 justify-center">
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => handleAnswer(false)}
                  disabled={isAnswered || loading}
                  className="w-20 h-20 rounded-full"
                >
                  ×
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleAnswer(true)}
                  disabled={isAnswered || loading}
                  className="w-20 h-20 rounded-full"
                >
                  ○
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="text-center">
          <div className="space-y-6">
            {/* 正誤表示 */}
            <div className={`text-8xl font-bold ${
              currentAnswer?.isCorrect ? 'text-green-600' : 'text-red-600'
            } animate-bounce-in`}>
              {currentAnswer?.isCorrect ? '○' : '×'}
            </div>
            
            <div className="space-y-4">
              <p className="text-lg">
                正解: {currentAnswer?.correctAnswer ? '○' : '×'}
              </p>
              
              {currentAnswer?.explanation && (
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h4 className="font-semibold mb-2">解説:</h4>
                  <p>{currentAnswer.explanation}</p>
                </div>
              )}
            </div>
            
            <Button onClick={handleNext} size="lg">
              次の問題へ
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
EOF
```

### Milestone 2.2: クイズ作成機能

#### ✅ 2.2.1 クイズ作成フォーム

```bash
cat > CreateQuizForm.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuizStore } from '@/stores/quiz';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const createQuizSchema = z.object({
  question: z.string()
    .min(1, '問題文は必須です')
    .max(500, '問題文は500文字以内で入力してください'),
  correctAnswer: z.boolean(),
  explanation: z.string()
    .max(1000, '解説は1000文字以内で入力してください')
    .optional(),
  tags: z.string()
    .transform(val => 
      val.split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    )
    .refine(tags => tags.length <= 10, '10個以下のタグを設定してください')
    .refine(
      tags => tags.every(tag => tag.length <= 50),
      'タグは50文字以内で入力してください'
    ),
});

type CreateQuizForm = z.infer<typeof createQuizSchema>;

export const CreateQuizForm = () => {
  const { createQuiz, loading, error, clearError } = useQuizStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateQuizForm>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      correctAnswer: true,
    },
  });

  const questionValue = watch('question');
  const explanationValue = watch('explanation');

  const onSubmit = async (data: CreateQuizForm) => {
    clearError();
    
    try {
      await createQuiz({
        question: data.question,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation || undefined,
        tags: data.tags,
      });
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Quiz creation failed:', error);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="text-center">
        <div className="space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-semibold text-green-600">
            クイズを投稿しました！
          </h2>
          <p className="text-gray-600">
            管理者の承認後、他のユーザーが回答できるようになります。
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            新しいクイズを作成
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          新しいクイズを作成
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <Textarea
            label="問題文"
            placeholder="クイズの問題文を入力してください"
            rows={4}
            {...register('question')}
            error={errors.question?.message}
          />
          <div className="text-sm text-gray-500 mt-1">
            {questionValue?.length || 0}/500文字
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            正解
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register('correctAnswer', { 
                  setValueAs: (value) => value === 'true' 
                })}
                className="mr-2"
              />
              ○（正しい）
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="false"
                {...register('correctAnswer', { 
                  setValueAs: (value) => value === 'true' 
                })}
                className="mr-2"
              />
              ×（間違い）
            </label>
          </div>
        </div>

        <div>
          <Textarea
            label="解説（任意）"
            placeholder="回答の解説を入力してください"
            rows={3}
            {...register('explanation')}
            error={errors.explanation?.message}
          />
          <div className="text-sm text-gray-500 mt-1">
            {explanationValue?.length || 0}/1000文字
          </div>
        </div>

        <div>
          <Input
            label="タグ（任意）"
            placeholder="タグをカンマ区切りで入力（例: 数学,基礎,計算）"
            {...register('tags')}
            error={errors.tags?.message}
          />
          <div className="text-sm text-gray-500 mt-1">
            カンマ区切りで最大10個まで
          </div>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          クイズを投稿
        </Button>
      </form>
    </Card>
  );
};
EOF
```

### Milestone 2.3: 回答履歴機能

#### ✅ 2.3.1 回答履歴コンポーネント

```bash
cat > AnswerHistory.tsx << 'EOF'
'use client';

import { useEffect } from 'react';
import { useAnswerStore } from '@/stores/answer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate, calculateAccuracy } from '@/lib/utils';

export const AnswerHistory = () => {
  const { 
    answerHistory, 
    offlineAnswers, 
    loading, 
    error, 
    fetchAnswerHistory, 
    syncOfflineAnswers,
    clearError 
  } = useAnswerStore();

  useEffect(() => {
    fetchAnswerHistory();
  }, []);

  const handleSync = async () => {
    await syncOfflineAnswers();
  };

  if (loading && !answerHistory) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">回答履歴</h2>
        {offlineAnswers.length > 0 && (
          <Button
            variant="secondary"
            onClick={handleSync}
            loading={loading}
          >
            オフライン回答を同期 ({offlineAnswers.length}件)
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <Button
            variant="secondary"
            size="sm"
            className="ml-2"
            onClick={clearError}
          >
            閉じる
          </Button>
        </div>
      )}

      {answerHistory ? (
        <>
          {/* 統計情報 */}
          <Card>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {answerHistory.total}
                </div>
                <div className="text-sm text-gray-500">回答数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {answerHistory.correctCount}
                </div>
                <div className="text-sm text-gray-500">正解数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {calculateAccuracy(answerHistory.correctCount, answerHistory.total)}%
                </div>
                <div className="text-sm text-gray-500">正答率</div>
              </div>
            </div>
          </Card>

          {/* 回答履歴一覧 */}
          {answerHistory.answers.length > 0 ? (
            <div className="space-y-4">
              {answerHistory.answers.map((answer) => (
                <Card key={answer.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {answer.isCorrect ? '○' : '×'}
                    </div>
                    <div>
                      <div className="font-medium">
                        あなたの回答: {answer.userAnswer ? '○' : '×'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(answer.answeredAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {answer.syncStatus === 'pending' && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        同期待ち
                      </span>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.location.href = `/quiz/${answer.quizId}`}
                    >
                      問題を見る
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-gray-500">
                まだ回答した問題がありません。
              </div>
              <Button
                className="mt-4"
                onClick={() => window.location.href = '/'}
              >
                クイズを解く
              </Button>
            </Card>
          )}
        </>
      ) : (
        <Card className="text-center py-12">
          <div className="text-gray-500">
            回答履歴を読み込めませんでした。
          </div>
          <Button
            className="mt-4"
            onClick={fetchAnswerHistory}
          >
            再試行
          </Button>
        </Card>
      )}
    </div>
  );
};
EOF
```

### Milestone 2.4: Next.js App Router ページ実装

#### ✅ 2.4.1 メインページ実装

```bash
cd frontend/src/app

# レイアウト
cat > layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { PWAManager } from '@/components/layout/PWAManager';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Quiz - 簡単クイズアプリ',
  description: 'スマートフォン対応のシンプルなクイズアプリケーション',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
        <PWAManager />
      </body>
    </html>
  );
}
EOF

# ホームページ
cat > page.tsx << 'EOF'
import { QuizList } from '@/components/quiz/QuizList';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Quiz
        </h1>
        <p className="text-xl text-gray-600">
          簡単・楽しい・学習に最適なクイズアプリ
        </p>
      </div>
      
      <QuizList />
    </div>
  );
}
EOF

# クイズ作成ページ
mkdir create
cat > create/page.tsx << 'EOF'
import { CreateQuizForm } from '@/components/quiz/CreateQuizForm';

export default function CreateQuizPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <CreateQuizForm />
    </div>
  );
}
EOF

# 回答履歴ページ
mkdir history
cat > history/page.tsx << 'EOF'
import { AnswerHistory } from '@/components/quiz/AnswerHistory';

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <AnswerHistory />
    </div>
  );
}
EOF

# クイズ詳細ページ
mkdir -p quiz/[id]
cat > quiz/[id]/page.tsx << 'EOF'
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuizStore } from '@/stores/quiz';
import { TinderQuiz } from '@/components/quiz/TinderQuiz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentQuiz, loading, error, fetchQuizById, fetchQuizzes, quizzes } = useQuizStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizList, setQuizList] = useState<Quiz[]>([]);

  const quizId = params.id as string;

  useEffect(() => {
    if (quizId) {
      fetchQuizById(quizId);
      // 関連クイズも取得
      fetchQuizzes({ limit: 50 });
    }
  }, [quizId]);

  useEffect(() => {
    if (currentQuiz && quizzes.length > 0) {
      // 現在のクイズを先頭にした配列を作成
      const otherQuizzes = quizzes.filter(q => q.id !== currentQuiz.id);
      setQuizList([currentQuiz, ...otherQuizzes]);
    }
  }, [currentQuiz, quizzes]);

  const handleNext = () => {
    if (currentIndex < quizList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 最後の問題の場合、新しいクイズを取得
      fetchQuizzes({ limit: 20, offset: quizList.length });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    router.push('/history');
  };

  if (loading && !currentQuiz) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center">
        <div className="space-y-4">
          <div className="text-red-600 text-xl">エラーが発生しました</div>
          <p>{error}</p>
          <Button onClick={() => router.push('/')}>
            ホームに戻る
          </Button>
        </div>
      </Card>
    );
  }

  const currentQuizData = quizList[currentIndex];

  if (!currentQuizData) {
    return (
      <Card className="text-center">
        <div className="space-y-4">
          <div className="text-xl">クイズが見つかりませんでした</div>
          <Button onClick={() => router.push('/')}>
            ホームに戻る
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 進捗表示 */}
      <div className="text-center text-gray-600">
        問題 {currentIndex + 1} / {Math.max(quizList.length, currentIndex + 1)}
      </div>

      <TinderQuiz
        quiz={currentQuizData}
        onNext={handleNext}
        onFinish={handleFinish}
      />

      {/* ナビゲーション */}
      <div className="flex justify-center gap-4">
        <Button
          variant="secondary"
          onClick={() => router.push('/')}
        >
          ホームに戻る
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push('/history')}
        >
          履歴を見る
        </Button>
      </div>
    </div>
  );
}
EOF

cd ../../..
```

### Milestone 2.5: PWA対応・オフライン機能

#### ✅ 2.5.1 PWA設定

```bash
cd frontend

# マニフェストファイル
cat > public/manifest.json << 'EOF'
{
  "name": "Your Quiz",
  "short_name": "Quiz",
  "description": "簡単・楽しいクイズアプリケーション",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "games"],
  "lang": "ja"
}
EOF

# Service Worker
cat > public/sw.js << 'EOF'
const CACHE_NAME = 'your-quiz-v1';
const API_CACHE_NAME = 'your-quiz-api-v1';

// キャッシュするリソース
const STATIC_RESOURCES = [
  '/',
  '/create',
  '/history',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// インストール時
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// アクティベート時
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// フェッチ時（オフライン対応）
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API リクエストの場合
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 成功時はキャッシュに保存
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(API_CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // オフライン時はキャッシュから返却
          return caches.match(request);
        })
    );
    return;
  }

  // 静的リソースの場合
  event.respondWith(
    caches.match(request)
      .then((response) => {
        // キャッシュがあれば返却、なければネットワークから取得
        return response || fetch(request);
      })
      .catch(() => {
        // オフライン時でHTML要求の場合はルートページを返却
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});
EOF

# PWA管理コンポーネント
cat > src/components/layout/PWAManager.tsx << 'EOF'
'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/stores/app';

export const PWAManager = () => {
  const { setOnlineStatus } = useAppStore();

  useEffect(() => {
    // Service Worker登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // オンライン/オフライン状態の監視
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 初期状態設定
    setOnlineStatus(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);

  return null;
};
EOF

# ナビゲーションコンポーネント
cat > src/components/layout/Navigation.tsx << 'EOF'
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/stores/app';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const pathname = usePathname();
  const { isOnline } = useAppStore();

  const navigation = [
    { name: 'ホーム', href: '/', icon: '🏠' },
    { name: 'クイズ作成', href: '/create', icon: '✏️' },
    { name: '履歴', href: '/history', icon: '📊' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            Your Quiz
          </Link>

          {/* オンライン状態表示 */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              isOnline 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span>{isOnline ? 'オンライン' : 'オフライン'}</span>
            </div>

            {/* ナビゲーションメニュー */}
            <div className="flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:block">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
EOF

cd ..
```

---

## 🎯 Phase 3: デプロイ・運用設定

### Milestone 3.1: Cloudflare Workers デプロイ

#### ✅ 3.1.1 本番環境設定

```bash
cd backend

# 本番用D1データベース作成
wrangler d1 create your-quiz-db-prod

# wrangler.tomlに本番環境追加
cat >> wrangler.toml << 'EOF'

[env.production]
name = "your-quiz-api-prod"
vars = { ENVIRONMENT = "production" }

[[env.production.d1_databases]]
binding = "DB"
database_name = "your-quiz-db-prod"
database_id = "production-database-id-here"
EOF

# 本番データベースのマイグレーション
wrangler d1 migrations apply your-quiz-db-prod --env production

# 本番デプロイ
pnpm deploy --env production

cd ..
```

### Milestone 3.2: Vercel フロントエンドデプロイ

#### ✅ 3.2.1 Vercel設定

```bash
cd frontend

# Vercel設定
cat > vercel.json << 'EOF'
{
  "buildCommand": "cd .. && pnpm build --filter frontend",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "cd .. && pnpm install",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://your-quiz-api-prod.your-subdomain.workers.dev"
  },
  "functions": {
    "app/**/*.tsx": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
EOF

cd ..
```

### Milestone 3.3: GitHub Secrets設定

#### ✅ 3.3.1 必要なSecret設定

```bash
# GitHub Repositoryで以下のSecretsを設定:

# Cloudflare
CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"

# Vercel
VERCEL_TOKEN="your-vercel-token"
VERCEL_ORG_ID="your-vercel-org-id"
VERCEL_PROJECT_ID="your-vercel-project-id"

# API URL
NEXT_PUBLIC_API_URL="https://your-quiz-api-prod.your-subdomain.workers.dev"
```

---

## 🎯 Phase 4: テスト・品質保証

### Milestone 4.1: テスト環境構築

#### ✅ 4.1.1 バックエンドテスト

```bash
cd backend

# テスト用パッケージ追加
pnpm add -D vitest @vitest/ui

# Vitest設定
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
EOF

# サンプルテスト
mkdir -p src/__tests__
cat > src/__tests__/quiz.test.ts << 'EOF'
import { describe, test, expect } from 'vitest';
import { validateQuizQuestion, validateTags } from '@your-quiz/utils';

describe('Quiz Validation', () => {
  test('should validate quiz question', () => {
    expect(validateQuizQuestion('')).toContain('問題文は必須です');
    expect(validateQuizQuestion('a'.repeat(501))).toContain('500文字以内');
    expect(validateQuizQuestion('Valid question')).toEqual([]);
  });

  test('should validate tags', () => {
    const manyTags = Array(11).fill('tag');
    expect(validateTags(manyTags)).toContain('10個以内');
    
    const longTag = ['a'.repeat(51)];
    expect(validateTags(longTag)).toContain('50文字以内');
    
    expect(validateTags(['valid', 'tags'])).toEqual([]);
  });
});
EOF

# package.jsonにテストスクリプト追加
cat > package.json << 'EOF'
{
  "name": "@your-quiz/backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "build": "tsc && wrangler deploy --dry-run",
    "lint": "biome check src",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "wrangler d1 migrations apply your-quiz-db",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "hono": "^3.12.6",
    "drizzle-orm": "^0.29.1",
    "zod": "^3.22.4",
    "@your-quiz/types": "workspace:*",
    "@your-quiz/utils": "workspace:*"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20231218.0",
    "drizzle-kit": "^0.20.6",
    "typescript": "^5.3.3",
    "vitest": "^1.1.0",
    "@vitest/ui": "^1.1.0"
  }
}
EOF

cd ..
```

#### ✅ 4.1.2 フロントエンドテスト

```bash
cd frontend

# テスト用パッケージ追加
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Vitest設定
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
EOF

# テストセットアップ
mkdir -p src/test
cat > src/test/setup.ts << 'EOF'
import '@testing-library/jest-dom';
EOF

# サンプルテスト
mkdir -p src/__tests__
cat > src/__tests__/utils.test.ts << 'EOF'
import { describe, test, expect } from 'vitest';
import { formatDate, calculateAccuracy } from '@/lib/utils';

describe('Utils', () => {
  test('should format date correctly', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    const formatted = formatDate(date);
    expect(formatted).toMatch(/2024/);
  });

  test('should calculate accuracy correctly', () => {
    expect(calculateAccuracy(8, 10)).toBe(80);
    expect(calculateAccuracy(0, 10)).toBe(0);
    expect(calculateAccuracy(10, 0)).toBe(0);
  });
});
EOF

# package.jsonにテストスクリプト追加
pnpm pkg set scripts.test="vitest"
pnpm pkg set scripts.test:ui="vitest --ui"

cd ..
```

---

## 🚀 最終チェックリスト

### ✅ 開発環境確認

- [ ] Node.js 18+ インストール済み
- [ ] pnpm インストール済み
- [ ] GitHub リポジトリ作成済み
- [ ] Cloudflare アカウント作成済み
- [ ] Vercel アカウント作成済み

### ✅ セットアップ完了確認

- [ ] ルートレベルでの `pnpm install` 成功
- [ ] `pnpm --filter shared build` 成功
- [ ] `pnpm --filter backend dev` でローカルサーバー起動
- [ ] `pnpm --filter frontend dev` でフロントエンド起動
- [ ] `pnpm lint` でLintチェック通過
- [ ] `pnpm type-check` で型チェック通過
- [ ] `pnpm test` でテスト通過

### ✅ デプロイ確認

- [ ] Cloudflare Workers デプロイ成功
- [ ] D1 Database マイグレーション成功
- [ ] Vercel フロントエンドデプロイ成功
- [ ] GitHub Actions CI/CD動作確認
- [ ] 本番環境での動作確認

### ✅ 機能確認

- [ ] クイズ一覧表示
- [ ] Tinder UI でのクイズ回答
- [ ] クイズ作成機能
- [ ] 回答履歴表示
- [ ] オフライン対応
- [ ] PWA インストール

---

このマイルストーンに従って実装することで、アーキテクチャ設計書で定義した技術スタックとアーキテクチャパターンを完全に実現できます。各ステップは依存関係を考慮して順序付けられており、段階的に機能を構築していくことができます。
