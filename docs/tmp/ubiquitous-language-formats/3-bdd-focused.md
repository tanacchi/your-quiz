# 案3: BDD特化型

## フォーマット概要

BDDテスト実装を最優先に設計。Gherkin表現（Given-When-Then）を中心とし、実際のテストコードへの変換を容易にする。ステップ定義との対応関係を明確化。

## 構成

```markdown
# ユビキタス言語辞書（BDD特化）

## Given句用語（前提条件）
### エンティティ存在
### システム状態
### ユーザー状態

## When句用語（実行動作）
### ユーザー操作
### システム処理
### 管理者操作

## Then句用語（期待結果）
### UI変化
### データ変更
### システム応答

各用語形式：
- **Gherkin表現**: [実際のGherkin文]
- **日本語**: [日本語用語]
- **英語**: [English term]
- **変数名**: [variableName]
- **ステップ定義**: [step definition code]
```

## サンプル実装

```markdown
# ユビキタス言語辞書（BDD特化）

## Given句用語（前提条件）

### エンティティ存在

#### クイズが承認済みである
- **Gherkin表現**: `Given クイズが承認済みである`
- **日本語**: 承認済みクイズ
- **英語**: Approved Quiz
- **変数名**: approvedQuiz
- **ステップ定義**: 
  ```typescript
  Given('クイズが承認済みである', async function() {
    this.quiz = await createApprovedQuiz({
      question: 'サンプル問題',
      correctAnswer: true,
      explanation: 'サンプル解説',
      status: 'approved'
    });
  });
  ```

#### 作成者が存在する
- **Gherkin表現**: `Given 作成者が存在する`
- **日本語**: 作成者
- **英語**: Creator
- **変数名**: creator
- **ステップ定義**:
  ```typescript
  Given('作成者が存在する', async function() {
    this.creator = await createCreator({
      id: generateCreatorHash(),
      isAnonymous: true
    });
  });
  ```

#### タグが設定されている
- **Gherkin表現**: `Given タグ "{string}" が設定されている`
- **日本語**: タグ設定済み
- **英語**: Tagged
- **変数名**: taggedQuiz
- **ステップ定義**:
  ```typescript
  Given('タグ {string} が設定されている', async function(tagName: string) {
    this.quiz.tags = [...this.quiz.tags, tagName];
    await this.quiz.save();
  });
  ```

### システム状態

#### アプリがオフラインモードである
- **Gherkin表現**: `Given アプリがオフラインモードである`
- **日本語**: オフラインモード
- **英語**: Offline Mode
- **変数名**: offlineMode
- **ステップ定義**:
  ```typescript
  Given('アプリがオフラインモードである', async function() {
    await this.app.setNetworkStatus('offline');
    this.isOffline = true;
  });
  ```

#### 承認待ちクイズが存在する
- **Gherkin表現**: `Given 承認待ちクイズが存在する`
- **日本語**: 承認待ちクイズ
- **英語**: Pending Quiz
- **変数名**: pendingQuiz
- **ステップ定義**:
  ```typescript
  Given('承認待ちクイズが存在する', async function() {
    this.pendingQuiz = await createQuiz({
      status: 'pendingApproval',
      submittedAt: new Date()
    });
  });
  ```

### ユーザー状態

#### ユーザーがアプリにアクセスしている
- **Gherkin表現**: `Given ユーザーがアプリにアクセスしている`
- **日本語**: アクセス中ユーザー
- **英語**: Accessing User
- **変数名**: accessingUser
- **ステップ定義**:
  ```typescript
  Given('ユーザーがアプリにアクセスしている', async function() {
    await this.browser.goto(this.baseUrl);
    this.currentUser = await createAnonymousUser();
  });
  ```

## When句用語（実行動作）

### ユーザー操作

#### ユーザーが右スワイプする
- **Gherkin表現**: `When ユーザーが右スワイプする`
- **日本語**: 右スワイプ
- **英語**: Swipe Right
- **変数名**: swipeRight
- **ステップ定義**:
  ```typescript
  When('ユーザーが右スワイプする', async function() {
    await this.page.swipeRight('#quiz-card');
    this.lastAction = 'swipeRight';
    this.userAnswer = true;
  });
  ```

#### ユーザーが左スワイプする
- **Gherkin表現**: `When ユーザーが左スワイプする`
- **日本語**: 左スワイプ
- **英語**: Swipe Left
- **変数名**: swipeLeft
- **ステップ定義**:
  ```typescript
  When('ユーザーが左スワイプする', async function() {
    await this.page.swipeLeft('#quiz-card');
    this.lastAction = 'swipeLeft';
    this.userAnswer = false;
  });
  ```

#### ユーザーがクイズを投稿する
- **Gherkin表現**: `When ユーザーがクイズを投稿する`
- **日本語**: クイズ投稿
- **英語**: Submit Quiz
- **変数名**: submitQuiz
- **ステップ定義**:
  ```typescript
  When('ユーザーがクイズを投稿する', async function() {
    await this.page.fill('#question-input', this.quizData.question);
    await this.page.selectOption('#correct-answer', this.quizData.correctAnswer);
    await this.page.fill('#explanation-input', this.quizData.explanation);
    await this.page.click('#submit-button');
  });
  ```

#### ユーザーがタグで絞り込む
- **Gherkin表現**: `When ユーザーがタグ "{string}" で絞り込む`
- **日本語**: タグ絞り込み
- **英語**: Filter by Tag
- **変数名**: filterByTag
- **ステップ定義**:
  ```typescript
  When('ユーザーがタグ {string} で絞り込む', async function(tagName: string) {
    await this.page.click(`[data-tag="${tagName}"]`);
    this.selectedTag = tagName;
  });
  ```

### システム処理

#### システムがデータを同期する
- **Gherkin表現**: `When システムがデータを同期する`
- **日本語**: データ同期
- **英語**: Data Sync
- **変数名**: dataSync
- **ステップ定義**:
  ```typescript
  When('システムがデータを同期する', async function() {
    await this.app.triggerSync();
    this.syncStarted = true;
  });
  ```

### 管理者操作

#### 管理者がクイズを承認する
- **Gherkin表現**: `When 管理者がクイズを承認する`
- **日本語**: クイズ承認
- **英語**: Approve Quiz
- **変数名**: approveQuiz
- **ステップ定義**:
  ```typescript
  When('管理者がクイズを承認する', async function() {
    await this.adminApi.approveQuiz(this.pendingQuiz.id);
    this.quiz.status = 'approved';
  });
  ```

## Then句用語（期待結果）

### UI変化

#### 正誤判定がバン表示される
- **Gherkin表現**: `Then 正誤判定がバン表示される`
- **日本語**: 正誤判定バン表示
- **英語**: Show Judgment Banner
- **変数名**: showJudgmentBanner
- **ステップ定義**:
  ```typescript
  Then('正誤判定がバン表示される', async function() {
    const banner = await this.page.waitForSelector('#judgment-banner');
    const isVisible = await banner.isVisible();
    expect(isVisible).toBe(true);
  });
  ```

#### バンがフェードアウトする
- **Gherkin表現**: `Then バンがフェードアウトする`
- **日本語**: フェードアウト
- **英語**: Fade Out
- **変数名**: fadeOut
- **ステップ定義**:
  ```typescript
  Then('バンがフェードアウトする', async function() {
    await this.page.waitForSelector('#judgment-banner', { state: 'hidden' });
    const opacity = await this.page.getAttribute('#judgment-banner', 'style');
    expect(opacity).toContain('opacity: 0');
  });
  ```

#### タグに一致するクイズが表示される
- **Gherkin表現**: `Then タグ "{string}" に一致するクイズが表示される`
- **日本語**: タグ一致表示
- **英語**: Show Matching Tagged Quizzes
- **変数名**: showMatchingQuizzes
- **ステップ定義**:
  ```typescript
  Then('タグ {string} に一致するクイズが表示される', async function(tagName: string) {
    const quizCards = await this.page.$$('[data-testid="quiz-card"]');
    for (const card of quizCards) {
      const cardTags = await card.getAttribute('data-tags');
      expect(cardTags).toContain(tagName);
    }
  });
  ```

### データ変更

#### 回答履歴に記録される
- **Gherkin表現**: `Then 回答履歴に記録される`
- **日本語**: 回答履歴記録
- **英語**: Record Answer History
- **変数名**: recordAnswerHistory
- **ステップ定義**:
  ```typescript
  Then('回答履歴に記録される', async function() {
    const history = await this.storage.getAnswerHistory();
    const latestAnswer = history[history.length - 1];
    expect(latestAnswer.quizId).toBe(this.quiz.id);
    expect(latestAnswer.userAnswer).toBe(this.userAnswer);
  });
  ```

#### クイズが承認済み状態になる
- **Gherkin表現**: `Then クイズが承認済み状態になる`
- **日本語**: 承認済み状態
- **英語**: Approved State
- **変数名**: approvedState
- **ステップ定義**:
  ```typescript
  Then('クイズが承認済み状態になる', async function() {
    const updatedQuiz = await this.database.getQuiz(this.quiz.id);
    expect(updatedQuiz.status).toBe('approved');
  });
  ```

### システム応答

#### エラーメッセージが表示される
- **Gherkin表現**: `Then エラーメッセージ "{string}" が表示される`
- **日本語**: エラーメッセージ表示
- **英語**: Show Error Message
- **変数名**: showErrorMessage
- **ステップ定義**:
  ```typescript
  Then('エラーメッセージ {string} が表示される', async function(message: string) {
    const errorElement = await this.page.waitForSelector('[data-testid="error-message"]');
    const errorText = await errorElement.textContent();
    expect(errorText).toContain(message);
  });
  ```

## Scenario Template（シナリオテンプレート）

### 基本クイズ回答フロー
```gherkin
Scenario: ユーザーが正解のクイズに回答する
  Given クイズが承認済みである
  And ユーザーがアプリにアクセスしている
  When ユーザーが右スワイプする
  Then 正誤判定がバン表示される
  And 回答履歴に記録される
  And バンがフェードアウトする
```

### タグ絞り込みフロー
```gherkin
Scenario: ユーザーがタグでクイズを絞り込む
  Given タグ "数学" が設定されている
  And ユーザーがアプリにアクセスしている
  When ユーザーがタグ "数学" で絞り込む
  Then タグ "数学" に一致するクイズが表示される
```

### 管理者承認フロー
```gherkin
Scenario: 管理者がクイズを承認する
  Given 承認待ちクイズが存在する
  When 管理者がクイズを承認する
  Then クイズが承認済み状態になる
```

## ステップ定義インデックス

### 共通パターン
- **Given系**: エンティティ存在、状態設定、前提条件
- **When系**: ユーザー操作、システム処理、管理者操作
- **Then系**: UI確認、データ確認、状態確認

### TypeScript型定義
```typescript
interface BDDContext {
  quiz: Quiz;
  creator: Creator;
  userAnswer: boolean;
  lastAction: string;
  isOffline: boolean;
  selectedTag: string;
  page: Page;
  storage: Storage;
  database: Database;
}
```
```

## 利点・欠点

### 利点
- ✅ **BDD直結**: Gherkinからコードへの変換が最短
- ✅ **テスト効率**: ステップ定義の再利用性が高い
- ✅ **実装支援**: 実際のテストコード例を提供
- ✅ **チーム協働**: QAエンジニアとの連携が容易

### 欠点
- ❌ **BDD専用**: BDD以外での使いにくさ
- ❌ **概念理解不足**: ドメイン概念の詳細説明が薄い
- ❌ **技術依存**: テスト実装技術に依存した内容

## 適用場面
- BDDテスト実装を重視するプロジェクト
- QAエンジニアとの協働が重要
- E2Eテストの自動化を積極推進
- Gherkinシナリオの品質向上が必要