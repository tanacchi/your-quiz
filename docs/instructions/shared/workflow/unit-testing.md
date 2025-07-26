# 単体テスト実装（TDD）

## 目的

- APIレイヤーの個別コンポーネントをテスト駆動開発（TDD）で実装・検証し、BDDテストと相互補完することで、堅牢で保守性の高いAPIを構築するため、95%以上のカバレッジを達成する包括的な単体テスト群を作成する

## 遵守事項

- **パラメータ化テスト（Parameterized Test）を積極的に活用する**
- **describeブロックによる階層構造でテストを体系化する**
- **全テストケースは表形式で網羅的にテストシナリオを整理する**
- **TDD（Test-Driven Development）サイクルに従った実装を行う**
- **95%以上のテストカバレッジを達成する**
- Mock/Stubを適切に使用し、テスト対象の責務を明確に分離する
- BDDテストとの役割分担を明確にし、相互補完する
- 境界値、異常系、Edge Caseを必ず表形式で整理し漏れなくテストする

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
│   ├── vitest.config.ts               # Vitest設定
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

#### 1.2 テスト構造化の原則

**describe階層設計原則**:
- **機能単位**: 最上位のdescribeはクラス・モジュール単位
- **メソッド単位**: 2段目のdescribeは個別メソッド単位
- **条件単位**: 3段目のdescribeは特定の条件・状況単位
- **テストケース**: 最下位のtest/itで具体的なアサーション

**パラメータ化テスト活用原則**:
- **同一ロジック・異なるデータ**: test.each()で重複排除
- **境界値テスト**: 複数の境界条件を効率的にテスト
- **異常系パターン**: エラーパターンを網羅的にテスト

#### 1.3 テスト実装の順序（Vitestサンプル）

```typescript
// 1. Red: 失敗するテストを作成
import { describe, test, expect } from 'vitest'

describe('UserService', () => {
  describe('createUser', () => {
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

    // パラメータ化テストの例
    test.each([
      ['valid email', 'user@example.com', true],
      ['invalid format', 'invalid-email', false],
      ['missing domain', 'user@', false],
      ['missing @', 'userexample.com', false],
    ])('should validate %s: %s', async (description, email, isValid) => {
      const userData = { email, name: 'Test User' };

      if (isValid) {
        await expect(userService.createUser(userData)).resolves.toBeDefined();
      } else {
        await expect(userService.createUser(userData)).rejects.toThrow();
      }
    });
  });
});

// 2. Green: 最小限の実装
class UserService {
  async createUser(userData: UserCreateData): Promise<User> {
    // 最小限の実装
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

#### 2.1 ディシジョンテーブル（条件・アクション表）による設計

**ディシジョンテーブル作成原則**:

- **条件部**: テスト対象の入力条件を全て列挙
- **アクション部**: 期待される結果・動作を明示
- **ルール部**: 各条件の組み合わせパターンを網羅
- **MECE原則**: 漏れなく重複なく全パターンを整理

**ユーザー登録ディシジョンテーブル**:

| 条件 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|------|----|----|----|----|----|----|----|----|
| Email形式正当 | ○ | ○ | ○ | ○ | × | × | × | × |
| Email未重複 | ○ | ○ | × | × | ○ | ○ | × | × |
| Password規則遵守 | ○ | × | ○ | × | ○ | × | ○ | × |
| Name入力あり | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **アクション** |||||||||
| ユーザー作成成功 | ✓ | - | - | - | - | - | - | - |
| パスワードエラー | - | ✓ | - | ✓ | - | ✓ | - | ✓ |
| 重複エラー | - | - | ✓ | ✓ | - | - | - | - |
| Email形式エラー | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| HTTPステータス | 201 | 400 | 409 | 400 | 400 | 400 | 400 | 400 |

**境界値ディシジョンテーブル**:

| 条件/値 | 最小値-1 | 最小値 | 通常値 | 最大値 | 最大値+1 |
|---------|----------|--------|--------|--------|----------|
| **ユーザー名長さ** |||||||
| 文字数 | 0 | 1 | 25 | 50 | 51 |
| 結果 | ❌NG | ✅OK | ✅OK | ✅OK | ❌NG |
| エラーコード | VAL_001 | - | - | - | VAL_001 |
| **パスワード長さ** ||||||
| 文字数 | 7 | 8 | 64 | 128 | 129 |
| 結果 | ❌NG | ✅OK | ✅OK | ✅OK | ❌NG |
| エラーコード | VAL_002 | - | - | - | VAL_002 |

**セキュリティディシジョンテーブル**:

| 攻撃パターン | 入力例 | 検出期待 | エラーレベル | 対応アクション |
|-------------|--------|----------|-------------|---------------|
| **SQL Injection** | `'; DROP TABLE users; --` | ✅検出 | CRITICAL | 入力サニタイズ |
| **XSS** | `<script>alert(1)</script>` | ✅検出 | HIGH | HTMLエスケープ |
| **Path Traversal** | `../../../etc/passwd` | ✅検出 | HIGH | パス正規化 |
| **Command Injection** | `; rm -rf /` | ✅検出 | CRITICAL | コマンド無害化 |
| **LDAP Injection** | `*)(uid=*))(|(uid=*` | ✅検出 | MEDIUM | LDAP文字エスケープ |

#### 2.2 APIコントローラー層テスト

```typescript
// userController.test.ts
import { describe, test, expect, beforeEach, vi } from 'vitest'
import type { Request, Response } from 'express'
import { UserController } from './userController'
import { UserService } from '../services/userService'

vi.mock('../services/userService')

describe('UserController', () => {
  let controller: UserController
  let mockUserService: jest.Mocked<UserService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  beforeEach(() => {
    mockUserService = {
      createUser: vi.fn(),
      findUser: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    } as jest.Mocked<UserService>
    controller = new UserController(mockUserService)

    mockRequest = {
      body: {},
      params: {},
      query: {}
    }

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis()
    }
  })

  describe('createUser', () => {
    test('should create user successfully', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' }
      const createdUser = { id: '1', ...userData, createdAt: new Date() }

      mockRequest.body = userData
      mockUserService.createUser.mockResolvedValue(createdUser)

      await controller.createUser(mockRequest as Request, mockResponse as Response)

      expect(mockUserService.createUser).toHaveBeenCalledWith(userData)
      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith({ data: createdUser })
    })

    // パラメータ化テスト：バリデーションエラーパターン
    test.each([
      ['invalid email format', { email: 'invalid-email', name: 'Test User' }, 'INVALID_EMAIL'],
      ['missing email', { name: 'Test User' }, 'MISSING_EMAIL'],
      ['empty name', { email: 'test@example.com', name: '' }, 'EMPTY_NAME'],
      ['missing name', { email: 'test@example.com' }, 'MISSING_NAME'],
      ['name too long', { email: 'test@example.com', name: 'a'.repeat(51) }, 'NAME_TOO_LONG'],
    ])('should handle validation error: %s', async (description, requestBody, expectedError) => {
      mockRequest.body = requestBody

      await controller.createUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          code: expectedError,
          message: expect.any(String)
        }
      })
    })

    // パラメータ化テスト：HTTPステータスコードパターン
    test.each([
      ['duplicate email', 'DUPLICATE_EMAIL', 409],
      ['server error', 'INTERNAL_ERROR', 500],
      ['database timeout', 'DATABASE_TIMEOUT', 503],
    ])('should handle %s with correct status code', async (description, errorCode, expectedStatus) => {
      mockRequest.body = { email: 'test@example.com', name: 'Test User' }
      mockUserService.createUser.mockRejectedValue(new Error(errorCode))

      await controller.createUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus)
    })
  })

  describe('findUser', () => {
    // 境界値テスト：パラメータ化
    test.each([
      ['valid UUID', '123e4567-e89b-12d3-a456-426614174000', true],
      ['invalid UUID format', 'invalid-id', false],
      ['empty ID', '', false],
      ['null ID', null, false],
    ])('should handle user ID: %s', async (description, userId, isValid) => {
      mockRequest.params = { id: userId }

      if (isValid) {
        const mockUser = { id: userId, email: 'test@example.com', name: 'Test User' }
        mockUserService.findUser.mockResolvedValue(mockUser)

        await controller.findUser(mockRequest as Request, mockResponse as Response)

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUser })
      } else {
        await controller.findUser(mockRequest as Request, mockResponse as Response)

        expect(mockResponse.status).toHaveBeenCalledWith(400)
      }
    })
  })
})
```

#### 2.3 ドメインサービス層テスト

```typescript
// UserDomainService.test.ts
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { UserDomainService } from './UserDomainService'
import type { IUserRepository } from '../repositories/IUserRepository'

describe('UserDomainService', () => {
  let service: UserDomainService
  let mockRepository: jest.Mocked<IUserRepository>

  beforeEach(() => {
    mockRepository = {
      findByEmail: vi.fn(),
      save: vi.fn(),
      findById: vi.fn(),
      delete: vi.fn()
    } as jest.Mocked<IUserRepository>
    service = new UserDomainService(mockRepository)
  })

  describe('createUser', () => {
    test('should validate unique email before creating user', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' }
      mockRepository.findByEmail.mockResolvedValue(null)
      mockRepository.save.mockResolvedValue({ id: '1', ...userData })

      const result = await service.createUser(userData)

      expect(mockRepository.findByEmail).toHaveBeenCalledWith(userData.email)
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining(userData))
      expect(result.email).toBe(userData.email)
    })

    test('should throw error for duplicate email', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' }
      const existingUser = { id: '1', email: userData.email, name: 'Existing User' }
      mockRepository.findByEmail.mockResolvedValue(existingUser)

      await expect(service.createUser(userData)).rejects.toThrow('Email already exists')
      expect(mockRepository.save).not.toHaveBeenCalled()
    })

    // パラメータ化テスト：ビジネスルール検証
    test.each([
      ['valid standard user', { email: 'user@example.com', name: 'John Doe', role: 'user' }, true],
      ['valid admin user', { email: 'admin@example.com', name: 'Admin User', role: 'admin' }, true],
      ['blocked domain', { email: 'test@blocked.com', name: 'Test User', role: 'user' }, false],
      ['reserved username', { email: 'test@example.com', name: 'admin', role: 'user' }, false],
      ['system email', { email: 'system@example.com', name: 'System', role: 'user' }, false],
    ])('should handle business rule validation: %s', async (description, userData, shouldSucceed) => {
      mockRepository.findByEmail.mockResolvedValue(null)

      if (shouldSucceed) {
        mockRepository.save.mockResolvedValue({ id: '1', ...userData })
        await expect(service.createUser(userData)).resolves.toBeDefined()
      } else {
        await expect(service.createUser(userData)).rejects.toThrow()
      }
    })
  })

  describe('updateUserProfile', () => {
    // パラメータ化テスト：更新権限パターン
    test.each([
      ['user updates own profile', 'user-1', 'user-1', 'user', true],
      ['admin updates any profile', 'admin-1', 'user-1', 'admin', true],
      ['user tries to update others profile', 'user-1', 'user-2', 'user', false],
      ['guest tries to update profile', null, 'user-1', 'guest', false],
    ])('should handle update permission: %s', async (description, currentUserId, targetUserId, userRole, shouldSucceed) => {
      const updateData = { name: 'Updated Name' }

      if (shouldSucceed) {
        mockRepository.findById.mockResolvedValue({ id: targetUserId, name: 'Original Name' })
        mockRepository.save.mockResolvedValue({ id: targetUserId, ...updateData })

        await expect(service.updateUserProfile(currentUserId, targetUserId, updateData, userRole))
          .resolves.toBeDefined()
      } else {
        await expect(service.updateUserProfile(currentUserId, targetUserId, updateData, userRole))
          .rejects.toThrow()
      }
    })
  })
})
```

#### 2.4 リポジトリ実装テスト

