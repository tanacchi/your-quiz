# スケルトン実装

## 目的

- BDDテストで定義されたシナリオを満たす最小限のコード構造を構築し、開発チームが統一したアーキテクチャパターンで本実装を進めるため、必要な型定義、インターフェース、基本クラス構造を段階的に実装し、コンパイル可能で実行可能な状態を作る

## スケルトン実装とは

### 現代的な定義

- **コンパイル・実行可能な最小実装**: ビジネスロジックは空実装だが、型チェック・テスト実行が可能
- **契約ファースト設計**: インターフェースと型定義を先に確定し、実装詳細は後回し
- **段階的実装基盤**: 機能ごとに順次実装を進められる安定したベース
- **チーム並行作業の基盤**: 依存関係を明確にし、チームメンバーが同時並行で作業可能

### 従来のスタブとの違い

| 項目 | スケルトン実装 | 従来のスタブ |
|------|---------------|-------------|
| **目的** | 段階的実装の基盤作り | 一時的な代替実装 |
| **実装レベル** | 型安全・コンパイル可能 | 最低限動作のみ |
| **保守性** | 本実装に発展可能 | 捨てコード前提 |
| **テスト対応** | テスト実行可能 | テスト困難 |

## 遵守事項

- **段階的実装戦略**: 依存関係の少ない順に段階的に実装を進める
- **全てのドメインモデルは表形式でプロパティとメソッドを明示する**
- **型安全性優先**: TypeScript厳密設定に準拠し、コンパイルエラーゼロを維持
- **BDDテストが実行可能になる最小限の実装とする**
- any型、as型アサーション、Non-null assertion (!.) を絶対に使用しない
- Interface Segregation Principleに従い小さなインターフェースを設計する

## 段階的実装戦略

### Phase 1: コア型定義とインターフェース

1. **ドメインエンティティの型定義**
2. **値オブジェクトの実装**
3. **リポジトリインターフェースの定義**
4. **ドメインサービスインターフェースの定義**

### Phase 2: アプリケーション層の骨組み

1. **コマンド・クエリの型定義**
2. **ハンドラーインターフェースの定義**
3. **レスポンスDTOの型定義**

### Phase 3: インフラストラクチャ層の空実装

1. **リポジトリの空実装**（メモリ内実装・固定値返却）
2. **外部サービスの空実装**（成功レスポンス固定）

### Phase 4: プレゼンテーション層の接続

1. **コントローラーの実装**（ハンドラー呼び出しのみ）
2. **ルーティングの設定**
3. **エラーハンドリングの基本実装**

### 段階的実装のメリット

- **早期フィードバック**: 各段階でコンパイル・テスト実行可能
- **並行作業**: チームメンバーが異なる層で同時作業可能
- **リスク軽減**: 小さな単位で問題を発見・修正
- **依存性注入は必要に応じて**: 複雑性が増す場合のみ導入検討

## スケルトン実装の手順

### 1. ディレクトリ構造の構築

#### 1.1 DDD階層アーキテクチャの実装

```text
src/
├── domain/                 # ドメイン層
│   ├── entities/          # エンティティ
│   ├── value-objects/     # 値オブジェクト
│   ├── aggregates/        # 集約ルート
│   ├── repositories/      # リポジトリインターフェース
│   └── services/          # ドメインサービス
├── application/           # アプリケーション層
│   ├── commands/          # コマンド
│   ├── queries/           # クエリ
│   ├── handlers/          # コマンド・クエリハンドラー
│   └── services/          # アプリケーションサービス
├── infrastructure/        # インフラストラクチャ層
│   ├── persistence/       # データ永続化
│   ├── external/          # 外部システム連携
│   └── config/            # 設定
└── presentation/          # プレゼンテーション層
    ├── controllers/       # コントローラー
    ├── middleware/        # ミドルウェア
    └── routes/            # ルーティング
```

#### 1.2 必須ファイル作成

各ディレクトリにindex.tsファイルを作成し、エクスポートを管理する:

```typescript
// src/domain/index.ts
export * from './entities';
export * from './value-objects';
export * from './aggregates';
export * from './repositories';
export * from './services';
```

### 2. ドメインモデルの実装

#### 2.1 エンティティ定義（表形式仕様必須）

**エンティティ設計表**:

| エンティティ名 | プロパティ | 型 | 必須 | デフォルト値 | 説明 | バリデーション |
|---------------|------------|----|----|-------------|------|--------------|
| **User** | id | UserId | ○ | - | ユーザー識別子 | UUID形式 |
|  | email | Email | ○ | - | メールアドレス | Email Value Object |
|  | name | UserName | ○ | - | ユーザー名 | UserName Value Object |
|  | createdAt | Date | ○ | new Date() | 作成日時 | 未来日時不可 |
|  | updatedAt | Date | ○ | new Date() | 更新日時 | 作成日時以降 |

**メソッド設計表**:

| エンティティ名 | メソッド名 | 引数 | 戻り値 | 責務 | 例外 |
|---------------|------------|------|--------|------|------|
| **User** | changeName | newName: UserName | void | ユーザー名変更 | InvalidUserNameError |
|  | changeEmail | newEmail: Email | void | メールアドレス変更 | DuplicateEmailError |
|  | equals | other: User | boolean | 同一性判定 | - |

#### 2.2 値オブジェクト定義（表形式仕様必須）

**値オブジェクト設計表**:

| 値オブジェクト名 | プロパティ | 型 | バリデーション | エラー型 | 例 |
|-----------------|------------|----|--------------|---------|----|
| **Email** | value | string | 正規表現チェック | InvalidEmailError | "<user@example.com>" |
| **UserName** | value | string | 1-50文字、英数字のみ | InvalidUserNameError | "john_doe123" |
| **UserId** | value | string | UUID v4形式 | InvalidUserIdError | "123e4567-e89b-..." |

**値オブジェクト実装例**:

```typescript
export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private readonly _value: string) {
    if (!Email.EMAIL_REGEX.test(_value)) {
      throw new InvalidEmailError(`Invalid email format: ${_value}`);
    }
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }
}
```

#### 2.3 集約ルート定義

集約境界を明確にし、不変条件を保護する:

```typescript
export class UserAggregate {
  constructor(
    private readonly _user: User,
    private readonly _userPreferences: UserPreferences[]
  ) {}

  // 集約の不変条件を保護するメソッドのみ公開
  public changeUserName(newName: UserName): Result<void, DomainError> {
    // ビジネスルールチェック
    // 状態変更
    // イベント発行
  }
}
```

### 3. アプリケーション層の実装

#### 3.1 コマンド・クエリ定義（表形式仕様必須）

**コマンド設計表**:

| コマンド名 | プロパティ | 型 | 必須 | 説明 | バリデーション |
|-----------|------------|----|----|------|--------------|
| **CreateUserCommand** | email | string | ○ | メールアドレス | Email形式 |
|  | name | string | ○ | ユーザー名 | 1-50文字 |
|  | password | string | ○ | パスワード | 8文字以上 |

**クエリ設計表**:

| クエリ名 | プロパティ | 型 | 必須 | 説明 | 戻り値型 |
|---------|------------|----|----|------|---------|
| **GetUserQuery** | userId | string | ○ | ユーザーID | Result<UserDto, NotFoundError> |
| **ListUsersQuery** | page | number | × | ページ番号 | Result<UserDto[], ValidationError> |
|  | limit | number | × | 取得件数 | - |

#### 3.2 ハンドラー実装

```typescript
export class CreateUserCommandHandler {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailService: IEmailService
  ) {}

  async handle(command: CreateUserCommand): Promise<Result<UserId, DomainError>> {
    // バリデーション
    // ドメインオブジェクト生成
    // ビジネスロジック実行
    // 永続化
    // イベント発行
    return ok(userId);
  }
}
```

### 4. インフラストラクチャ層の実装

#### 4.1 リポジトリ実装（表形式インターフェース必須）

**リポジトリインターフェース設計表**:

| インターフェース名 | メソッド名 | 引数 | 戻り値 | 責務 | 例外 |
|------------------|------------|------|--------|------|------|
| **IUserRepository** | findById | id: UserId | Promise<Result<User, NotFoundError>> | ID検索 | - |
|  | findByEmail | email: Email | Promise<Result<User, NotFoundError>> | Email検索 | - |
|  | save | user: User | Promise<Result<void, PersistenceError>> | 保存 | - |
|  | delete | id: UserId | Promise<Result<void, PersistenceError>> | 削除 | - |

#### 4.2 外部サービス実装

```typescript
export interface IEmailService {
  sendVerificationEmail(to: Email, token: string): Promise<Result<void, ExternalServiceError>>;
}

export class EmailService implements IEmailService {
  async sendVerificationEmail(to: Email, token: string): Promise<Result<void, ExternalServiceError>> {
    // 外部メールサービス呼び出し（スケルトン段階では空実装）
    return ok(undefined);
  }
}
```

### 5. プレゼンテーション層の実装

#### 5.1 コントローラー実装

```typescript
export class UserController {
  constructor(
    private readonly createUserHandler: CreateUserCommandHandler,
    private readonly getUserHandler: GetUserQueryHandler
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const command = new CreateUserCommand(req.body);
    const result = await this.createUserHandler.handle(command);

    result.match(
      (userId) => res.status(201).json({ id: userId.value }),
      (error) => res.status(400).json({ error: error.message })
    );
  }
}
```

#### 5.2 ルーティング設定

```typescript
export const userRoutes = Router();

userRoutes.post('/users', userController.createUser.bind(userController));
userRoutes.get('/users/:id', userController.getUser.bind(userController));
userRoutes.put('/users/:id', userController.updateUser.bind(userController));
userRoutes.delete('/users/:id', userController.deleteUser.bind(userController));
```

### 6. 依存性注入コンテナの設定

#### 6.1 DIコンテナ実装

```typescript
export class DIContainer {
  private readonly container = new Map<string, any>();

  register<T>(key: string, implementation: T): void {
    this.container.set(key, implementation);
  }

  resolve<T>(key: string): T {
    const implementation = this.container.get(key);
    if (!implementation) {
      throw new Error(`No implementation found for ${key}`);
    }
    return implementation;
  }
}

// コンテナ設定
export const configureDI = (): DIContainer => {
  const container = new DIContainer();

  // Repository
  container.register('IUserRepository', new UserRepository());

  // Service
  container.register('IEmailService', new EmailService());

  // Handler
  container.register('CreateUserCommandHandler',
    new CreateUserCommandHandler(
      container.resolve('IUserRepository'),
      container.resolve('IEmailService')
    )
  );

  return container;
};
```

### 7. エラーハンドリング統一

#### 7.1 ドメインエラー定義（表形式必須）

**ドメインエラー設計表**:

| エラー名 | 継承元 | メッセージフォーマット | HTTPステータス | 分類 |
|---------|--------|--------------------|---------------|------|
| **InvalidEmailError** | DomainError | "Invalid email format: {value}" | 400 | Validation |
| **DuplicateEmailError** | DomainError | "Email already exists: {email}" | 409 | Business Rule |
| **UserNotFoundError** | DomainError | "User not found: {userId}" | 404 | Not Found |
| **PersistenceError** | InfrastructureError | "Database operation failed: {operation}" | 500 | Infrastructure |

```typescript
export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly httpStatus: number;
}

export class InvalidEmailError extends DomainError {
  readonly code = 'INVALID_EMAIL';
  readonly httpStatus = 400;

  constructor(email: string) {
    super(`Invalid email format: ${email}`);
  }
}
```

## 完了判定基準

### 必須要件

- [x] **ディレクトリ構造**: DDD階層アーキテクチャに基づく適切なディレクトリ構造
- [x] **表形式設計書**: 全ドメインモデルでプロパティ・メソッドが表形式で明示されている
- [x] **型安全性**: any型、as型アサーション、Non-null assertion未使用
- [x] **インターフェース実装**: 全ての主要コンポーネントでインターフェースが定義されている
- [x] **依存性注入**: DIコンテナが設定され、依存関係が適切に管理されている
- [x] **BDD実行可能**: BDDテストが実行でき、意図的にFailとなることが確認できる

### 成果物

1. **ドメインモデル設計表とコード** (`src/domain/`)
2. **アプリケーション層コード** (`src/application/`)
3. **インフラストラクチャ層コード** (`src/infrastructure/`)
4. **プレゼンテーション層コード** (`src/presentation/`)
5. **DIコンテナ設定** (`src/di/`)
6. **BDD実行レポート** (スケルトン段階でのFail確認)

## 完了後の必須アクション

1. **直ちに**ユーザーに「スケルトンコード」のレビューを依頼する
2. **ADR作成判断**: アーキテクチャパターン、DIコンテナ、エラーハンドリング戦略について、ADRでの記録をユーザーに提案する
3. **次工程の判断**をユーザーに委ねる：
   - 通常フロー：「単体テスト実装」に進む
   - 戻りフロー：アーキテクチャ変更による設計調整で前工程に戻る
4. ユーザーの明示的な承認を得てから指定された工程に進む
