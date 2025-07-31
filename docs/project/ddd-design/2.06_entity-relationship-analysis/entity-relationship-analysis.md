# エンティティ関連性分析

## 目的

[ドメインオブジェクト分類](docs/project/ddd-design/2.05_domain-object-extraction/domain-object-analysis.md)で特定したエンティティ間の関連性を体系的に分析し、集約境界設計・リポジトリ設計・DB設計への制約と指針を明確化する。

## 概要

クイズアプリケーションにおけるエンティティ間の関連性を分析し、所有関係・参照関係・集約境界を明確化します。この分析は`specifications/user-stories/user-story-quiz.md`のユーザー操作シナリオと`requirements-quiz.md`のデータ関係制約に基づいています。

## エンティティ関連性マップ

```mermaid
erDiagram
    Quiz {
        QuizId id PK
        string question
        boolean correctAnswer
        string explanation
        string[] tags
        QuizStatus status
        CreatorId creatorId
        Timestamp createdAt
        Timestamp approvedAt
    }

    Answer {
        AnswerId id PK
        QuizId quizId FK
        SessionId sessionId FK
        boolean userAnswer
        boolean isCorrect
        Timestamp answeredAt
    }

    QuizSession {
        SessionId id PK
        CreatorId creatorId
        string deviceFingerprint
        Timestamp startedAt
        Timestamp lastAccessAt
    }

    Quiz ||--o{ Answer : "answered by"
    QuizSession ||--o{ Answer : "contains"
    QuizSession }o--|| Quiz : "created by"
```

## 関連性パターン分析表

| エンティティA | エンティティB | 関連性 | 多重度 | 所有/参照 | 判定理由 | 制約事項 |
|---------------|---------------|--------|--------|-----------|----------|----------|
| **Quiz** | **Answer** | クイズ-回答 | 1:N | 参照関係 | Answerが外部キーでQuizを参照 | 承認済みクイズのみ回答可能 |
| **QuizSession** | **Answer** | セッション-回答 | 1:N | 所有関係 | セッション内で複数回答を管理 | セッション削除時回答も削除 |
| **QuizSession** | **Quiz** | セッション-作成クイズ | 1:N | 参照関係 | 作成者識別による関連付け | CreatorIdによる間接参照 |

## 詳細関連性分析

### 1. Quiz ←→ Answer 関係

#### 関連性の特徴

- **種別**: 参照関係（1:N）
- **方向性**: Answer → Quiz（単方向参照）
- **カスケード**: なし（Quizが削除されてもAnswerは履歴として保持）

#### ビジネスルール

1. **回答可能性制約**: 承認済み（Approved）状態のQuizのみ回答可能
2. **回答重複許可**: 同一Quizに対する複数回答は許可
3. **履歴保持**: Quiz削除後もAnswer履歴は保持（匿名化）

#### 実装上の考慮事項

```typescript
interface Answer {
  readonly quizId: QuizId; // 外部キー参照
  // Quiz承認状態の事前チェックが必要
}

// 回答時のバリデーション
const validateAnswerCreation = (quiz: Quiz, answer: Answer): Result<void, Error> => {
  if (quiz.status !== QuizStatus.Approved) {
    return err(new Error('承認済みクイズのみ回答可能'));
  }
  return ok(undefined);
};
```

### 2. QuizSession ←→ Answer 関係

#### 関連性の特徴（QuizSession-Answer）

- **種別**: 所有関係（1:N）
- **方向性**: QuizSession ← Answer（双方向）
- **カスケード**: Session削除時にAnswerも削除

#### ビジネスルール（QuizSession-Answer）

1. **セッション包含**: すべてのAnswerは特定のQuizSessionに属する
2. **匿名性保証**: SessionIdによる匿名回答管理
3. **オフライン対応**: セッション単位でのオフライン同期

#### 実装上の考慮事項（QuizSession-Answer）

```typescript
interface QuizSession {
  readonly id: SessionId;
  answers: Answer[]; // 所有関係

  addAnswer(answer: Answer): Result<void, Error> {
    // 整合性チェック
    this.answers.push(answer);
    return ok(undefined);
  }
}
```

### 3. QuizSession ←→ Quiz 関係

#### 関連性の特徴（QuizSession-Quiz）

- **種別**: 参照関係（1:N）
- **方向性**: QuizSession → Quiz（CreatorId経由）
- **カスケード**: なし（間接参照のため）

#### ビジネスルール（QuizSession-Quiz）

1. **作成者識別**: CreatorIdによる間接的な所有関係
2. **匿名性保証**: 直接的なユーザー情報は保存しない
3. **作成権限**: セッション作成者のみが自分のクイズを確認可能

#### 実装上の考慮事項（QuizSession-Quiz）

```typescript
interface QuizSession {
  readonly creatorId: CreatorId;

  // 作成者のクイズを取得（リポジトリ経由）
  getCreatedQuizzes(quizRepository: QuizRepository): Promise<Quiz[]> {
    return quizRepository.findByCreatorId(this.creatorId);
  }
}
```

## 集約境界の候補

### 候補1: Quiz単体集約

#### 集約構成（Quiz単体集約）

- **集約ルート**: Quiz
- **集約メンバー**: なし（Quizのみ）
- **境界**: Quiz単体

#### メリット（Quiz単体集約）

- シンプルな境界設定
- 承認フローの独立性
- スケーラビリティ

#### デメリット（Quiz単体集約）

- Answer管理の複雑化
- 整合性保証の困難

### 候補2: QuizSession集約

#### 集約構成（QuizSession集約）

- **集約ルート**: QuizSession
- **集約メンバー**: Answer（複数）
- **境界**: セッション単位

#### メリット（QuizSession集約）

- 匿名ユーザー管理の統一
- オフライン同期の一元化
- 回答履歴の一貫性保証

#### デメリット（QuizSession集約）

- 集約サイズの肥大化懸念
- Quiz参照の複雑化

### 推奨: ハイブリッド境界設定

#### Quiz集約

- **集約ルート**: Quiz
- **責務**: クイズライフサイクル管理
- **不変条件**: 承認状態・内容整合性

#### Session集約

- **集約ルート**: QuizSession
- **集約メンバー**: Answer（複数）
- **責務**: 匿名ユーザー活動管理
- **不変条件**: 回答履歴整合性

## 整合性保証戦略

### 1. 集約内整合性（強一貫性）

#### Quiz集約内

- ステータス遷移の妥当性
- 問題文・解説の制約チェック
- 作成者権限の検証

#### Session集約内

- 回答時刻の順序性
- セッション内回答の整合性
- オフライン同期状態

### 2. 集約間整合性（結果整合性）

#### Quiz-Answer間

- 承認済みクイズのみ回答可能（参照時チェック）
- Quiz削除時のAnswer孤児化許可（履歴保持）
- 統計情報の非同期更新

#### Session-Quiz間

- 作成者権限の間接的確認
- CreatorId一致性の検証
- 作成クイズ表示の権限制御

### 3. 実装パターン

#### リポジトリパターン

```typescript
interface QuizRepository {
  findById(id: QuizId): Promise<Quiz | null>;
  findByCreatorId(creatorId: CreatorId): Promise<Quiz[]>;
  findApprovedQuizzes(): Promise<Quiz[]>;
  save(quiz: Quiz): Promise<void>;
}

interface SessionRepository {
  findById(id: SessionId): Promise<QuizSession | null>;
  findByCreatorId(creatorId: CreatorId): Promise<QuizSession | null>;
  save(session: QuizSession): Promise<void>;
}
```

#### ドメインサービス

```typescript
class QuizAnswerService {
  constructor(
    private quizRepo: QuizRepository,
    private sessionRepo: SessionRepository
  ) {}

  async recordAnswer(
    sessionId: SessionId,
    quizId: QuizId,
    userAnswer: boolean
  ): Promise<Result<void, Error>> {
    const [quiz, session] = await Promise.all([
      this.quizRepo.findById(quizId),
      this.sessionRepo.findById(sessionId)
    ]);

    if (!quiz || quiz.status !== QuizStatus.Approved) {
      return err(new Error('回答できないクイズです'));
    }

    if (!session) {
      return err(new Error('無効なセッションです'));
    }

    const answer = Answer.create({
      quizId,
      sessionId,
      userAnswer,
      isCorrect: userAnswer === quiz.correctAnswer.value
    });

    session.addAnswer(answer);
    await this.sessionRepo.save(session);

    return ok(undefined);
  }
}
```

## パフォーマンス考慮事項

### 1. クエリ最適化

#### 効率的なクエリパターン

- Quiz取得: Status + CreatedAt でのインデックス
- Answer取得: SessionId + AnsweredAt でのインデックス
- Session取得: CreatorId でのインデックス

#### 避けるべきパターン

- N+1クエリ（Quiz-Answer結合）
- 全量取得（ページネーション必須）
- 複雑JOIN（集約境界を越えた結合）

### 2. キャッシュ戦略

#### キャッシュ対象

- 承認済みクイズ一覧（高頻度アクセス）
- タグ一覧（フィルタリング用）
- セッション情報（ユーザー識別用）

#### キャッシュ無効化

- Quiz承認時の一覧キャッシュ無効化
- セッション更新時の権限キャッシュ無効化

### 3. データ分割

#### シャーディング候補

- CreatorIdによるセッション分割
- 日付によるAnswer履歴分割
- StatusによるQuiz分割

#### パーティション戦略

- 時系列分割（月次パーティション）
- 機能分割（読み書き分離）

## まとめ

クイズアプリケーションにおけるエンティティ間関係を3つの主要パターン（Quiz↔Answer、QuizSession↔Answer、QuizSession↔Quiz）として整理し、それぞれの関係性・多重度・整合性制約を明確化しました。

**ハイブリッド境界設定**（Quiz集約 + Session集約）により、承認フローとユーザー活動を適切に分離しながら、必要な整合性保証を実現します。この設計により、スケーラビリティと保守性を両立した実装が可能になります。

## 関連ドキュメント

- [ドメインオブジェクト分類](docs/project/ddd-design/2.05_domain-object-extraction/domain-object-analysis.md)
- [集約設計](docs/project/ddd-design/2.08_aggregate-design/README.md)
- [境界づけられたコンテキスト定義](docs/project/ddd-design/2.09_bounded-context-definition/README.md)
- [ドメインサービス抽出](docs/project/ddd-design/2.07_domain-service-extraction/domain-service-analysis.md)

---
**作成工程**: DDD設計
**作成日**: 2025-01-30
**更新日**: 2025-01-30
