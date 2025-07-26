# 単体テスト実装（TDD）

## 目的

- APIレイヤーの個別コンポーネントをテスト駆動開発（TDD）で実装・検証し、BDDテストと相互補完することで、堅牢で保守性の高いAPIを構築するため、95%以上のカバレッジを達成する包括的な単体テスト群を作成する

## 遵守事項

- TDD（Test-Driven Development）サイクルに従った実装を行う
- 95%以上のテストカバレッジを達成する
- Mock/Stubを適切に使用し、テスト対象の責務を明確に分離する
- BDDテストとの役割分担を明確にし、相互補完する

## アウトプット出力先

### 基本方針

単体テストファイルは、テスト対象のソースコードと同じディレクトリ構造で管理し、テストファイル名には `.test.` または `.spec.` を含める。

### 出力先ディレクトリ構造

```
src/
├── controllers/
│   ├── userController.ts
│   └── userController.test.ts         # コントローラーテスト
├── services/
│   ├── userService.ts
│   └── userService.test.ts            # サービス層テスト
├── domain/
│   ├── entities/
│   │   ├── User.ts
│   │   └── User.test.ts               # エンティティテスト
│   ├── services/
│   │   ├── UserDomainService.ts
│   │   └── UserDomainService.test.ts  # ドメインサービステスト
│   └── repositories/
│       ├── IUserRepository.ts
│       └── UserRepository.test.ts      # リポジトリ実装テスト
├── infrastructure/
│   ├── database/
│   │   ├── UserRepository.ts
│   │   └── UserRepository.test.ts     # インフラ層テスト
│   └── external/
│       ├── EmailService.ts
│       └── EmailService.test.ts       # 外部サービステスト
└── utils/
    ├── validators/
    │   ├── userValidator.ts
    │   └── userValidator.test.ts       # バリデーターテスト
    └── helpers/
        ├── dateHelper.ts
        └── dateHelper.test.ts          # ヘルパー関数テスト
```

### テスト設定ファイル

```
tests/
├── setup/
│   ├── jest.config.js                 # Jest設定
│   ├── testSetup.ts                   # テスト環境セットアップ
│   └── globalTeardown.ts              # テスト後クリーンアップ
├── mocks/
│   ├── database.mock.ts               # データベースMock
│   ├── external-api.mock.ts           # 外部APIMock
│   └── repository.mock.ts             # リポジトリMock
├── fixtures/
│   ├── users.json                     # テストデータ
│   └── api-responses.json             # APIレスポンステストデータ
└── utils/
    ├── testHelpers.ts                 # テストヘルパー関数
    └── assertionHelpers.ts            # カスタムアサーション
```

## 単体テスト実装の手順

### 1. TDDサイクルの実践

#### 1.1 Red-Green-Refactorサイクル

1. **Red**: 失敗するテストを先に書く
2. **Green**: テストを通すための最小限のコードを実装
3. **Refactor**: コードの品質を向上させる（テストが通ることを保証）

#### 1.2 テスト実装の順序

```typescript
// 1. Red: 失敗するテストを作成
describe('UserService', () => {
  test('should create user with valid data', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    const result = await userService.createUser(userData);

    expect(result).toMatchObject({
      id: expect.any(String),
      email: userData.email,
      name: userData.name,
      createdAt: expect.any(Date)
    });
  });
});

// 2. Green: 最小限の実装
class UserService {
  async createUser(userData: UserCreateData): Promise<User> {
    return {
      id: 'generated-id',
      email: userData.email,
      name: userData.name,
      createdAt: new Date()
    };
  }
}

// 3. Refactor: 実装の改善
```

### 2. レイヤー別テスト戦略

#### 2.1 APIコントローラー層テスト

```typescript
// userController.test.ts
import { Request, Response } from 'express';
import { UserController } from './userController';
import { UserService } from '../services/userService';

jest.mock('../services/userService');

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: jest.Mocked<UserService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockUserService = new UserService() as jest.Mocked<UserService>;
    controller = new UserController(mockUserService);

    mockRequest = {
      body: {},
      params: {},
      query: {}
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  test('should create user successfully', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    const createdUser = { id: '1', ...userData, createdAt: new Date() };

    mockRequest.body = userData;
    mockUserService.createUser.mockResolvedValue(createdUser);

    await controller.createUser(mockRequest as Request, mockResponse as Response);

    expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: createdUser });
  });

  test('should handle validation errors', async () => {
    mockRequest.body = { email: 'invalid-email' };

    await controller.createUser(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        code: 'VALIDATION_ERROR',
        message: expect.any(String)
      }
    });
  });
});
```

#### 2.2 ドメインサービス層テスト

```typescript
// UserDomainService.test.ts
import { UserDomainService } from './UserDomainService';
import { IUserRepository } from '../repositories/IUserRepository';

describe('UserDomainService', () => {
  let service: UserDomainService;
  let mockRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn()
    };
    service = new UserDomainService(mockRepository);
  });

  test('should validate unique email before creating user', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    mockRepository.findByEmail.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue({ id: '1', ...userData });

    const result = await service.createUser(userData);

    expect(mockRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining(userData));
    expect(result.email).toBe(userData.email);
  });

  test('should throw error for duplicate email', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    const existingUser = { id: '1', email: userData.email, name: 'Existing User' };
    mockRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(service.createUser(userData)).rejects.toThrow('Email already exists');
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
```

#### 2.3 リポジトリ実装テスト

```typescript
// UserRepository.test.ts
import { UserRepository } from './UserRepository';
import { Database } from '../database/connection';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockDatabase: jest.Mocked<Database>;

  beforeEach(() => {
    mockDatabase = {
      query: jest.fn(),
      transaction: jest.fn()
    } as any;
    repository = new UserRepository(mockDatabase);
  });

  test('should save user to database', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    const expectedUser = { id: '1', ...userData, createdAt: new Date() };

    mockDatabase.query.mockResolvedValue({ rows: [expectedUser] });

    const result = await repository.save(userData);

    expect(mockDatabase.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO users'),
      expect.arrayContaining([userData.email, userData.name])
    );
    expect(result).toEqual(expectedUser);
  });

  test('should handle database errors', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    mockDatabase.query.mockRejectedValue(new Error('Database connection failed'));

    await expect(repository.save(userData)).rejects.toThrow('Database connection failed');
  });
});
```

### 3. Mock・Stub戦略

#### 3.1 外部依存関係のMock

```typescript
// external-api.mock.ts
export const mockEmailService = {
  sendWelcomeEmail: jest.fn().mockResolvedValue({ success: true }),
  sendPasswordResetEmail: jest.fn().mockResolvedValue({ success: true })
};

// database.mock.ts
export const mockDatabase = {
  query: jest.fn(),
  transaction: jest.fn(),
  close: jest.fn()
};
```

#### 3.2 テストダブルの使い分け

- **Mock**: 呼び出し検証が必要な場合
- **Stub**: 特定の戻り値が必要な場合
- **Spy**: 既存実装の呼び出し監視が必要な場合

### 4. テストデータ管理

#### 4.1 Fixtureファイルの作成

```json
// tests/fixtures/users.json
{
  "validUser": {
    "email": "user@example.com",
    "name": "Test User",
    "password": "SecurePassword123"
  },
  "adminUser": {
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  },
  "invalidUsers": [
    {
      "email": "invalid-email",
      "name": "Invalid User"
    },
    {
      "email": "test@example.com",
      "name": ""
    }
  ]
}
```

#### 4.2 テストヘルパー関数

```typescript
// tests/utils/testHelpers.ts
import { User } from '../../src/domain/entities/User';
import userData from '../fixtures/users.json';

export class TestDataBuilder {
  static createValidUser(overrides: Partial<User> = {}): User {
    return {
      id: 'test-id',
      email: userData.validUser.email,
      name: userData.validUser.name,
      createdAt: new Date(),
      ...overrides
    };
  }

  static createUserArray(count: number): User[] {
    return Array.from({ length: count }, (_, index) =>
      this.createValidUser({ id: `test-id-${index}`, email: `user${index}@example.com` })
    );
  }
}
```

### 5. エラーハンドリングテスト

#### 5.1 バリデーションエラーテスト

```typescript
describe('User Validation', () => {
  test('should reject invalid email format', () => {
    const invalidUser = { email: 'invalid-email', name: 'Test User' };

    expect(() => User.create(invalidUser)).toThrow('Invalid email format');
  });

  test('should reject empty name', () => {
    const invalidUser = { email: 'test@example.com', name: '' };

    expect(() => User.create(invalidUser)).toThrow('Name is required');
  });
});
```

#### 5.2 例外処理テスト

```typescript
describe('Error Handling', () => {
  test('should handle network timeout', async () => {
    mockExternalService.call.mockRejectedValue(new Error('TIMEOUT'));

    await expect(service.callExternalAPI()).rejects.toThrow('External service timeout');
  });

  test('should handle database constraint violation', async () => {
    mockRepository.save.mockRejectedValue(new Error('UNIQUE_VIOLATION'));

    await expect(service.createUser(userData)).rejects.toThrow('Email already exists');
  });
});
```

### 6. パフォーマンステスト

#### 6.1 レスポンス時間テスト

```typescript
describe('Performance Tests', () => {
  test('should respond within acceptable time limit', async () => {
    const startTime = Date.now();

    await service.processLargeDataset(testData);

    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(5000); // 5秒以内
  });
});
```

### 7. BDDテストとの連携

#### 7.1 役割分担の明確化

- **BDDテスト**: APIエンドポイントの振る舞い検証、ビジネスルール検証
- **単体テスト**: 個別コンポーネントの詳細検証、エラーハンドリング、境界値テスト

#### 7.2 相互補完関係

```typescript
// BDDテストでカバーされるもの
// - ユーザー登録のエンドツーエンドフロー
// - API仕様に基づくリクエスト/レスポンス検証

// 単体テストでカバーするもの
describe('UserService - Edge Cases', () => {
  test('should handle concurrent user creation', async () => {
    // BDDでは検証困難な同時実行テスト
  });

  test('should validate password complexity', () => {
    // 詳細なバリデーションロジックテスト
  });
});
```

### 8. CI/CD統合

#### 8.1 Jest設定

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup/testSetup.ts'],
  globalTeardown: '<rootDir>/tests/setup/globalTeardown.ts'
};
```

#### 8.2 テスト実行スクリプト

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## 完了判定基準

- 全ての単体テストがGreenで通過していること
- テストカバレッジが95%以上達成されていること
- Mock/Stubが適切に使用され、テスト対象の責務が明確に分離されていること
- TDDサイクル（Red-Green-Refactor）に従って実装されていること
- エラーハンドリングとエッジケースが適切にテストされていること
- CI/CD環境でテストが自動実行されること
- BDDテストとの役割分担が明確になっていること
- テストコードが保守しやすく、理解しやすい構造になっていること
- パフォーマンステストが実装されていること
- テストデータとFixtureが適切に管理されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける
