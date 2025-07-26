# 本実装

## 目的

- 単体テスト実装（TDD）で検証された設計に基づき、ビジネス要求を満たす高品質で保守性の高いプロダクションコードを実装し、BDDテストとE2Eテストで総合的に検証される完全なアプリケーションを構築するため、Clean Architectureに基づく階層化されたソースコードを作成する

## 遵守事項

- **Test-Drivenで実装済みのテストを必ず通すこと**
- **TypeScript厳格ルールの完全遵守**：any型、as型アサーション、Non-null assertion（!）を絶対に使用しない
- **Clean Architectureの階層分離を厳密に守る**：依存関係の方向を必ず内側（ドメイン）向きに統一
- **DRY原則とSOLID原則を適用**：重複コードの排除と単一責任の徹底
- **エラーハンドリングとロギングを必須実装**：適切な例外処理と運用監視に必要なログ出力
- **既存のTDDテストケースを全て通すこと**を実装完了の必要条件とする
- **パフォーマンスとセキュリティを考慮**した実装を行う

## アウトプット出力先

### 基本方針

Clean Architectureの層構造に基づく明確な責務分離を行い、テスト可能性と保守性を最大化する。既存の単体テストと緊密に連携し、TDD で確立された仕様を満たす実装を提供する。

### 出力先ディレクトリ構造

**基本方針**：フレームワークやライブラリのデファクトスタンダードに従う。以下は一般的なClean Architecture構成の例。

```text
src/
├── domain/                             # ドメイン層（ビジネスロジック）
│   ├── entities/                       # エンティティ
│   ├── value-objects/                  # 値オブジェクト
│   ├── aggregates/                     # 集約ルート
│   ├── services/                       # ドメインサービス
│   ├── repositories/                   # リポジトリインターフェース
│   └── events/                         # ドメインイベント
├── application/                        # アプリケーション層（ユースケース）
│   ├── use-cases/                      # ユースケース実装
│   ├── dtos/                           # データ転送オブジェクト
│   ├── ports/                          # 外部サービスインターフェース
│   └── mappers/                        # DTO-ドメインマッパー
├── infrastructure/                     # インフラストラクチャ層（技術詳細）
│   ├── database/                       # データベース関連
│   ├── external-services/              # 外部サービス実装
│   ├── web/                            # Web関連（Controller、Route等）
│   └── config/                         # 設定・DI管理
└── shared/                             # 共通ユーティリティ
    ├── utils/                          # ユーティリティ関数
    ├── constants/                      # 定数定義
    ├── types/                          # 共通型定義
    └── exceptions/                     # カスタム例外
```

**重要**：

- 具体的なディレクトリ構造は選択したフレームワーク（Express、Fastify、NestJS等）のベストプラクティスに従う
- Clean Architectureの層分離原則（依存関係の方向）を守ることが本質的に重要
- プロジェクト固有の要件に応じて調整可能

### アーキテクチャ制約の遵守

**Clean Architecture依存関係ルール**：

```text
外側 → 内側への依存のみ許可
Domain ← Application ← Infrastructure
                    ← Web/Presentation
```

### ファイル命名規則

- **TypeScriptファイル**: PascalCase（例：`UserController.ts`）
- **インデックスファイル**: `index.ts` で各ディレクトリのエクスポートを集約
- **テストファイル**: 対象ファイル名 + `.test.ts`（例：`UserController.test.ts`）
- **設定ファイル**: kebab-case + `.config.ts`（例：`database.config.ts`）
- **設定ファイル**: kebab-case + `.config.ts`（例：`database.config.ts`）

## 完了判定基準

### 実装品質の確保

- [ ] **全単体テストの通過**：TDDで作成された全テストケースが成功する
- [ ] **TypeScript厳格ルール遵守**：any型、as型アサーション、Non-null assertionが0件
- [ ] **Clean Architecture違反の排除**：依存関係の方向が内側向きに統一されている
- [ ] **エラーハンドリング完備**：全ての例外パターンに適切な処理が実装されている
- [ ] **ロギング実装完了**：運用監視に必要なログが適切に出力されている

### コード品質の確保

- [ ] **ESLint・Prettier適合**：コーディング規約に100%準拠している
- [ ] **SOLID原則適用**：単一責任、開放閉鎖、リスコフ置換、インターフェース分離、依存関係逆転の原則が適用されている
- [ ] **DRY原則適用**：重複コードが排除され、共通化が適切に行われている
- [ ] **命名規約統一**：ユビキタス言語に基づく一貫した命名が行われている
- [ ] **ドキュメント更新**：実装に伴うAPI仕様書、README更新が完了している

