# Markdown記述指示

## 目的

- Markdownファイルは必ず markdownlint-cli2 でフォーマットチェックを行い、エラー・警告が一切出ない状態でコミット・PRすること

## 遵守事項

- 細かい記法・ルールは .markdownlint.json の設定に従うこと
- 本ファイルでの個別ルール説明は省略
- コミット・PR前に必ず以下コマンドでチェックを実施すること

```bash
pnpm run lint:md
```

- エラー・警告が出た場合は必ず修正し、再度チェックを通すこと

## 完了判定基準

- markdownlint-cli2でエラー・警告が一切出力されないこと
- .markdownlint.json設定ファイルが適切に配置されていること
- チーム内でMarkdown記述スタイルが統一されていること
