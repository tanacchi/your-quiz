# BDDテスト実装

## 目的

- ビジネス関係者と開発チームが共通理解を持ち、ユーザー価値に焦点を当てたソフトウェア開発を実現するため、E2Eおよびドメイン結合シナリオをGherkin形式で記述し、実行可能な仕様として機能するBDDテストを実装する

### BDDが目指す世界観

- **共通理解**: 全ステークホルダーが同じ言葉で仕様を理解し、手戻りを最小化
- **生きたドキュメント**: テストが実行可能な仕様書として機能し、自動的に同期
- **ビジネス価値重視**: ユーザー行動に焦点を当て、技術詳細より成果を優先
- **継続的対話**: 早期検証と小単位修正によるフィードバックループ

## 遵守事項

- Gherkin形式（Given-When-Then）でのシナリオ記述を行う
- ユビキタス言語を定義し、ステークホルダー間の共通理解を構築する
- 実行可能な仕様として機能するBDDテストを実装する

## BDDテスト実装の手順

### 1. ユビキタス言語定義

#### 1.1 用語集作成
- `glossary/` ディレクトリ配下に `ubiquitous-language.md` ファイルを作成する
- プロジェクト固有のドメイン用語を定義する

#### 1.2 用語の合意形成
以下の手順で関係者間の用語統一を行う：

1. **ドメインエキスパートとの用語抽出セッション**
   - ビジネス側のキーパーソンと用語の意味を確認
   - 同義語や類義語の整理
   - 曖昧な表現の明確化

2. **開発チーム内での用語共有**
   - 技術実装との対応関係を明確化
   - コード内の命名規則との整合性確保

3. **用語集の構造化**
```markdown
# ユビキタス言語

## ドメイン用語
- **ユーザー**: システムを利用する個人または組織
- **アカウント**: ユーザーの認証情報とプロフィール情報
- **セッション**: ログイン状態を管理する一時的な接続

## アクション動詞
- **登録する**: 新規ユーザーがアカウントを作成する行為
- **認証する**: ユーザーが正当性を証明する行為
- **承認する**: システムがアクセス権限を付与する行為

## 状態表現
- **アクティブ**: 利用可能な状態
- **非アクティブ**: 一時的に利用停止中の状態
- **削除済み**: 論理削除された状態

## 判定基準
- **成功**: 処理が期待通りに完了した状態
- **失敗**: エラーまたは例外により処理が中断した状態
- **保留**: 外部承認待ちで処理が一時停止している状態
```

#### 1.3 用語集の維持管理
- 新機能開発時の用語追加・更新
- 定期的なレビューと整合性確認
- 非推奨用語の管理と移行計画

### 2. Gherkinシナリオ記述

#### 2.1 シナリオファイル作成
- `features/` ディレクトリ配下に `.feature` ファイルを作成する
- ファイル名は機能名を反映した分かりやすい名前にする（例：`user-registration.feature`）

#### 2.2 Gherkin記法での記述
以下の構造でシナリオを記述する：

```gherkin
Feature: 機能名
  機能の説明を1-2行で記述

Background:
  Given 共通の前提条件

Scenario: シナリオ名
  Given 前提条件
  When アクション
  Then 期待結果
  And 追加の期待結果

Scenario Outline: パラメータ化されたシナリオ名
  Given 前提条件 "<パラメータ1>"
  When アクション "<パラメータ2>"
  Then 期待結果 "<パラメータ3>"
  
Examples:
  | パラメータ1 | パラメータ2 | パラメータ3 |
  | 値1       | 値2       | 値3       |
```

#### 2.3 シナリオ記述の原則
- **Given**: システムの初期状態や前提条件を記述
- **When**: ユーザーのアクションやイベントを記述
- **Then**: 期待される結果や状態変化を記述
- **And/But**: 同じ種類のステップを追加する場合に使用
- 各ステップは具体的で検証可能な内容にする
- ビジネス価値に基づいたシナリオを優先する