### パフォーマンス・セキュリティの確保

- [ ] **パフォーマンス要件達成**：レスポンス時間、スループット要件を満たしている
- [ ] **セキュリティ要件実装**：認証、認可、入力検証、出力エスケープが適切に実装されている
- [ ] **メモリ・リソース管理**：メモリリーク、コネクションリークが発生しない
- [ ] **並行性制御**：競合状態やデッドロックが発生しない設計になっている

### 運用性の確保

- [ ] **ヘルスチェック実装**：アプリケーションとその依存サービスの生存監視
- [ ] **メトリクス出力**：パフォーマンス監視に必要な指標を出力している
- [ ] **設定外部化**：環境別設定が適切に外部化されている
- [ ] **グレースフルシャットダウン**：アプリケーション終了時の適切な後始末処理

## 完了後

- 全実装成果物をリストアップし、ユーザーからのレビューを受ける
- BDDテスト・E2Eテストチームとの結合テスト準備を開始する
- 本番環境デプロイ前のパフォーマンステスト実施準備を行う
- 運用チームへの実装仕様説明会と運用手順書作成準備を開始する

## 本実装の手順

### 1. 実装前の準備と環境確認

#### 1.1 単体テスト仕様の確認

**既存TDDテストケースの分析**：

| 確認項目 | 確認内容 | 実装への影響 | 確認方法 |
|----------|----------|-------------|----------|
| **テストカバレッジ** | どの機能・メソッドがテスト対象か | 実装すべき機能の範囲確定 | カバレッジレポート分析 |
| **テストデータ** | 想定される入力・出力パターン | データ構造・バリデーション要件 | テストケース内のMockデータ確認 |
| **例外ケース** | エラーハンドリング要件 | 例外処理・エラーレスポンス実装 | 例外系テストケース分析 |
| **依存関係Mock** | 外部依存の抽象化レベル | インターフェース設計・DI設定 | Mock/Stub実装の確認 |

**成果物**: `implementation-plan/test-analysis.md`

#### 1.2 Clean Architecture基盤の準備

**層間依存関係の設計**：

```typescript
// 依存関係の方向（必須）
Domain ← Application ← Infrastructure
      ← Web Controllers ← Routes
```

**依存性注入（DI）の設計**：

| レイヤー | 注入対象 | 注入元 | 実装パターン |
|----------|----------|--------|-------------|
| **Application** | Repository IF, External Service IF | Infrastructure実装 | Constructor Injection |
| **Infrastructure** | DB接続, 外部API設定 | Config/Environment | Factory Pattern |
| **Web** | UseCase, Middleware | Application Layer | Controller Constructor |

### 2. ドメイン層の実装

#### 2.1 値オブジェクト（Value Objects）の実装

**不変性と検証の徹底**：

```typescript
// ✅ 正しい値オブジェクト実装パターン
export class Email {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  static create(value: string): Result<Email, ValidationError> {
    try {
      return Result.ok(new Email(value));
    } catch (error) {
      return Result.error(new ValidationError('Invalid email format'));
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  private validate(value: string): void {
    if (!value || !this.isValidEmailFormat(value)) {
      throw new ValidationError('Invalid email format');
    }
  }

  private isValidEmailFormat(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

// ❌ 禁止パターン
export class BadEmail {
  constructor(public value: any) { // any型禁止
    this.value = value as string;  // as型アサーション禁止
  }

  getValue() {
    return this.value!;  // Non-null assertion禁止
  }
}
```

#### 2.2 エンティティ（Entities）の実装

**識別性とライフサイクルの管理**：

```typescript
export class User {
  constructor(
    private readonly id: UserId,
    private email: Email,
    private profile: UserProfile,
    private status: UserStatus,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  // ビジネスルールを含むメソッド
  changeEmail(newEmail: Email): Result<void, DomainError> {
    if (this.status === UserStatus.INACTIVE) {
      return Result.error(new BusinessLogicError('Inactive user cannot change email'));
    }

    this.email = newEmail;
    this.updatedAt = new Date();

    // ドメインイベント発行
    this.addDomainEvent(new UserEmailChangedEvent(this.id, newEmail));

    return Result.ok();
  }

  activate(): Result<void, DomainError> {
    if (this.status === UserStatus.DELETED) {
      return Result.error(new BusinessLogicError('Deleted user cannot be activated'));
    }

    this.status = UserStatus.ACTIVE;
    this.updatedAt = new Date();

    return Result.ok();
  }

  // ゲッター（不変性保持）
  getId(): UserId { return this.id; }
  getEmail(): Email { return this.email; }
  getStatus(): UserStatus { return this.status; }
  isActive(): boolean { return this.status === UserStatus.ACTIVE; }
}
```

#### 2.3 集約（Aggregates）とドメインサービス

**集約境界の実装**：

```typescript
export class UserAggregate {
  constructor(
    private user: User,
    private profile: UserProfile,
    private preferences: UserPreferences
  ) {}

  // 集約内の整合性を保つメソッド
  updateProfile(updateData: ProfileUpdateData): Result<void, DomainError> {
    if (!this.user.isActive()) {
      return Result.error(new BusinessLogicError('Cannot update profile for inactive user'));
    }

    const updateResult = this.profile.update(updateData);
    if (updateResult.isError()) {
      return updateResult;
    }

    // 関連する設定の自動調整
    this.preferences.adjustForProfileChange(updateData);

    return Result.ok();
  }

  // 他集約への参照はIDのみ
  getAuthoredArticleIds(): ArticleId[] {
    return this.user.getAuthoredArticleIds(); // IDのみ返す
  }
}
```

### 3. アプリケーション層の実装

#### 3.1 ユースケース（Use Cases）の実装

**単一責任と依存関係注入**：

```typescript
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailService: IEmailService,
    private readonly logger: ILoggerService,
    private readonly userDomainService: UserDomainService
  ) {}

  async execute(request: RegisterUserRequestDto): Promise<Result<UserResponseDto, ApplicationError>> {
    try {
      // 1. 入力検証
      const validationResult = this.validateRequest(request);
      if (validationResult.isError()) {
        return Result.error(validationResult.error);
      }

      // 2. ビジネスルールチェック（ドメインサービス活用）
      const duplicateCheckResult = await this.userDomainService.checkEmailDuplication(request.email);
      if (duplicateCheckResult.isError()) {
        return Result.error(new BusinessLogicError('Email already exists'));
      }

      // 3. ドメインオブジェクト生成
      const emailResult = Email.create(request.email);
      if (emailResult.isError()) {
        return Result.error(new ValidationError('Invalid email format'));
      }

      const userResult = User.create(
        UserId.generate(),
        emailResult.value,
        UserProfile.create(request.name),
        UserStatus.PENDING_VERIFICATION
      );

      if (userResult.isError()) {
        return Result.error(userResult.error);
      }

      // 4. 永続化
      const saveResult = await this.userRepository.save(userResult.value);
      if (saveResult.isError()) {
        this.logger.error('Failed to save user', { email: request.email, error: saveResult.error });
        return Result.error(new InfrastructureError('Failed to save user'));
      }

      // 5. 外部サービス呼び出し
      const emailResult = await this.emailService.sendVerificationEmail(
        userResult.value.getEmail(),
        userResult.value.getVerificationToken()
      );

      if (emailResult.isError()) {
        this.logger.warn('Failed to send verification email', {
          userId: userResult.value.getId().getValue(),
          error: emailResult.error
        });
        // メール送信失敗は非致命的なので処理続行
      }

      // 6. レスポンス作成
      const response = UserMapper.toResponseDto(userResult.value);

      this.logger.info('User registered successfully', {
        userId: userResult.value.getId().getValue()
      });

      return Result.ok(response);

    } catch (error) {
      this.logger.error('Unexpected error in RegisterUserUseCase', { error });
      return Result.error(new InfrastructureError('Unexpected error occurred'));
    }
  }

  private validateRequest(request: RegisterUserRequestDto): Result<void, ValidationError> {
    const errors: string[] = [];

    if (!request.email) {
      errors.push('Email is required');
    }

    if (!request.name || request.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (errors.length > 0) {
      return Result.error(new ValidationError(errors.join(', ')));
    }

    return Result.ok();
  }
}
```

#### 3.2 DTO（Data Transfer Objects）とマッパー

**型安全なデータ転送**：

```typescript
// リクエストDTO
export interface RegisterUserRequestDto {
  readonly email: string;
  readonly name: string;
  readonly password: string;
}

// レスポンスDTO
export interface UserResponseDto {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly status: string;
  readonly createdAt: string;
}

// マッパー
export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.getId().getValue(),
      email: user.getEmail().getValue(),
      name: user.getProfile().getName(),
      status: user.getStatus().toString(),
      createdAt: user.getCreatedAt().toISOString()
    };
  }

  static toDomain(dto: RegisterUserRequestDto): Result<User, ValidationError> {
    const emailResult = Email.create(dto.email);
    if (emailResult.isError()) {
      return Result.error(emailResult.error);
    }

    const profileResult = UserProfile.create(dto.name);
    if (profileResult.isError()) {
      return Result.error(profileResult.error);
    }

    return User.create(
      UserId.generate(),
      emailResult.value,
      profileResult.value,
      UserStatus.PENDING_VERIFICATION
    );
  }
}
```

### 4. インフラストラクチャ層の実装

#### 4.1 リポジトリ実装

**ドメインモデルとDBエンティティの分離**：

```typescript
export class UserRepository implements IUserRepository {
  constructor(
    private readonly dbConnection: DatabaseConnection,
    private readonly logger: ILoggerService
  ) {}

  async save(user: User): Promise<Result<void, RepositoryError>> {
    try {
      const dbEntity = this.toDbEntity(user);

      await this.dbConnection.transaction(async (trx) => {
        await trx('users').insert(dbEntity);

        // 関連テーブルの更新
        if (user.getProfile()) {
          await trx('user_profiles').insert(this.profileToDbEntity(user.getProfile(), user.getId()));
        }
      });

      return Result.ok();

    } catch (error) {
      this.logger.error('Failed to save user', { error, userId: user.getId().getValue() });
      return Result.error(new RepositoryError('Failed to save user'));
    }
  }

  async findById(id: UserId): Promise<Result<User | null, RepositoryError>> {
    try {
      const dbEntity = await this.dbConnection('users')
        .leftJoin('user_profiles', 'users.id', 'user_profiles.user_id')
        .where('users.id', id.getValue())
        .first();

      if (!dbEntity) {
        return Result.ok(null);
      }

      const domainEntity = this.toDomainEntity(dbEntity);
      return Result.ok(domainEntity);

    } catch (error) {
      this.logger.error('Failed to find user', { error, userId: id.getValue() });
      return Result.error(new RepositoryError('Failed to find user'));
    }
  }

  private toDbEntity(user: User): UserDbEntity {
    return {
      id: user.getId().getValue(),
      email: user.getEmail().getValue(),
      status: user.getStatus().toString(),
      created_at: user.getCreatedAt(),
      updated_at: user.getUpdatedAt()
    };
  }

  private toDomainEntity(dbEntity: UserDbEntity): User {
    return User.reconstruct(
      UserId.create(dbEntity.id),
      Email.create(dbEntity.email).getValue(), // 既にDBに保存済みなので検証済み
      UserProfile.reconstruct(dbEntity.name, dbEntity.bio),
      UserStatus.fromString(dbEntity.status),
      dbEntity.created_at,
      dbEntity.updated_at
    );
  }
}
```

#### 4.2 Webレイヤー（Controllers, Middleware）

**HTTP関心事とビジネスロジックの分離**：

```typescript
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    private readonly logger: ILoggerService
  ) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // 1. リクエスト変換
      const requestDto: RegisterUserRequestDto = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      };

      // 2. ユースケース実行
      const result = await this.registerUserUseCase.execute(requestDto);

      // 3. レスポンス変換
      if (result.isSuccess()) {
        res.status(201).json({
          success: true,
          data: result.value
        });
      } else {
        this.handleError(result.error, res);
      }

    } catch (error) {
      this.logger.error('Unexpected error in UserController.register', { error });
      next(error);
    }
  }

  private handleError(error: ApplicationError, res: Response): void {
    switch (error.constructor) {
      case ValidationError:
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: error.message
        });
        break;

      case BusinessLogicError:
        res.status(409).json({
          success: false,
          error: 'Business rule violation',
          message: error.message
        });
        break;

      default:
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: 'An unexpected error occurred'
        });
    }
  }
}
```

### 5. エラーハンドリングとロギング

#### 5.1 階層化されたエラー処理

**エラー種別に応じた適切な処理**：

```typescript
// 基底エラークラス
export abstract class AppError extends Error {
  abstract readonly type: string;
  abstract readonly statusCode: number;

  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = this.constructor.name;
  }
}

// ドメインエラー
export class DomainError extends AppError {
  readonly type = 'DOMAIN_ERROR';
  readonly statusCode = 400;
}

export class ValidationError extends DomainError {
  readonly type = 'VALIDATION_ERROR';
  readonly statusCode = 400;
}

export class BusinessLogicError extends DomainError {
  readonly type = 'BUSINESS_LOGIC_ERROR';
  readonly statusCode = 409;
}

// アプリケーションエラー
export class ApplicationError extends AppError {
  readonly type = 'APPLICATION_ERROR';
  readonly statusCode = 500;
}

// インフラストラクチャエラー
export class InfrastructureError extends ApplicationError {
  readonly type = 'INFRASTRUCTURE_ERROR';
  readonly statusCode = 500;
}

export class RepositoryError extends InfrastructureError {
  readonly type = 'REPOSITORY_ERROR';
  readonly statusCode = 500;
}
```

#### 5.2 構造化ロギング

**運用監視に必要な情報の記録**：

```typescript
export class LoggerService implements ILoggerService {
  constructor(private readonly winston: Winston.Logger) {}

  info(message: string, metadata?: Record<string, any>): void {
    this.winston.info(message, {
      timestamp: new Date().toISOString(),
      level: 'info',
      ...metadata
    });
  }

  error(message: string, metadata?: Record<string, any>): void {
    this.winston.error(message, {
      timestamp: new Date().toISOString(),
      level: 'error',
      stack: metadata?.error?.stack,
      ...metadata
    });
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.winston.warn(message, {
      timestamp: new Date().toISOString(),
      level: 'warn',
      ...metadata
    });
  }
}
```

### 6. パフォーマンス・セキュリティ実装

#### 6.1 パフォーマンス最適化

**クエリ最適化とキャッシュ戦略**：

```typescript
export class OptimizedUserRepository implements IUserRepository {
  constructor(
    private readonly dbConnection: DatabaseConnection,
    private readonly cache: ICacheService,
    private readonly logger: ILoggerService
  ) {}

  async findById(id: UserId): Promise<Result<User | null, RepositoryError>> {
    // 1. キャッシュ確認
    const cacheKey = `user:${id.getValue()}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      this.logger.debug('User found in cache', { userId: id.getValue() });
      return Result.ok(this.deserializeUser(cached));
    }

    // 2. DB検索（最適化されたクエリ）
    try {
      const dbEntity = await this.dbConnection('users')
        .select(
          'users.id',
          'users.email',
          'users.status',
          'users.created_at',
          'users.updated_at',
          'user_profiles.name',
          'user_profiles.bio'
        )
        .leftJoin('user_profiles', 'users.id', 'user_profiles.user_id')
        .where('users.id', id.getValue())
        .first();

      if (!dbEntity) {
        return Result.ok(null);
      }

      const user = this.toDomainEntity(dbEntity);

      // 3. キャッシュ保存（5分間）
      await this.cache.set(cacheKey, this.serializeUser(user), 300);

      return Result.ok(user);

    } catch (error) {
      this.logger.error('Failed to find user', { error, userId: id.getValue() });
      return Result.error(new RepositoryError('Failed to find user'));
    }
  }
}
```

#### 6.2 セキュリティ実装

**認証・認可・入力検証の実装**：

```typescript
// 認証ミドルウェア
export class AuthMiddleware {
  constructor(
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUserRepository
  ) {}

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = this.extractToken(req);
      if (!token) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const payload = await this.jwtService.verify(token);
      const userId = UserId.create(payload.userId);

      const userResult = await this.userRepository.findById(userId);
      if (userResult.isError() || !userResult.value) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      req.user = userResult.value;
      next();

    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }

  private extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}

// 入力サニタイゼーション
export class InputSanitizer {
  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // HTMLタグ除去
      .substring(0, 1000);   // 長さ制限
  }

  static sanitizeEmail(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .substring(0, 255);
  }
}
```

## 実装時の注意点

### Clean Architecture原則の厳守

- **依存関係の方向**：必ず内側（ドメイン）向きに統一する
- **インターフェース経由の通信**：具象クラスへの直接依存を避ける
- **層の責務分離**：各層の関心事を混在させない
- **ドメインロジックの保護**：ビジネスルールはドメイン層に集約する

### TypeScript厳格ルールの遵守

- **any型の完全禁止**：未知の型は適切なUnion型やGeneric型で表現
- **型アサーションの禁止**：実行時の型安全性を保つ
- **Non-null assertionの禁止**：null/undefined チェックを必ず実装
- **厳密なnullチェック**：Optional Chainingと Nullish Coalescing を活用

### TDDテストとの整合性維持

- **実装前のテスト確認**：どのような動作が期待されているかを理解
- **リファクタリング時のテスト維持**：テストを壊さない形での改善
- **新機能追加時のテスト拡張**：仕様変更に伴うテストケース追加

### パフォーマンス・セキュリティの実装

- **N+1問題の回避**：適切なJOINやEager Loadingの使用
- **SQLインジェクション対策**：パラメータ化クエリの徹底
- **認証・認可の実装**：適切なセッション管理とアクセス制御
- **ログ出力の適切化**：機密情報の漏洩防止と運用監視情報の確保

この手順により、高品質で保守性が高く、実用的なプロダクションコードを段階的に構築できる。
