# API BDD実装計画書

## 🎯 概要

DDD設計の4つの境界づけられたコンテキストに対応したCucumber.js BDDテスト環境を構築し、Red-Green-Refactorサイクルに従った正しい実装順序で、テスト駆動開発を実践する。

## ⚠️ 重要な実装順序修正

### 従来の誤った順序
```
❌ Feature生成 → テスト実装 → スケルトン実装
```

### 正しいBDD/TDD順序
```
✅ Feature生成 → スケルトン実装 → テスト実装 → 本格実装
```

**理由**: Red-Green-Refactor原則により、まず失敗するテスト（Red）を作るには、最小限の実装（スケルトン）が必要。スケルトンなしではError（予期しない失敗）になり、Fail（期待される失敗）にならない。

## 📋 Phase 1: 環境構築（1-2日）

### 1.1 依存関係追加

**api/package.json 修正内容**:
```json
{
  "devDependencies": {
    "@cucumber/cucumber": "^11.3.0",
    "@cucumber/pretty-formatter": "^1.0.0", 
    "@types/cucumber": "^7.0.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "scripts": {
    "test:bdd": "cucumber-js --require-module ts-node/register --require 'tests/steps/**/*.ts' --require 'tests/support/**/*.ts' tests/features/**/*.feature",
    "test:bdd:watch": "cucumber-js --require-module ts-node/register --require 'tests/steps/**/*.ts' --require 'tests/support/**/*.ts' tests/features/**/*.feature --watch",
    "test:unit": "vitest",
    "test:all": "npm run test:unit && npm run test:bdd"
  }
}
```

### 1.2 設定ファイル作成

**api/cucumber.config.js**:
```javascript
export default {
  require: [
    'tests/steps/**/*.ts',
    'tests/support/**/*.ts'
  ],
  format: [
    'pretty',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html'
  ],
  paths: ['tests/features/**/*.feature'],
  requireModule: ['ts-node/register'],
  publishQuiet: true
}
```

**api/tests/support/tsconfig.json**:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "types": ["@cucumber/cucumber", "node"],
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 1.3 ディレクトリ構造作成

```
api/
├── tests/
│   ├── features/                          # Gherkinシナリオ
│   │   ├── quiz-management/               # Quiz Management Context
│   │   │   ├── quiz-approval-flow.feature
│   │   │   └── quiz-quality-assessment.feature
│   │   ├── quiz-learning/                 # Quiz Learning Context  
│   │   │   ├── answer-evaluation.feature
│   │   │   └── learning-progress.feature
│   │   ├── user-session/                  # User Session Context
│   │   │   └── anonymous-user-management.feature
│   │   └── offline-sync/                  # Offline Sync Context
│   │       └── data-synchronization.feature
│   ├── steps/                             # ステップ定義
│   │   ├── shared/                        # 共通ステップ
│   │   │   └── common.steps.ts
│   │   ├── quiz-management.steps.ts
│   │   ├── quiz-learning.steps.ts
│   │   ├── user-session.steps.ts
│   │   └── offline-sync.steps.ts
│   ├── support/                           # テスト設定
│   │   ├── world.ts                       # テスト実行コンテキスト
│   │   ├── hooks.ts                       # Before/After処理
│   │   └── api-client.ts                  # API呼び出しヘルパー
│   └── fixtures/                          # テストデータ
│       ├── quiz-data.json
│       ├── user-sessions.json
│       └── test-scenarios.json
└── reports/                               # テストレポート出力
```

## 📋 Phase 2: Feature生成（1-2日）

### 2.1 境界づけられたコンテキスト別フィーチャー

#### Quiz Management Context
**api/tests/features/quiz-management/quiz-approval-flow.feature**:
```gherkin
Feature: Quiz Approval Flow
  クイズ投稿から承認までのビジネスフローを検証する

  Background:
    Given API server is running
    And Database is clean

  Scenario Outline: Quiz submission and approval process
    Given Creator with "<creator_type>" submits Quiz with Question "<question>"
    When Administrator reviews Quiz with status "<review_action>"
    Then Quiz status should be "<final_status>"
    And Quiz should be "<availability>" for learning

    Examples:
      | creator_type | question | review_action | final_status | availability |
      | new_creator  | Valid question about math | approve | Approved | available |
      | trusted_creator | Valid question about history | approve | Approved | available |
      | new_creator | Invalid question with HTML | reject | Rejected | unavailable |
      | spam_creator | Duplicate question content | reject | Rejected | unavailable |

  # Requirements Traceability:
  # - requirements-quiz.md:11 → Question character limit (500)
  # - requirements-quiz.md:12 → CorrectAnswer format (true/false)
  # - requirements-quiz.md:20 → Quiz approval workflow
```

#### Quiz Learning Context
**api/tests/features/quiz-learning/answer-evaluation.feature**:
```gherkin
Feature: Quiz Answer Evaluation
  学習者の回答処理と正誤判定を検証する

  Background:
    Given API server is running
    And Approved Quiz exists with Question "2+2=4" and CorrectAnswer "true"
    And AnonymousUser has active LearningSession

  Scenario Outline: Answer submission and evaluation
    Given LearningSession is started for AnonymousUser
    When AnonymousUser submits Answer "<user_answer>" for Quiz
    Then CorrectJudgment should be "<judgment_result>"
    And AnswerHistory should be updated with result "<judgment_result>"
    And LearningProgress should be recalculated

    Examples:
      | user_answer | judgment_result |
      | true        | Correct         |
      | false       | Incorrect       |

  # Requirements Traceability:
  # - user-story-quiz.md:8 → Immediate judgment display
  # - requirements-quiz.md:25 → Answer history management
```

#### Domain Services Integration
**api/tests/features/quiz-management/quiz-quality-assessment.feature**:
```gherkin
Feature: Quiz Quality Assessment Service
  クイズ品質評価サービスのビジネスロジックを検証する

  Background:
    Given API server is running
    And Quiz Quality Assessment Service is available

  Scenario Outline: Quiz quality evaluation
    Given Quiz submission with Question "<question_text>" and Tags "<tags>"
    When Quiz Quality Assessment Service evaluates Quiz
    Then Quality Score should be "<quality_score>"
    And Duplicate Check result should be "<duplicate_status>"
    And Content Safety result should be "<safety_status>"

    Examples:
      | question_text | tags | quality_score | duplicate_status | safety_status |
      | "Clear math question: 2+2=4" | "math,basic" | high | unique | safe |
      | "Unclear: smthng abt hstry" | "history" | low | unique | safe |
      | "Exact duplicate question" | "duplicate" | medium | duplicate | safe |
      | "<script>alert('xss')</script>" | "malicious" | low | unique | unsafe |

  # Requirements Traceability:
  # - requirements-quiz.md:50 → Content quality management
  # - requirements-quiz.md:51 → Duplicate detection
  # - requirements-quiz.md:15 → HTML sanitization
```

## 📋 Phase 3: 最小スケルトン実装（1-2日）

### ⭐ 重要ポイント: テスト実装前にスケルトン実装

スケルトン実装の目的は**テストをErrorでなくFailにする**ことです。

### 3.1 基本サーバー・ルーティング

**api/src/app.ts**:
```typescript
import { Hono } from 'hono'
import quiz from './routes/quiz'
import admin from './routes/admin'

const app = new Hono()

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }))

// API routes
app.route('/api/quiz', quiz)
app.route('/api/admin', admin)

export default app
```

### 3.2 API エンドポイント スケルトン

**api/src/routes/quiz.ts**:
```typescript
import { Hono } from 'hono'

const quiz = new Hono()

// POST /api/quiz/submit - Quiz submission
// 目的: テストでError回避、期待されるFail状態にする
quiz.post('/submit', async (c) => {
  const body = await c.req.json()
  
  // TODO: 実装予定 - 現在は固定レスポンス（テスト用）
  return c.json({ 
    quizId: 'temp-quiz-id-001',
    status: 'PendingApproval',
    message: 'Quiz submitted successfully'
  }, 201)
})

// GET /api/quiz/:id - Get quiz by ID
quiz.get('/:id', async (c) => {
  const quizId = c.req.param('id')
  
  // TODO: 実装予定 - 現在は固定レスポンス（テスト用）
  return c.json({
    id: quizId,
    question: 'Sample question for testing',
    correctAnswer: true,
    status: 'PendingApproval' // 常に同じ値（テストでFail期待）
  })
})

export default quiz
```

**api/src/routes/admin.ts**:
```typescript
import { Hono } from 'hono'

const admin = new Hono()

// POST /api/admin/quiz/:id/review - Quiz approval/rejection
admin.post('/quiz/:id/review', async (c) => {
  const quizId = c.req.param('id')
  const { action, reason } = await c.req.json()
  
  // TODO: 実装予定 - 現在は固定レスポンス（テスト用）
  return c.json({
    quizId,
    status: 'PendingApproval', // 常に同じ値（テストでFail期待）
    reviewedAt: new Date().toISOString(),
    action: action
  })
})

export default admin
```

### 3.3 Domain Services スケルトン

**api/src/services/quiz-quality-assessment-service.ts**:
```typescript
export interface QuizQualityAssessment {
  qualityScore: 'high' | 'medium' | 'low'
  duplicateCheck: 'unique' | 'duplicate'  
  contentSafety: 'safe' | 'unsafe'
  recommendations: string[]
}

export class QuizQualityAssessmentService {
  async assessQuiz(quiz: any): Promise<QuizQualityAssessment> {
    // TODO: 実装予定 - 現在は固定値（テスト用）
    return {
      qualityScore: 'medium', // 常に同じ値（テストでFail期待）
      duplicateCheck: 'unique',
      contentSafety: 'safe',
      recommendations: ['TODO: Implement assessment logic']
    }
  }
}
```

### 3.4 期待される結果

```bash
# この段階での期待される動作:
npm run test:bdd
# → 全テストが実行可能（Error なし）
# → 全テスト結果が Fail（期待通りの失敗）
# → "TODO: 実装予定" コメントが実装箇所を明示
```

## 📋 Phase 4: ステップ定義・テスト実装（2-3日）

### Red-Green-Refactor サイクル開始

### 4.1 World・Hooks実装

**api/tests/support/world.ts**:
```typescript
import { World as CucumberWorld, setWorldConstructor } from '@cucumber/cucumber'
import { ApiClient } from './api-client'
import { DatabaseHelper } from './database-helper'

export class World extends CucumberWorld {
  // API Client
  apiClient: ApiClient
  database: DatabaseHelper
  
  // Test State Management
  currentUser?: any
  currentCreator?: any
  submittedQuiz?: any
  lastResponse?: any
  qualityAssessment?: any
  learningSession?: any
  
  // Request/Response Data
  requestBody?: any
  responseData?: any

  constructor(options: any) {
    super(options)
    this.apiClient = new ApiClient()
    this.database = new DatabaseHelper()
  }

  // Helper Methods
  async createCreatorByType(creatorType: string) {
    switch(creatorType) {
      case 'new_creator':
        return { id: 'creator-001', type: 'new', trustLevel: 'low' }
      case 'trusted_creator':
        return { id: 'creator-002', type: 'trusted', trustLevel: 'high' }
      case 'spam_creator':
        return { id: 'creator-003', type: 'spam', trustLevel: 'blocked' }
      default:
        throw new Error(`Unknown creator type: ${creatorType}`)
    }
  }
}

setWorldConstructor(World)
```

**api/tests/support/hooks.ts**:
```typescript
import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber'
import { World } from './world'

BeforeAll(async function() {
  console.log('🚀 Starting BDD test suite...')
})

Before(async function(this: World) {
  // Reset test state before each scenario
  this.currentUser = undefined
  this.submittedQuiz = undefined
  this.lastResponse = undefined
  
  // Ensure clean database state
  await this.database.beginTransaction()
})

After(async function(this: World, scenario) {
  // Cleanup after each scenario
  if (scenario.result?.status === 'FAILED') {
    console.log(`❌ Scenario failed: ${scenario.pickle.name}`)
    if (this.lastResponse) {
      console.log('📤 Last API response:', JSON.stringify(this.lastResponse.data, null, 2))
    }
  }
  
  // Rollback database changes
  await this.database.rollbackTransaction()
})

AfterAll(async function() {
  console.log('✅ BDD test suite completed.')
})
```

### 4.2 ステップ定義実装

**api/tests/steps/shared/common.steps.ts**:
```typescript
import { Given, When, Then } from '@cucumber/cucumber'
import { World } from '../../support/world'

// API Server Management
Given('API server is running', async function(this: World) {
  const health = await this.apiClient.get('/health')
  expect(health.status).toBe(200)
  expect(health.data.status).toBe('ok')
})

Given('Database is clean', async function(this: World) {
  await this.database.clear()
  await this.database.migrate()
})

// Common API Response Validation
Then('API response status should be {int}', function(this: World, expectedStatus: number) {
  expect(this.lastResponse.status).toBe(expectedStatus)
})
```

**api/tests/steps/quiz-management.steps.ts**:
```typescript
import { Given, When, Then } from '@cucumber/cucumber'
import { World } from '../support/world'

// Quiz Submission Steps (ユビキタス言語使用)
Given('Creator with {string} submits Quiz with Question {string}', 
  async function(this: World, creatorType: string, question: string) {
    this.currentCreator = await this.createCreatorByType(creatorType)
    this.submittedQuiz = {
      question,
      correctAnswer: true, // Default for test
      explanation: 'Test explanation',
      tags: ['test'],
      creatorId: this.currentCreator.id
    }
    
    // スケルトンAPI呼び出し → 期待: Status 201, 固定レスポンス
    this.lastResponse = await this.apiClient.post('/api/quiz/submit', this.submittedQuiz)
  }
)

// Quiz Approval Steps
When('Administrator reviews Quiz with status {string}',
  async function(this: World, reviewAction: string) {
    const quizId = this.lastResponse.data.quizId
    const approvalData = {
      action: reviewAction,
      reason: reviewAction === 'reject' ? 'Quality standards not met' : undefined
    }
    
    // スケルトンAPI呼び出し → 期待: 固定レスポンス（常にPendingApproval）
    this.lastResponse = await this.apiClient.post(`/api/admin/quiz/${quizId}/review`, approvalData)
  }
)

Then('Quiz status should be {string}',
  async function(this: World, expectedStatus: string) {
    const quizId = this.lastResponse.data.quizId
    const quiz = await this.apiClient.get(`/api/quiz/${quizId}`)
    
    // 期待される失敗: スケルトンは常に 'PendingApproval' を返すため
    // expectedStatus が 'Approved' や 'Rejected' の場合、テストは Fail する
    expect(quiz.data.status).toBe(expectedStatus) // 👈 Red状態（期待されるFail）
  }
)

Then('Quiz should be {string} for learning',
  async function(this: World, availability: string) {
    const quizId = this.lastResponse.data.quizId
    const quiz = await this.apiClient.get(`/api/quiz/${quizId}`)
    
    // ビジネスロジック検証（スケルトンでは実装されていない）
    const isAvailable = quiz.data.status === 'Approved'
    const expectedAvailability = availability === 'available'
    
    expect(isAvailable).toBe(expectedAvailability) // 👈 Red状態（期待されるFail）
  }
)
```

### 4.3 期待される結果（Red状態）

```bash
npm run test:bdd

# 期待される出力:
# ✅ All tests execute without errors
# ❌ Quiz status should be "Approved" (Expected: "Approved", Actual: "PendingApproval")
# ❌ Quiz should be "available" for learning (Expected: true, Actual: false)
# 
# Result: 0 passed, 4 failed, 0 skipped
```

## 📋 Phase 5: 本格実装・Green化（3-4日）

### Red-Green-Refactor サイクル実行

### 5.1 Red → Green の実装例

#### 例1: Quiz Status Management

**Red状態（スケルトン）**:
```typescript
// 常に同じ値を返す（テストFail）
quiz.get('/:id', async (c) => {
  return c.json({ status: 'PendingApproval' })
})
```

**Green状態（テスト通過のための最小実装）**:
```typescript
// テストを通すための最小限のロジック
quiz.get('/:id', async (c) => {
  const id = c.req.param('id')
  
  // 最小限のテスト通過ロジック
  if (id === 'approved-quiz-id') {
    return c.json({ status: 'Approved' })
  } else if (id === 'rejected-quiz-id') {
    return c.json({ status: 'Rejected' })
  }
  
  return c.json({ status: 'PendingApproval' })
})
```

**Refactor状態（適切な実装）**:
```typescript
// 適切なビジネスロジック実装
quiz.get('/:id', async (c) => {
  const quizId = c.req.param('id')
  
  try {
    const quiz = await quizRepository.findById(new QuizId(quizId))
    if (!quiz) {
      return c.json({ error: 'Quiz not found' }, 404)
    }
    
    return c.json({
      id: quiz.id.value,
      question: quiz.question.value,
      correctAnswer: quiz.correctAnswer.value,
      status: quiz.getStatus(),
      createdAt: quiz.createdAt
    })
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500)
  }
})
```

### 5.2 Domain Models実装

**api/src/domain/quiz/quiz.aggregate.ts**:
```typescript
export type QuizStatus = 'PendingApproval' | 'Approved' | 'Rejected'

export class Quiz {
  constructor(
    public readonly id: QuizId,
    public readonly question: Question, 
    public readonly correctAnswer: CorrectAnswer,
    public readonly explanation: Explanation | null,
    public readonly tags: Tag[],
    public readonly creatorId: CreatorId,
    private status: QuizStatus = 'PendingApproval',
    public readonly createdAt: Date = new Date()
  ) {}

  // ビジネスメソッド（ユビキタス言語準拠）
  approve(reviewerId: string): void {
    if (this.status !== 'PendingApproval') {
      throw new Error('Only pending quizzes can be approved')
    }
    
    this.status = 'Approved'
    // ドメインイベント発行（実装時）
  }

  reject(reviewerId: string, reason: string): void {
    if (this.status !== 'PendingApproval') {
      throw new Error('Only pending quizzes can be rejected')
    }
    
    this.status = 'Rejected'
    // ドメインイベント発行（実装時）
  }

  getStatus(): QuizStatus {
    return this.status
  }

  isAvailableForLearning(): boolean {
    return this.status === 'Approved'
  }
}

// Value Objects（ユビキタス言語準拠）
export class QuizId {
  constructor(public readonly value: string) {
    if (!value || value.length === 0) {
      throw new Error('QuizId cannot be empty')
    }
  }
}

export class Question {
  constructor(public readonly value: string) {
    if (!value || value.length === 0) {
      throw new Error('Question cannot be empty')
    }
    if (value.length > 500) {
      throw new Error('Question cannot exceed 500 characters') // requirements-quiz.md:11
    }
  }
}

export class CorrectAnswer {
  constructor(public readonly value: boolean) {}
}
```

### 5.3 Repository実装

**api/src/domain/quiz/quiz.repository.ts**:
```typescript
export interface QuizRepository {
  save(quiz: Quiz): Promise<void>
  findById(id: QuizId): Promise<Quiz | null>
  findByStatus(status: QuizStatus): Promise<Quiz[]>
  findByCreatorId(creatorId: CreatorId): Promise<Quiz[]>
}

// Infrastructure layer implementation
export class DrizzleQuizRepository implements QuizRepository {
  async save(quiz: Quiz): Promise<void> {
    // Drizzle ORM implementation
  }

  async findById(id: QuizId): Promise<Quiz | null> {
    // Drizzle ORM implementation
  }

  // ... other methods
}
```

## 📋 完了判定基準

### Phase 3完了基準（スケルトン実装）
- [ ] 全APIエンドポイントが基本HTTPレスポンス返却（200/201番台）
- [ ] 全Domain Servicesが固定値レスポンス返却
- [ ] サーバー起動・ヘルスチェック正常動作
- [ ] TypeScriptコンパイルエラーなし

### Phase 4完了基準（テスト実装）
- [ ] 全フィーチャーファイルがCucumber.js で実行可能（Error なし）
- [ ] 全ステップ定義がTypeScript で実装済み
- [ ] 全シナリオが **Red状態**（Fail、Errorでない）
- [ ] World・Hooks・API Clientが正常動作

### Phase 5完了基準（本格実装）
- [ ] 全BDDテストが **Green状態**（Pass）
- [ ] Domain Models（エンティティ・値オブジェクト）実装完了
- [ ] Repository Interface・実装完了
- [ ] ビジネスロジック（承認フロー・品質評価）実装完了

### 品質保証基準
- [ ] TypeScript型安全性完全準拠
- [ ] ユビキタス言語辞書との用語統一（100%一致）
- [ ] DDD設計の4つの境界づけられたコンテキスト準拠
- [ ] Requirements/User Stories との完全トレーサビリティ

## 🔄 Red-Green-Refactor適用例

### サイクル1: Quiz Status Management

```typescript
// 🔴 Red: スケルトン実装（テストFail）
app.get('/quiz/:id', (c) => {
  return c.json({ status: 'PendingApproval' }) // 常に同じ値
})

// Test Result: ❌ Expected "Approved", got "PendingApproval"

// 🟢 Green: 最小テスト通過実装
app.get('/quiz/:id', (c) => {
  const id = c.req.param('id')
  if (id === 'approved-001') return c.json({ status: 'Approved' })
  return c.json({ status: 'PendingApproval' })
})

// Test Result: ✅ All tests pass

// 🔵 Refactor: 適切なビジネスロジック
app.get('/quiz/:id', async (c) => {
  const quiz = await quizService.findById(c.req.param('id'))
  return c.json({ status: quiz.getStatus() })
})

// Test Result: ✅ All tests pass + Clean code
```

### サイクル2: Quiz Quality Assessment

```typescript
// 🔴 Red: 固定値サービス（テストFail）
class QuizQualityAssessmentService {
  assessQuiz() {
    return { qualityScore: 'medium' } // 常に同じ値
  }
}

// 🟢 Green: テスト条件分岐
class QuizQualityAssessmentService {
  assessQuiz(quiz) {
    if (quiz.question.includes('math')) return { qualityScore: 'high' }
    if (quiz.question.includes('<script>')) return { qualityScore: 'low' }
    return { qualityScore: 'medium' }
  }
}

// 🔵 Refactor: 本格的品質評価アルゴリズム
class QuizQualityAssessmentService {
  assessQuiz(quiz: Quiz) {
    const score = this.calculateQualityScore(quiz)
    const duplicateCheck = this.checkDuplicates(quiz)
    const contentSafety = this.checkContentSafety(quiz)
    
    return { qualityScore: score, duplicateCheck, contentSafety }
  }
}
```

## 🎯 実装時の重要注意点

### 1. ユビキタス言語の完全準拠
- コード内変数名: `Quiz`, `CorrectAnswer`, `AnonymousUser`
- API endpoint名: `/quiz/submit`, `/admin/quiz/:id/review`
- テストステップ: `Given Creator submits Quiz`

### 2. DDD境界づけられたコンテキスト準拠
- Quiz Management: 承認フロー・品質管理
- Quiz Learning: 回答・学習進捗
- User Session: 匿名ユーザー管理
- Offline Sync: データ同期

### 3. Specifications連携
各実装において requirements-quiz.md, user-story-quiz.md の該当箇所をコメントで明記

### 4. エラーハンドリング
- **Error（予期しない失敗）**: 避けるべき状態
- **Fail（期待される失敗）**: Red-Green-Refactorでの正常プロセス

この計画書により、BDD/TDDベストプラクティスに完全準拠した、DDD設計と整合した高品質なAPI実装を実現します。