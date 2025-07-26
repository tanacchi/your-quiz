# TypeScript開発指示

## 目的

- 厳密な型安全性を確保し、実行時エラーを最小限に抑えるため、型推論を最大限活用し、any型・型アサーションを禁止し、ユーティリティ型による型の再利用を徹底したTypeScriptコードを作成する

## 遵守事項

- any型・as型アサーション・Non-null assertion(!.)の使用を絶対禁止する
- string型は可能な限りUnion型でパターン化する
- ユーティリティ型を最大限駆使して型の再利用を図る
- 型推論を活用し、冗長な型注釈を避ける
- **型エラー解決時**: 5回の解決試行後、解決できない場合はユーザーに状況報告する

## 厳密な型定義

### 1. 絶対禁止事項

#### 1.1 any型の禁止

```typescript
// ❌ 絶対禁止
function processData(data: any): any {
  return data.someProperty;
}

// ✅ 正しい方法
function processData<T>(data: T): T {
  return data;
}

// ✅ unknown型を使用した安全な処理
function processUnknownData(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  throw new Error('Invalid data type');
}
```

#### 1.2 型アサーション(as)の禁止

```typescript
// ❌ 絶対禁止
const userData = response.data as User;
const element = document.getElementById('myId') as HTMLElement;

// ✅ 正しい方法：型ガード使用
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    typeof (obj as Record<string, unknown>).id === 'string' &&
    typeof (obj as Record<string, unknown>).name === 'string'
  );
}

const userData = response.data;
if (isUser(userData)) {
  // この中では userData は User型として扱える
  console.log(userData.name);
}

// ✅ DOM要素の安全な取得
const element = document.getElementById('myId');
if (element instanceof HTMLElement) {
  element.style.display = 'none';
}
```

#### 1.3 Non-null assertion(!.)の禁止

```typescript
// ❌ 絶対禁止
const user = getUser()!;
const name = user.name!;

// ✅ 正しい方法：null/undefinedチェック
const user = getUser();
if (user) {
  const name = user.name;
  if (name) {
    console.log(name.toUpperCase());
  }
}

// ✅ Optional chainingの活用
const name = getUser()?.name?.toUpperCase();
```

### 2. Union型によるstring制限

#### 2.1 リテラル型の活用

```typescript
// ❌ 汎用的すぎる型
interface User {
  status: string;
  role: string;
  theme: string;
}

// ✅ Union型による制限
type UserStatus = 'active' | 'inactive' | 'suspended';
type UserRole = 'admin' | 'editor' | 'viewer';
type Theme = 'light' | 'dark' | 'auto';

interface User {
  status: UserStatus;
  role: UserRole;
  theme: Theme;
}
```

#### 2.2 const assertionの活用

```typescript
// ✅ const assertionによる型の厳密化
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const;
type HttpMethod = typeof HTTP_METHODS[number]; // 'GET' | 'POST' | 'PUT' | 'DELETE'

const API_ENDPOINTS = {
  users: '/api/users',
  posts: '/api/posts',
  comments: '/api/comments'
} as const;
type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
```

#### 2.3 テンプレートリテラル型の活用

```typescript
// ✅ テンプレートリテラル型による動的Union型
type EventType = 'click' | 'scroll' | 'resize';
type EventHandler = `on${Capitalize<EventType>}`; // 'onClick' | 'onScroll' | 'onResize'

type HttpStatusCode = `${1 | 2 | 3 | 4 | 5}${string}`;
type ApiRoute = `/api/${string}`;
```

## ユーティリティ型の活用

### 3. 型の再利用戦略

#### 3.1 基本ユーティリティ型

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Partialを使った更新用型
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;

// ✅ Omitを使った公開用型
type PublicUser = Omit<User, 'password'>;

// ✅ Pickを使った作成用型
type UserCreate = Pick<User, 'name' | 'email' | 'password'>;

// ✅ Requiredを使った必須化
type RequiredUser = Required<Partial<User>>;
```

#### 3.2 高度なユーティリティ型の組み合わせ

```typescript
// ✅ 複数ユーティリティ型の組み合わせ
type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UserUpdateInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

// ✅ 条件付き型による高度な制御
type NonNullable<T> = T extends null | undefined ? never : T;
type ApiResponse<T> = {
  data: NonNullable<T>;
  status: 'success' | 'error';
  message?: string;
};
```

#### 3.3 カスタムユーティリティ型

```typescript
// ✅ 再利用可能なカスタムユーティリティ型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// 使用例
type User = {
  id: string;
  name: string;
  age: number;
  isActive: boolean;
};

type StringKeys = KeysOfType<User, string>; // 'id' | 'name'
type NumberKeys = KeysOfType<User, number>; // 'age'
```

## TypeScript設定

### 4. tsconfig.json設定

#### 4.1 厳密設定

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitGeneric": true
  }
}
```

#### 4.2 推奨設定

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  }
}
```

### 5. ESLint設定

#### 5.1 TypeScript ESLint Rules

```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error"
  }
}
```

## 型安全なパターン

### 6. エラーハンドリング

#### 6.1 Result型パターン

```typescript
// ✅ Result型による型安全なエラーハンドリング
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return { success: false, error: new Error('User not found') };
    }
    const user = await response.json();
    if (isUser(user)) {
      return { success: true, data: user };
    }
    return { success: false, error: new Error('Invalid user data') };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