```typescript
// UserRepository.test.ts
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { UserRepository } from './UserRepository'
import type { Database } from '../database/connection'

describe('UserRepository', () => {
  let repository: UserRepository
  let mockDatabase: jest.Mocked<Database>

  beforeEach(() => {
    mockDatabase = {
      query: vi.fn(),
      transaction: vi.fn(),
      close: vi.fn()
    } as jest.Mocked<Database>
    repository = new UserRepository(mockDatabase)
  })

  describe('save', () => {
    test('should save user to database', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' }
      const expectedUser = { id: '1', ...userData, createdAt: new Date() }

      mockDatabase.query.mockResolvedValue({ rows: [expectedUser] })

      const result = await repository.save(userData)

      expect(mockDatabase.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO users'),
        expect.arrayContaining([userData.email, userData.name])
      )
      expect(result).toEqual(expectedUser)
    })

    // パラメータ化テスト：データベースエラーパターン
    test.each([
      ['connection timeout', 'DATABASE_TIMEOUT', /timeout/i],
      ['constraint violation', 'UNIQUE_VIOLATION', /already exists/i],
      ['disk full', 'DISK_FULL', /storage/i],
      ['connection lost', 'CONNECTION_LOST', /connection/i],
    ])('should handle database error: %s', async (description, errorCode, expectedMessagePattern) => {
      const userData = { email: 'test@example.com', name: 'Test User' }
      mockDatabase.query.mockRejectedValue(new Error(errorCode))

      await expect(repository.save(userData)).rejects.toThrow(expectedMessagePattern)
    })
  })

  describe('findByEmail', () => {
    // パラメータ化テスト：検索パターン
    test.each([
      ['existing user', 'existing@example.com', { id: '1', email: 'existing@example.com' }],
      ['non-existing user', 'notfound@example.com', null],
      ['case insensitive match', 'TEST@EXAMPLE.COM', { id: '1', email: 'test@example.com' }],
    ])('should handle email search: %s', async (description, email, expectedResult) => {
      mockDatabase.query.mockResolvedValue({
        rows: expectedResult ? [expectedResult] : []
      })

      const result = await repository.findByEmail(email)

      expect(result).toEqual(expectedResult)
      expect(mockDatabase.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        expect.arrayContaining([email.toLowerCase()])
      )
    })
  })
})
```

### 3. Mock・Stub戦略

#### 3.1 外部依存関係のMock

```typescript
// external-api.mock.ts
import { vi } from 'vitest'

export const mockEmailService = {
  sendWelcomeEmail: vi.fn().mockResolvedValue({ success: true }),
  sendPasswordResetEmail: vi.fn().mockResolvedValue({ success: true })
}

// database.mock.ts
export const mockDatabase = {
  query: vi.fn(),
  transaction: vi.fn(),
  close: vi.fn()
}
```

#### 3.2 テストダブルの使い分け

- **Mock (vi.fn())**: 呼び出し検証が必要な場合
- **Stub (vi.fn().mockReturnValue())**: 特定の戻り値が必要な場合
- **Spy (vi.spyOn())**: 既存実装の呼び出し監視が必要な場合

#### 3.3 パラメータ化Mock設定

```typescript
describe('EmailService Integration', () => {
  // パラメータ化テスト：外部サービスレスポンスパターン
  test.each([
    ['success response', { success: true, messageId: '12345' }, 200],
    ['rate limit error', { error: 'Rate limit exceeded' }, 429],
    ['service unavailable', { error: 'Service unavailable' }, 503],
    ['authentication error', { error: 'Invalid API key' }, 401],
  ])('should handle %s', async (description, mockResponse, expectedStatus) => {
    mockEmailService.sendWelcomeEmail.mockResolvedValue(mockResponse)

    const result = await emailService.sendWelcomeEmail('test@example.com')

    expect(result.status).toBe(expectedStatus)
  })
})
```

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
import type { User } from '../../src/domain/entities/User'
import userData from '../fixtures/users.json'

export class TestDataBuilder {
  static createValidUser(overrides: Partial<User> = {}): User {
    return {
      id: 'test-id',
      email: userData.validUser.email,
      name: userData.validUser.name,
      createdAt: new Date(),
      ...overrides
    }
  }

  static createUserArray(count: number): User[] {
    return Array.from({ length: count }, (_, index) =>
      this.createValidUser({
        id: `test-id-${index}`,
        email: `user${index}@example.com`
      })
    )
  }

  // パラメータ化テスト用データジェネレーター
  static generateBoundaryTestCases() {
    return [
      // 境界値テストケース
      { name: 'a', valid: true },           // 最小値
      { name: '', valid: false },           // 最小値-1
      { name: 'a'.repeat(50), valid: true }, // 最大値
      { name: 'a'.repeat(51), valid: false }, // 最大値+1
      // 特殊文字テストケース
      { name: 'test-user', valid: true },
      { name: 'test_user', valid: true },
      { name: 'test user', valid: true },
      { name: 'test@user', valid: false },
    ]
  }
}
```

### 5. エラーハンドリングテスト

#### 5.1 バリデーションエラーテスト（パラメータ化）

```typescript
import { describe, test, expect } from 'vitest'

describe('User Validation', () => {
  // パラメータ化テスト：バリデーションパターン
  test.each([
    ['valid email', 'user@example.com', true, null],
    ['invalid format', 'invalid-email', false, 'Invalid email format'],
    ['missing domain', 'user@', false, 'Invalid email format'],
    ['missing @', 'userexample.com', false, 'Invalid email format'],
    ['empty email', '', false, 'Email is required'],
    ['null email', null, false, 'Email is required'],
  ])('should validate email: %s', (description, email, isValid, expectedError) => {
    const userData = { email, name: 'Test User' }

    if (isValid) {
      expect(() => User.create(userData)).not.toThrow()
    } else {
      expect(() => User.create(userData)).toThrow(expectedError)
    }
  })

  // パラメータ化テスト：ユーザー名バリデーション
  test.each(TestDataBuilder.generateBoundaryTestCases())(
    'should validate name length: $name (valid: $valid)',
    ({ name, valid }) => {
      const userData = { email: 'test@example.com', name }

      if (valid) {
        expect(() => User.create(userData)).not.toThrow()
      } else {
        expect(() => User.create(userData)).toThrow()
      }
    }
  )
})
```

#### 5.2 例外処理テスト（パラメータ化）

```typescript
describe('Error Handling', () => {
  // パラメータ化テスト：ネットワークエラーパターン
  test.each([
    ['timeout error', 'TIMEOUT', /timeout/i],
    ['connection refused', 'ECONNREFUSED', /connection/i],
    ['network unreachable', 'ENETUNREACH', /network/i],
    ['dns lookup failed', 'ENOTFOUND', /not found/i],
  ])('should handle network error: %s', async (description, errorCode, expectedPattern) => {
    mockExternalService.call.mockRejectedValue(new Error(errorCode))

    await expect(service.callExternalAPI()).rejects.toThrow(expectedPattern)
  })

  // パラメータ化テスト：データベース制約エラー
  test.each([
    ['unique violation', 'UNIQUE_VIOLATION', 'Email already exists'],
    ['foreign key violation', 'FK_VIOLATION', 'Referenced record not found'],
    ['check constraint', 'CHECK_VIOLATION', 'Invalid data format'],
    ['not null violation', 'NOT_NULL_VIOLATION', 'Required field missing'],
  ])('should handle database constraint: %s', async (description, errorCode, expectedMessage) => {
    mockRepository.save.mockRejectedValue(new Error(errorCode))

    await expect(service.createUser(userData)).rejects.toThrow(expectedMessage)
  })
})
```

### 6. パフォーマンステスト

#### 6.1 レスポンス時間テスト（パラメータ化）

```typescript
describe('Performance Tests', () => {
  // パラメータ化テスト：データサイズとパフォーマンス
  test.each([
    ['small dataset', 100, 1000],    // 100件、1秒以内
    ['medium dataset', 1000, 3000],  // 1000件、3秒以内
    ['large dataset', 5000, 10000],  // 5000件、10秒以内
  ])('should process %s within time limit', async (description, dataSize, timeLimit) => {
    const testData = TestDataBuilder.createUserArray(dataSize)
    const startTime = Date.now()

    await service.processLargeDataset(testData)

    const duration = Date.now() - startTime
    expect(duration).toBeLessThan(timeLimit)
  })
})
```

### 7. UIコンポーネントテスト（TSX）

#### 7.1 UIコンポーネントテスト戦略

**UIコンポーネントテストの原則**:

- **data-testid属性**: 要素取得にdata-testidを必ず使用する
- **ユーザー操作シミュレーション**: 実際のユーザー操作パターンをテストする
- **アクセシビリティ考慮**: スクリーンリーダー対応も含めてテストする
- **パラメータ化テスト**: プロパティパターンや状態変化を効率的にテストする
- **Mock Props**: 依存するコンポーネントやAPIは適切にMockする

#### 7.2 テスト環境設定

**Vitest設定については公式ドキュメントを参照**:

- **React Testing Library設定**: <https://vitest.dev/guide/environment.html>
- **JSX設定**: <https://vitest.dev/config/#jsx>
- **テスト環境設定**: <https://vitest.dev/config/#environment>

#### 7.3 基本的なUIコンポーネントテスト

```typescript
// UserForm.test.tsx
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserForm } from './UserForm'
import type { User } from '../types/User'

describe('UserForm', () => {
  const mockOnSubmit = vi.fn()
  const defaultProps = {
    onSubmit: mockOnSubmit,
    isLoading: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Form Rendering', () => {
    test('should render form with required fields', () => {
      render(<UserForm {...defaultProps} />)

      expect(screen.getByTestId('user-form')).toBeInTheDocument()
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('name-input')).toBeInTheDocument()
      expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    })

    // パラメータ化テスト：初期値設定パターン
    test.each([
      ['empty form', undefined, '', ''],
      ['with initial user', { email: 'test@example.com', name: 'Test User' }, 'test@example.com', 'Test User'],
      ['partial data', { email: 'test@example.com' }, 'test@example.com', ''],
    ])('should render %s correctly', (description, initialUser, expectedEmail, expectedName) => {
      render(<UserForm {...defaultProps} initialUser={initialUser} />)

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement

      expect(emailInput.value).toBe(expectedEmail)
      expect(nameInput.value).toBe(expectedName)
    })
  })

  describe('User Interactions', () => {
    test('should handle form submission with valid data', async () => {
      const user = userEvent.setup()
      render(<UserForm {...defaultProps} />)

      const emailInput = screen.getByTestId('email-input')
      const nameInput = screen.getByTestId('name-input')
      const submitButton = screen.getByTestId('submit-button')

      await user.type(emailInput, 'test@example.com')
      await user.type(nameInput, 'Test User')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          name: 'Test User'
        })
      })
    })

    // パラメータ化テスト：バリデーションエラーパターン
    test.each([
      ['invalid email', 'invalid-email', 'Test User', 'email-error'],
      ['empty email', '', 'Test User', 'email-error'],
      ['empty name', 'test@example.com', '', 'name-error'],
      ['both empty', '', '', 'email-error'],
    ])('should show validation error: %s', async (description, email, name, expectedErrorTestId) => {
      const user = userEvent.setup()
      render(<UserForm {...defaultProps} />)

      const emailInput = screen.getByTestId('email-input')
      const nameInput = screen.getByTestId('name-input')
      const submitButton = screen.getByTestId('submit-button')

      if (email) await user.type(emailInput, email)
      if (name) await user.type(nameInput, name)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByTestId(expectedErrorTestId)).toBeInTheDocument()
      })
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Loading States', () => {
    // パラメータ化テスト：ローディング状態パターン
    test.each([
      ['loading state', true, true, 'Submit...'],
      ['normal state', false, false, 'Submit'],
    ])('should handle %s correctly', (description, isLoading, expectedDisabled, expectedText) => {
      render(<UserForm {...defaultProps} isLoading={isLoading} />)

      const submitButton = screen.getByTestId('submit-button') as HTMLButtonElement

      expect(submitButton.disabled).toBe(expectedDisabled)
      expect(submitButton).toHaveTextContent(expectedText)

      if (isLoading) {
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
      } else {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
      }
    })
  })
})
```

#### 7.4 リストコンポーネントのテスト

```typescript
// UserList.test.tsx
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserList } from './UserList'
import type { User } from '../types/User'