### 3. Step Definitions実装

#### 3.1 ステップ定義ファイル作成
- `steps/` または `step_definitions/` ディレクトリ配下にファイルを作成
- 機能ごとにファイルを分割する（例：`user-registration.steps.js`）

#### 3.2 ステップ定義の実装
```javascript
// Given ステップの実装例
Given('ユーザーが未登録状態である', async function () {
  // データベースの初期化
  await this.database.clearUsers();
});

// When ステップの実装例
When('ユーザーが登録フォームに {string} を入力する', async function (email) {
  await this.page.fill('[data-testid="email"]', email);
  await this.page.click('[data-testid="submit"]');
});

// Then ステップの実装例
Then('ユーザー登録が成功すること', async function () {
  const response = await this.lastResponse;
  expect(response.status).toBe(201);
});
```

#### 3.3 ステップ定義の原則
- 各ステップは単一責任の原則に従う
- 再利用可能なヘルパー関数を作成する
- テストデータは外部ファイルまたは Fixture として管理する
- 非同期処理は適切に `async/await` を使用する

### 4. テスト環境セットアップ

#### 4.1 Hook関数の実装
```javascript
// Before Hook: 各シナリオ実行前の処理
Before(async function () {
  // データベース初期化
  await this.database.migrate();
  // アプリケーション起動
  await this.app.start();
});

// After Hook: 各シナリオ実行後の処理
After(async function () {
  // クリーンアップ処理
  await this.database.cleanup();
  await this.app.stop();
});
```

#### 4.2 World オブジェクトの設定
```javascript
// World.js - テスト実行コンテキストの定義
class CustomWorld {
  constructor() {
    this.database = new TestDatabase();
    this.app = new TestApplication();
    this.page = null;
    this.lastResponse = null;
  }
}

setWorldConstructor(CustomWorld);
```

### 5. テストデータ管理

#### 5.1 Fixture ファイル作成
- `fixtures/` ディレクトリ配下にテストデータを配置
- JSON形式またはYAML形式でデータを管理

```json
// fixtures/users.json
{
  "validUser": {
    "email": "user@example.com",
    "password": "SecurePassword123"
  },
  "invalidUser": {
    "email": "invalid-email",
    "password": "weak"
  }
}
```

#### 5.2 データベース状態管理
- 各シナリオで独立したデータ状態を保証する
- シナリオ間でのデータ汚染を防ぐ
- テスト用データベースを使用する

### 6. エラーハンドリング

#### 6.1 失敗時の診断情報収集
```javascript
After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    // スクリーンショット取得
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
    
    // ログ出力
    console.log('Scenario failed:', scenario.pickle.name);
  }
});
```

#### 6.2 適切なエラーメッセージ
- 失敗理由が明確に分かるアサーションメッセージを記述
- デバッグに必要な情報をログ出力する

### 7. 並列実行対応

#### 7.1 テスト分離
- 各シナリオが独立して実行できるよう設計
- 共有リソースへの同時アクセスを避ける
- データベースやファイルシステムの競合状態を防ぐ

#### 7.2 リソース管理
- テストポート番号の動的割り当て
- 一意なテストデータベース名の使用
- 並列実行時のタイムアウト設定調整

## 完了判定基準

- ユビキタス言語が定義され、用語集が作成されていること
- 全シナリオがGherkin形式（Given-When-Then）で記述されていること
- Step Definitionsが実装され、テストがコンパイル・実行可能になっていること
- BDDテスト実行時に全シナリオがRedで失敗していること
- 各ステップが単一責任の原則に従って実装されていること
- テストデータが適切に管理されていること
- Hook関数によるセットアップ・クリーンアップが実装されていること
- エラーハンドリングが適切に実装されていること
- 並列実行に対応した設計になっていること
- Markdownのlintルールに従っていない記述が少ないこと

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける