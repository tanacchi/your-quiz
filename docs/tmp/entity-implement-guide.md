# TypeScript × Zod × Entity/Draft コーディングガイドライン

> 目的：境界での厳格なバリデーションと、アプリ内部の多態的・保守容易なドメイン実装を両立する。JSON/I-O、UI（Jotai）、テスト観点での実務最適化を含む。

---

## 0. 適用範囲

- 言語・環境: TypeScript 最新版
- バリデーション: Zod
- 状態管理（任意）: Jotai（他のライブラリでも方針は同様）
- ドメイン層: Entity（常に妥当） / Draft（編集中・不完全を許容）

---

## 1. 設計原則（要点）

1. **単一オブジェクトに集約**して状態を保持（Entity/Draft ともに）。
2. \*\*浅いネスト（2 階層目安）\*\*で意味的まとまりを表現（例: `profile`, `contact`, `preferences`）。
3. 更新は **パッチ API** に集約：`with(patch)`, `withSection(key, patch)`, 必要に応じて `withImmer(mutator)`。
4. **境界で厳格**、内部は **多態的・不変**：Entity は不変、Draft で中間状態と部分検証。
5. Zod の **brand** と ``** / **`` を使い分け、**名目型**と**生入力**を明確化。
6. クロスフィールド制約は **schema 側（**``**）** に寄せる。業務ルールをコードの散逸から守る。
7. JSON 往復で brand は落ちるため、**必ず parse を通して回復**する（I/O 境界で再検証）。

---

## 2. スキーマ設計

- **小さなスキーマを合成**してトップレベルを構成：`ProfileSchema`, `ContactSchema` → `UserSchema`。
- **brand による名目型化**：ID、Email、金額、日付など。
- ``** と **``：
  - `z.input<typeof Schema>` = 生入力（Draft 側）
  - `z.output<typeof Schema>` = 変換/ブランド付与後（Entity 内部）
- **クロスフィールド**：`.superRefine()` を最優先。局所バリデーションは `.shape[key]` を参照。

### スニペット

```ts
import { z } from 'zod';

export const UserId = z.string().uuid().brand<'UserId'>();
export type UserId = z.infer<typeof UserId>;

export const Email = z.string().email().brand<'Email'>();
export type Email = z.infer<typeof Email>;

const ProfileSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(0),
});

const ContactSchema = z.object({
  email: Email,
  phone: z.string().optional(),
});

export const UserSchema = z.object({
  id: UserId,
  profile: ProfileSchema,
  contact: ContactSchema,
}).strict().superRefine((u, ctx) => {
  // 例: 年齢と電話の相関などをチェック
});

export type UserDTO   = z.output<typeof UserSchema>; // Entity 内部
export type UserInput = z.input<typeof UserSchema>;  // Draft 生入力
```

---

## 3. Entity（常に妥当・不変）

- 内部は ``。
- 生成・更新は **必ず **``** 経由**。
- API：`from(input)`, `fromDraft(draft)`, `toDTO()`, `with(patch)`, `withSection(key, patch)`, 任意で `withImmer`。

### スニペット

```ts
import { produce, Draft } from 'immer';

export class User {
  private constructor(private readonly data: Readonly<UserDTO>) {}

  static from(input: unknown): User {
    return new User(UserSchema.parse(input));
  }

  static fromDraft(d: User.Draft): User {
    return User.from(d.state);
  }

  toDTO(): UserDTO { return { ...this.data }; }

  with(patch: DeepPartial<UserInput>): User {
    return User.from({ ...this.data, ...patch });
  }

  withSection<K extends 'profile' | 'contact'>(k: K, patch: DeepPartial<UserInput[K]>): User {
    return User.from({ ...this.data, [k]: { ...this.data[k], ...patch } });
  }

  withImmer(mutator: (d: Draft<UserInput>) => void): User {
    const next = produce(this.data, mutator);
    return User.from(next);
  }

  // 読み取り
  get id() { return this.data.id; }
  get profile() { return this.data.profile; }
  get contact() { return this.data.contact; }

  // インナークラス: Draft
  static Draft = class DraftImpl {
    state: Partial<UserInput> = {};
    errors: Record<string, string[]> = {};

    /** セクション単位の部分更新 + 部分検証 */
    setSection<K extends 'profile' | 'contact'>(k: K, patch: DeepPartial<UserInput[K]>): void {
      this.state[k] = { ...(this.state[k] as any), ...patch };
      const sectionSchema = (UserSchema.shape as any)[k];
      const r = sectionSchema.safeParse(this.state[k]);
      this.errors[k] = r.success ? [] : r.error.issues.map(i => i.message);
    }

    /** 保存: 全体検証して Entity に昇格 */
    commit(): User {
      const r = UserSchema.safeParse(this.state);
      if (!r.success) {
        this.errors = {};
        for (const issue of r.error.issues) {
          const path = issue.path.join('.');
          (this.errors[path] ??= []).push(issue.message);
        }
        throw r.error;
      }
      return User.from(r.data);
    }
  }
}

// ユーティリティ
export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
```

---

## 4. Draft（編集中・不完全を許容）

- `state: Partial<UserInput>` と `errors: Record<string, string[]>`。
- 項目/セクションごとの **局所 **``、保存時に **全体 **``。
- エラーパスは `a.b.c` 形式（UI でのマッピング容易化）。

### 運用規約

- Draft は **UI/フォーム専用**。**ビジネスロジックに渡さない**。
- Entity への昇格は **I/O 境界・保存直前**で行い、**失敗時は Draft にエラー反映**。

---

## 5. Jotai 連携（例）

- **1 つの atom**に Draft を載せ、`focusAtom`/`selectAtom`/`splitAtom` で局所購読。
- 保存: `const user = draft.commit()` → 以降は `User` のみをアプリ内部に通す。

### スニペット（概念）

```ts
import { atom } from 'jotai';

export const draftAtom = atom(new User.Draft());
// 例: プロファイル名だけのフォーカス
// const nameAtom = focusAtom(draftAtom, (o) => ({ get: d => d.state.profile?.name, set: (d, v) => d.setSection('profile', { name: v }) }));
```

---

## 6. I/O 境界ポリシー

- **受信**: JSON → `UserSchema.parse` → `User`（brand 回復）
- **送信/保存**: `User#toDTO()` を使用
- **外部スレッド/Worker**越え: クラスはメソッドが落ちるため **DTO で渡す**。復帰時に `User.from(dto)`

---

## 7. 配列・ネスト・正規化

- 2 階層超の深いネスト/可変配列編集が多い場合：
  - **UI（Draft）だけ正規化（id-indexed Map）** → 保存時に配列へ戻す
  - ドメイン（Entity）は原則配列のまま、または別エンティティに切り出し
- `withImmer` 採用でネスト編集の ergonomics を確保

---

## 8. パフォーマンスと DX

- Entity は不変・小さな API で最小限のコスト。
- UI 側の再レンダーは **局所購読**で抑制。
- 重い派生値は **メモ化（**``**, **``**, selector）** へ分離。

---

## 9. テスト方針

- **スキーマ単体テスト**：境界・ brand・`superRefine` の網羅。
- **Entity 単体**：`from`, `with`, `withSection`, `withImmer`, `toDTO` の正常/異常。
- **Draft**：部分更新・部分検証・`commit` 失敗時のエラー反映。
- **I/O 統合**：JSON 往復で brand が消える→再 parse で回復すること。

---

## 10. よくあるアンチパターン

- フィールドごとにメンバ変数を直接保持（ドメインの整合が崩れやすい）。
- 深すぎるネスト（3 階層以上）を Entity で直接扱う（更新 API が複雑化）。
- クロスフィールド制約をコンポーネント内ロジックに分散（`superRefine` へ集約すべき）。
- Draft をそのままビジネスロジックに渡す（必ず Entity に昇格させる）。

---

## 11. 実装チェックリスト

-

---

## 12. 拡張のヒント

- **Value Object**（例: `Money`, `Percent`, `DateRange`）を brand + クラス/関数で共通化。
- **ディスパッチ/Visitor** で利用側の分岐ゼロ化（必要時）。
- **エラー多言語化**：Zod のエラーマップをカスタムし i18n と統合。

---

### 付録：最小雛形（抜粋）

```ts
// schema.ts
export const Schema = z.object({ /* ... */ }).strict();
export type DTO = z.output<typeof Schema>;
export type Input = z.input<typeof Schema>;

// entity.ts
export class Entity {
  private constructor(private readonly data: Readonly<DTO>) {}
  static from(input: unknown) { return new Entity(Schema.parse(input)); }
  toDTO(): DTO { return { ...this.data }; }
  with(patch: DeepPartial<Input>): Entity { return Entity.from({ ...this.data, ...patch }); }
  withImmer(mut: (d: Draft<Input>) => void): Entity { return Entity.from(produce(this.data, mut)); }
  static Draft = class { /* state, errors, setSection, commit */ }
}
```

> このガイドラインは「集約×浅いネスト×パッチ API」「境界厳密化×内部多態」を軸に、UI/テスト/パフォーマンスのバランスを最適化するための実装規約である。