describe('UserList', () => {
  const mockUsers: User[] = [
    { id: '1', email: 'user1@example.com', name: 'User 1' },
    { id: '2', email: 'user2@example.com', name: 'User 2' },
    { id: '3', email: 'user3@example.com', name: 'User 3' }
  ]

  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('List Rendering', () => {
    // パラメータ化テスト：データ状態パターン
    test.each([
      ['with users', mockUsers, 3, false],
      ['empty list', [], 0, true],
      ['single user', [mockUsers[0]], 1, false],
    ])('should render %s correctly', (description, users, expectedCount, showsEmptyMessage) => {
      render(<UserList users={users} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

      const userItems = screen.queryAllByTestId(/^user-item-/)
      expect(userItems).toHaveLength(expectedCount)

      if (showsEmptyMessage) {
        expect(screen.getByTestId('empty-message')).toBeInTheDocument()
      } else {
        expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument()
      }
    })

    test('should render user data correctly', () => {
      render(<UserList users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

      mockUsers.forEach(user => {
        expect(screen.getByTestId(`user-email-${user.id}`)).toHaveTextContent(user.email)
        expect(screen.getByTestId(`user-name-${user.id}`)).toHaveTextContent(user.name)
        expect(screen.getByTestId(`edit-button-${user.id}`)).toBeInTheDocument()
        expect(screen.getByTestId(`delete-button-${user.id}`)).toBeInTheDocument()
      })
    })
  })

  describe('User Actions', () => {
    test('should handle edit action', async () => {
      const user = userEvent.setup()
      render(<UserList users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

      const editButton = screen.getByTestId('edit-button-1')
      await user.click(editButton)

      expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0])
    })

    test('should handle delete action', async () => {
      const user = userEvent.setup()
      render(<UserList users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

      const deleteButton = screen.getByTestId('delete-button-1')
      await user.click(deleteButton)

      expect(mockOnDelete).toHaveBeenCalledWith(mockUsers[0])
    })
  })
})
```

#### 7.5 モーダルコンポーネントのテスト

```typescript
// ConfirmModal.test.tsx
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfirmModal } from './ConfirmModal'

describe('ConfirmModal', () => {
  const mockOnConfirm = vi.fn()
  const mockOnCancel = vi.fn()

  const defaultProps = {
    isOpen: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // パラメータ化テスト：表示状態パターン
  test.each([
    ['open modal', true, true],
    ['closed modal', false, false],
  ])('should handle %s correctly', (description, isOpen, shouldBeVisible) => {
    render(<ConfirmModal {...defaultProps} isOpen={isOpen} />)

    const modal = screen.queryByTestId('confirm-modal')

    if (shouldBeVisible) {
      expect(modal).toBeInTheDocument()
      expect(screen.getByTestId('modal-title')).toHaveTextContent(defaultProps.title)
      expect(screen.getByTestId('modal-message')).toHaveTextContent(defaultProps.message)
    } else {
      expect(modal).not.toBeInTheDocument()
    }
  })

  test('should handle confirm action', async () => {
    const user = userEvent.setup()
    render(<ConfirmModal {...defaultProps} />)

    const confirmButton = screen.getByTestId('confirm-button')
    await user.click(confirmButton)

    expect(mockOnConfirm).toHaveBeenCalled()
  })

  test('should handle cancel action', async () => {
    const user = userEvent.setup()
    render(<ConfirmModal {...defaultProps} />)

    const cancelButton = screen.getByTestId('cancel-button')
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })
})
```

#### 7.6 アクセシビリティテスト

```typescript
// accessibility.test.tsx
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { UserForm } from './UserForm'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<UserForm onSubmit={vi.fn()} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  // パラメータ化テスト：キーボードナビゲーション
  test.each([
    ['Tab', 'Tab', 'email-input'],
    ['Tab twice', 'Tab', 'name-input'],
    ['Enter on button', 'Enter', 'submit-button'],
  ])('should support keyboard navigation: %s', async (description, key, expectedFocusTestId) => {
    const user = userEvent.setup()
    render(<UserForm onSubmit={vi.fn()} />)

    if (key === 'Tab' && description.includes('twice')) {
      await user.tab()
      await user.tab()
    } else {
      await user.keyboard(`{${key}}`)
    }

    const focusedElement = screen.getByTestId(expectedFocusTestId)
    expect(focusedElement).toHaveFocus()
  })
})
```

### 8. BDDテストとの連携

#### 7.1 役割分担の明確化

- **BDDテスト**: APIエンドポイントの振る舞い検証、ビジネスルール検証
- **単体テスト**: 個別コンポーネントの詳細検証、エラーハンドリング、境界値テスト

#### 7.2 相互補完関係

```typescript
// BDDテストでカバーされるもの
// - ユーザー登録のエンドツーエンドフロー
// - API仕様に基づくリクエスト/レスポンス検証

// 単体テストでカバーするもの
describe('UserService', () => {
  describe('Edge Cases', () => {
    test('should handle concurrent user creation', async () => {
      // BDDでは検証困難な同時実行テスト
    })

    // パラメータ化テスト：パスワード複雑性
    test.each([
      ['weak password', 'password', false],
      ['no uppercase', 'password123!', false],
      ['no numbers', 'Password!', false],
      ['no special chars', 'Password123', false],
      ['strong password', 'Password123!', true],
    ])('should validate password complexity: %s', (description, password, isValid) => {
      const result = service.validatePasswordComplexity(password)
      expect(result.isValid).toBe(isValid)
    })
  })
})
```

### 8. CI/CD統合

#### 8.1 Vitest設定

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        global: {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95
        }
      },
      exclude: [
        'src/**/*.d.ts',
        'src/index.ts',
        'tests/**/*'
      ]
    },
    setupFiles: ['./tests/setup/testSetup.ts'],
    globalSetup: ['./tests/setup/globalSetup.ts'],
    globalTeardown: ['./tests/setup/globalTeardown.ts']
  }
})
```

#### 8.2 テスト実行スクリプト

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ci": "vitest run --coverage --reporter=verbose"
  }
}
```

## 完了判定基準

### 必須要件

- **パラメータ化テストの活用**: test.each()を使用し、同一ロジックの異なるデータパターンを効率的にテスト
- **describe階層構造**: 機能・メソッド・条件の3階層でテストを体系化
- **data-testid必須使用**: UIコンポーネントテストではdata-testid属性による要素取得を必須とする
- **全テストがGreen**: 全ての単体テストがGreenで通過している
- **カバレッジ95%以上**: テストカバレッジが95%以上達成されている
- **Mock/Stub適切使用**: テスト対象の責務が明確に分離されている
- **TDDサイクル遵守**: Red-Green-Refactorサイクルに従って実装されている
- **エラーハンドリング**: エッジケースと異常系が適切にテストされている
- **CI/CD統合**: テストが自動実行される環境が構築されている

### 品質要件

- **BDD連携**: BDDテストとの役割分担が明確になっている
- **UIコンポーネント品質**: ユーザー操作パターン、アクセシビリティ、ローディング状態が適切にテストされている
- **保守性**: テストコードが保守しやすく、理解しやすい構造になっている
- **パフォーマンス**: パフォーマンステストが実装されている
- **データ管理**: テストデータとFixtureが適切に管理されている

## 完了後の必須アクション

1. **直ちに**ユーザーに「単体テストスイート」のレビューを依頼する
2. **ADR作成判断**: テストフレームワーク選定、テスト戦略について、ADRでの記録をユーザーに提案する
3. **次工程の判断**をユーザーに委ねる：
   - 通常フロー：「本実装」に進む
   - 戻りフロー：テスト設計による仕様見直しで前工程に戻る
4. ユーザーの明示的な承認を得てから指定された工程に進む
