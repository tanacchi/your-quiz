# User Domain API

## 責務

- 匿名ユーザー識別・セッション管理
- 作成者権限・デバイス識別
- プライバシー保護・データ整合性

## エンドポイント一覧

### 3.1 セッション管理

```http
POST   /api/user/v1/sessions
GET    /api/user/v1/sessions/current
PUT    /api/user/v1/sessions/current
DELETE /api/user/v1/sessions/current

# 動詞API (セッション制御)
POST   /api/user/v1/sessions/refresh
```

#### POST /api/user/v1/sessions

**目的**: 新しい匿名セッションの開始

**対応UI**: アプリ初回起動、セッション期限切れ時

**リクエスト**:

```typescript
interface CreateSessionRequest {
  deviceFingerprint: {
    userAgent: string;
    screenResolution: string;
    timezone: string;
    language: string;
    platform: string;
  };
  sessionHint?: string;        // 既存セッション復帰のヒント
  capabilities: {
    offline: boolean;
    webGL: boolean;
    touchEvents: boolean;
  };
}
```

**レスポンス**:

```typescript
interface CreateSessionResponse {
  session: {
    id: string;
    accessToken: string;       // JWT
    refreshToken: string;
    expiresAt: string;
    createdAt: string;
  };
  user: {
    id: string;               // 匿名ユーザーID
    isNewUser: boolean;
    capabilities: string[];
    preferences: {
      theme: 'light' | 'dark' | 'system';
      language: string;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
    };
  };
}
```

#### GET /api/user/v1/sessions/current

**目的**: 現在セッション情報取得

**対応UI**: アプリ起動時、認証状態確認

**レスポンス**:

```typescript
interface GetCurrentSessionResponse {
  session: {
    id: string;
    userId: string;
    isActive: boolean;
    expiresAt: string;
    lastActivityAt: string;
  };
  user: {
    id: string;
    createdAt: string;
    totalSessions: number;
    preferences: UserPreferences;
    statistics: {
      totalAnswers: number;
      sessionsCompleted: number;
      correctRate: number;
    };
  };
  permissions: {
    canCreateQuiz: boolean;
    canDeleteOwnQuiz: boolean;
    dailyQuizLimit: number;
    dailyQuizRemaining: number;
  };
}
```

### 3.2 ユーザー管理

```http
GET    /api/user/v1/profile/me
PUT    /api/user/v1/profile/me
GET    /api/user/v1/permissions
DELETE /api/user/v1/profile/me
POST   /api/user/v1/profile/me/export-data
```

#### GET /api/user/v1/profile/me

**目的**: 匿名ユーザー情報取得

**対応UI**: MyPage → プロフィール表示

**レスポンス**:

```typescript
interface GetMeResponse {
  id: string;
  createdAt: string;
  lastActiveAt: string;
  deviceCount: number;         // 関連デバイス数
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    defaultDifficulty: 'beginner' | 'intermediate' | 'advanced';
    showExplanations: boolean;
    enableNotifications: boolean;
    soundEffects: boolean;
  };
  privacy: {
    trackingAllowed: boolean;
    analyticsEnabled: boolean;
    dataRetentionDays: number;
  };
  limits: {
    dailyQuizCreation: number;
    maxDraftCount: number;
    maxSessionHistory: number;
  };
}
```

#### PUT /api/user/v1/profile/me

**目的**: ユーザー設定・プリファレンス更新

**対応UI**: MyPage → 設定変更

**リクエスト**:

```typescript
interface UpdateMeRequest {
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    defaultDifficulty?: 'beginner' | 'intermediate' | 'advanced';
    showExplanations?: boolean;
    enableNotifications?: boolean;
    soundEffects?: boolean;
  };
  privacy?: {
    trackingAllowed?: boolean;
    analyticsEnabled?: boolean;
  };
}
```

### 3.3 作成者権限管理

```http
POST   /api/user/v1/creator/claims
GET    /api/user/v1/creator/my-quizzes
PUT    /api/user/v1/creator/claims/:quizId
DELETE /api/user/v1/creator/claims/:quizId
```

#### POST /api/user/v1/creator/claims

**目的**: 作成者権限の主張（デバイス変更時など）

**対応UI**: MyPage → 投稿管理 → 「作成者権限を主張」

**リクエスト**:

```typescript
interface CreateCreatorClaimRequest {
  quizId: string;
  evidence: {
    originalDeviceFingerprint?: string;
    creationTimestamp?: string;
    draftContent?: string;      // 下書き内容の一部
  };
  reason: string;              // 権限主張の理由
}
```

#### GET /api/user/v1/creator/my-quizzes

**目的**: 自分が作成したクイズ一覧取得

**対応UI**: MyPage → 投稿管理

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|---------|
| status | query | 任意 | enum | "all" | all/pending/approved/rejected/published | ステータスフィルター<br/>例: "pending" |
| tags | query | 任意 | string[] | - | 1-10個、各1-50文字 | タグフィルター（カンマ区切り）<br/>例: "javascript,react" |
| difficulty | query | 任意 | enum | "all" | beginner/intermediate/advanced/all | 難易度フィルター |
| sort | query | 任意 | enum | "created_at" | created_at/updated_at/popularity/accuracy | ソート基準 |
| order | query | 任意 | enum | "desc" | asc/desc | ソート順序 |
| limit | query | 任意 | number | 20 | 1-100 | 取得件数 |
| offset | query | 任意 | number | 0 | ≥0 | オフセット |
| created_after | query | 任意 | string | - | ISO 8601 | 作成日時以降<br/>例: "2024-01-01T00:00:00Z" |
| created_before | query | 任意 | string | - | ISO 8601 | 作成日時以前 |
| include | query | 任意 | string[] | - | statistics/approval_history/recent_answers | 含める関連データ<br/>例: "statistics,approval_history" |
| min_answers | query | 任意 | number | - | ≥0 | 最小回答数フィルター<br/>例: 10 |
| min_accuracy | query | 任意 | number | - | 0-100 | 最小正答率フィルター（%）<br/>例: 70 |

**レスポンス**:

```typescript
interface GetMyCreationsResponse {
  quizzes: Array<{
    id: string;
    question: string;          // 最初の100文字
    status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'published';
    createdAt: string;
    lastModifiedAt: string;
    statistics?: {
      totalAnswers: number;
      correctRate: number;
    };
    permissions: {
      canEdit: boolean;
      canDelete: boolean;
      canViewStats: boolean;
    };
  }>;
  summary: {
    total: number;
    byStatus: Record<string, number>;
    totalAnswersReceived: number;
    averageCorrectRate: number;
  };
}
```

## 関連ドキュメント

- [API設計概要](../README.md)
- [Quiz Management API](01-quiz-management.md)
- [Quiz Learning API](02-quiz-learning.md)
- [共通仕様](07-common-specs.md)

---
**ドメイン**: User Session Context  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/operations/user-session.tsp`