// 使用例
const result = await fetchUser('123');
if (result.success) {
  console.log(result.data.name); // 型安全
} else {
  console.error(result.error.message); // エラーハンドリング
}
```

#### 6.2 Either型パターン

```typescript
// ✅ Either型による関数型アプローチ
type Either<L, R> = Left<L> | Right<R>;
type Left<L> = { _tag: 'Left'; left: L };
type Right<R> = { _tag: 'Right'; right: R };

const left = <L>(value: L): Left<L> => ({ _tag: 'Left', left: value });
const right = <R>(value: R): Right<R> => ({ _tag: 'Right', right: value });

function parseJSON<T>(str: string): Either<Error, T> {
  try {
    return right(JSON.parse(str) as T);
  } catch (error) {
    return left(error instanceof Error ? error : new Error('Parse error'));
  }
}
```

### 7. 状態管理の型安全性

#### 7.1 Discriminated Union

```typescript
// ✅ 判別可能なUnion型による状態管理
type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: User[] };
type ErrorState = { status: 'error'; error: string };

type DataState = LoadingState | SuccessState | ErrorState;

function handleState(state: DataState) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>{state.data.length} users loaded</div>; // data は型安全
    case 'error':
      return <div>Error: {state.error}</div>; // error は型安全
    default:
      // TypeScriptが全てのケースを網羅していることを保証
      const _exhaustive: never = state;
      return _exhaustive;
  }
}
```

### 8. 関数の型安全性

#### 8.1 関数オーバーロード

```typescript
// ✅ 関数オーバーロードによる型安全性
function createElement(tag: 'div'): HTMLDivElement;
function createElement(tag: 'span'): HTMLSpanElement;
function createElement(tag: 'input'): HTMLInputElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

// 使用時は戻り値の型が自動推論される
const div = createElement('div'); // HTMLDivElement
const span = createElement('span'); // HTMLSpanElement
```

#### 8.2 高階関数の型安全性

```typescript
// ✅ 高階関数の適切な型定義
function createValidator<T>(
  schema: Record<keyof T, (value: unknown) => boolean>
): (obj: unknown) => obj is T {
  return (obj): obj is T => {
    if (typeof obj !== 'object' || obj === null) return false;

    return Object.entries(schema).every(([key, validator]) => {
      const value = (obj as Record<string, unknown>)[key];
      return validator(value);
    });
  };
}

// 使用例
const isUser = createValidator<User>({
  id: (v): v is string => typeof v === 'string',
  name: (v): v is string => typeof v === 'string',
  email: (v): v is string => typeof v === 'string' && v.includes('@')
});
```

## パフォーマンス最適化

### 9. 型レベルでの最適化

#### 9.1 mapped typesの効率的使用

```typescript
// ✅ 効率的なmapped types
type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// 使用例：id は必須、他はオプショナル
type UserUpdate = OptionalExcept<User, 'id'>;
```

#### 9.2 conditional typesによる最適化

```typescript
// ✅ 条件付き型による最適化
type ApiMethod<T extends string> = T extends `get${string}`
  ? 'GET'
  : T extends `post${string}`
  ? 'POST'
  : T extends `put${string}`
  ? 'PUT'
  : T extends `delete${string}`
  ? 'DELETE'
  : never;

type GetUserMethod = ApiMethod<'getUser'>; // 'GET'
type CreateUserMethod = ApiMethod<'postUser'>; // 'POST'
```

## プロジェクト構成

### 10. ファイル構成

#### 10.1 型定義ファイルの配置

```
src/
├── types/
│   ├── index.ts          # 共通型のエクスポート
│   ├── api.ts           # API関連の型
│   ├── domain/          # ドメイン固有の型
│   │   ├── user.ts
│   │   ├── post.ts
│   │   └── comment.ts
│   └── utils.ts         # ユーティリティ型
├── utils/
│   ├── type-guards.ts   # 型ガード関数
│   └── validators.ts    # バリデーター関数
```

#### 10.2 index.tsでの型エクスポート

```typescript
// types/index.ts
export type { User, UserCreate, UserUpdate } from './domain/user';
export type { ApiResponse, ApiError } from './api';
export type { Result, Either } from './utils';

// 型ガードもエクスポート
export { isUser, isApiResponse } from '../utils/type-guards';
```

## テスト戦略

### 11. 型安全なテスト

#### 11.1 型レベルテスト

```typescript
// ✅ 型レベルでのテスト
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

// 型テストの例
type Test = [
  Expect<Equal<UserCreate, Pick<User, 'name' | 'email' | 'password'>>>,
  Expect<Equal<PublicUser, Omit<User, 'password'>>>,
];
```

#### 11.2 ランタイムテスト

```typescript
// ✅ 型ガードのテスト
describe('Type Guards', () => {
  test('isUser should validate user object', () => {
    const validUser = { id: '1', name: 'John', email: 'john@example.com' };
    const invalidUser = { id: '1', name: 'John' }; // email missing

    expect(isUser(validUser)).toBe(true);
    expect(isUser(invalidUser)).toBe(false);

    if (isUser(validUser)) {
      // この中では validUser は User 型として扱える
      expect(validUser.email).toBeDefined();
    }
  });
});
```

## 完了判定基準

- any型・as型アサーション・Non-null assertionが一切使用されていないこと
- string型が可能な限りUnion型で制限されていること
- ユーティリティ型が適切に活用されて型の再利用が図られていること
- tsconfig.jsonで厳密な型チェックが有効化されていること
- ESLintで型安全性を強制するルールが設定されていること
- 型ガード関数が適切に実装されていること
- エラーハンドリングが型安全に実装されていること
- 型定義ファイルが適切に構成・配置されていること
- 型レベルテストとランタイムテストが実装されていること
- コードレビューで型安全性が確認されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける
