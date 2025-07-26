# Markdown記述指示

## 目的

- 統一されたMarkdown記述を実現し、可読性と保守性を確保するため、markdownlintルールに完全準拠したMarkdownファイルを作成し、一貫した文書品質を維持する

## 遵守事項

- markdownlintルールに完全準拠する
- エラー・警告を一切残さない
- 統一されたフォーマットと構造を維持する
- アクセシビリティを考慮した記述を行う

## markdownlint準拠

### 1. 基本ルール

#### 1.1 見出し（Headers）
```markdown
<!-- ✅ 正しい見出し -->
# レベル1見出し

## レベル2見出し

### レベル3見出し

<!-- ❌ 間違った見出し -->
#見出し（スペースなし）
## 見出し ##（ATX形式の終端記号）
```

#### 1.2 見出し周りの空行（MD022）
```markdown
<!-- ✅ 正しい：見出し前後に空行 -->
前の段落です。

## 見出し

次の段落です。

<!-- ❌ 間違った：空行なし -->
前の段落です。
## 見出し
次の段落です。
```

#### 1.3 リスト周りの空行（MD032）
```markdown
<!-- ✅ 正しい：リスト前後に空行 -->
前の段落です。

- リスト項目1
- リスト項目2

次の段落です。

<!-- ❌ 間違った：空行なし -->
前の段落です。
- リスト項目1
- リスト項目2
次の段落です。
```

### 2. ファイル構造ルール

#### 2.1 ファイル末尾の改行（MD047）
```markdown
<!-- ✅ 正しい：ファイル末尾に改行 -->
最後の行です。

<!-- ❌ 間違った：ファイル末尾に改行なし -->
最後の行です。
```

#### 2.2 重複見出しの禁止（MD024）
```markdown
<!-- ✅ 正しい：ユニークな見出し -->
## 概要
## 詳細
## まとめ

<!-- ❌ 間違った：重複する見出し -->
## 概要
## 詳細
## 概要（重複）
```

### 3. コードブロックルール

#### 3.1 言語指定必須（MD040）
```markdown
<!-- ✅ 正しい：言語指定あり -->
```typescript
const message: string = "Hello, World!";
```

```bash
npm install
```

```json
{
  "name": "example"
}
```

<!-- ❌ 間違った：言語指定なし -->
```
const message = "Hello, World!";
```
```

#### 3.2 コードブロック周りの空行（MD031）
```markdown
<!-- ✅ 正しい：コードブロック前後に空行 -->
前の段落です。

```typescript
const code = "example";
```

次の段落です。

<!-- ❌ 間違った：空行なし -->
前の段落です。
```typescript
const code = "example";
```
次の段落です。
```

### 4. リンクとリストルール

#### 4.1 リンク参照の整合性（MD052）
```markdown
<!-- ✅ 正しい：参照リンクが定義されている -->
[リンクテキスト][link-ref]

[link-ref]: https://example.com

<!-- ❌ 間違った：参照リンクが未定義 -->
[リンクテキスト][undefined-ref]
```

#### 4.2 リストのインデント（MD007）
```markdown
<!-- ✅ 正しい：2スペースインデント -->
- レベル1
  - レベル2
    - レベル3

<!-- ❌ 間違った：不正なインデント -->
- レベル1
    - レベル2（4スペース）
      - レベル3（6スペース）
```

### 5. 文書構造ルール

#### 5.1 最初の見出しはh1（MD041）
```markdown
<!-- ✅ 正しい：ファイル最初はh1 -->
# メインタイトル

## サブタイトル

<!-- ❌ 間違った：ファイル最初がh2 -->
## サブタイトル（h1が欠如）
```

#### 5.2 連続する見出しレベル（MD001）
```markdown
<!-- ✅ 正しい：段階的な見出しレベル -->
# レベル1
## レベル2
### レベル3

<!-- ❌ 間違った：レベルをスキップ -->
# レベル1
### レベル3（レベル2をスキップ）
```

## プロジェクト設定

### 6. .markdownlint.json設定

#### 6.1 推奨設定ファイル
```json
{
  "default": true,
  "MD003": { "style": "atx" },
  "MD007": { "indent": 2 },
  "MD013": { "line_length": 120 },
  "MD024": { "siblings_only": true },
  "MD025": { "front_matter_title": "" },
  "MD033": false,
  "MD041": false
}
```

#### 6.2 設定解説
- **MD003**: ATX形式の見出し（#）を使用
- **MD007**: リストインデントを2スペースに設定
- **MD013**: 行の長さを120文字に制限
- **MD024**: 兄弟レベルでのみ重複見出しを禁止
- **MD033**: HTMLタグを許可（無効化）
- **MD041**: 最初の見出しレベル制限を無効化

### 7. エディター統合

#### 7.1 VS Code設定
```json
{
  "markdownlint.config": {
    "MD013": { "line_length": 120 },
    "MD033": false
  },
  "editor.rulers": [120],
  "editor.wordWrap": "wordWrapColumn",
  "editor.wordWrapColumn": 120
}
```

#### 7.2 自動修正の活用
```bash
# markdownlint-cliでの自動修正
npx markdownlint-cli2-fix "**/*.md"

# または特定ファイルのみ
npx markdownlint-cli2-fix "README.md"
```

## 品質チェック

### 8. CI/CD統合

#### 8.1 GitHub Actionsでのチェック
```yaml
name: Markdown Lint
on: [push, pull_request]
jobs:
  markdownlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run markdownlint
        uses: articulate/actions-markdownlint@v1
        with:
          config: .markdownlint.json
          files: '**/*.md'
```

#### 8.2 pre-commitフックでのチェック
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/igorshubovych/markdownlint-cli
    rev: v0.37.0
    hooks:
      - id: markdownlint-fix
        args: ['--config', '.markdownlint.json']
```

### 9. よくあるエラーと修正方法

#### 9.1 MD022（見出し周りの空行）
```markdown
<!-- 修正前 -->
テキスト
## 見出し
テキスト

<!-- 修正後 -->
テキスト

## 見出し

テキスト
```

#### 9.2 MD032（リスト周りの空行）
```markdown
<!-- 修正前 -->
テキスト
- リスト項目
テキスト

<!-- 修正後 -->
テキスト

- リスト項目

テキスト
```

#### 9.3 MD040（コードブロック言語指定）
```markdown
<!-- 修正前 -->
```
code here
```

<!-- 修正後 -->
```javascript
code here
```
```

### 10. スタイルガイド

#### 10.1 推奨記述パターン
```markdown
# ドキュメントタイトル

## 概要

簡潔な説明文。

## セクション1

### サブセクション

詳細な説明。

- リスト項目1
- リスト項目2

### コード例

```typescript
const example: string = "Hello, World!";
```

## まとめ

まとめの文章。
```

#### 10.2 テーブル記述
```markdown
| 項目 | 説明 | 例 |
|------|------|-----|
| 型 | TypeScript型 | `string` |
| 値 | 実際の値 | `"Hello"` |
```

## チェック手順

### 11. 作成・編集時の確認手順

1. **執筆時**: markdownlint対応エディターで執筆
2. **保存前**: エラー・警告の完全解消
3. **コミット前**: CLIでの最終チェック実行
4. **PR作成時**: CI/CDでの自動チェック確認

### 12. コマンドラインでのチェック

```bash
# 全MDファイルのチェック
npx markdownlint-cli2 "**/*.md"

# 特定ファイルのチェック
npx markdownlint-cli2 "README.md"

# 自動修正込みのチェック
npx markdownlint-cli2-fix "**/*.md"

# 設定ファイル指定
npx markdownlint-cli2 --config .markdownlint.json "**/*.md"
```

## 完了判定基準

- markdownlintでエラー・警告が一切出力されないこと
- .markdownlint.json設定ファイルが適切に配置されていること
- エディターでmarkdownlint統合が有効化されていること
- CI/CDパイプラインでmarkdownlintチェックが実行されていること
- 見出し構造が論理的で一貫していること
- コードブロックに適切な言語指定がされていること
- リンク参照が全て正しく定義されていること
- ファイル末尾に改行が存在すること
- 文書全体の可読性が確保されていること
- チーム内でMarkdown記述スタイルが統一されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける