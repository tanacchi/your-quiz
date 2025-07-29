UI設計ガイドライン（Markdown + Mermaid + Storybook 編）

本ガイドラインは、Figma 等の専用デザインツールに依存せず、GitHubリポジトリ内で完結するUI設計プロセスを提示します。以下のツール・形式を組み合わせ、エンジニア主導かつコードドリブンでUI/UX設計〜実装を行う手順です。
	•	Markdown … 設計ドキュメント/画面要素定義
	•	Mermaid.js … ページ階層図・ユーザーフロー図等の可視化
	•	Storybook … UIコンポーネントの仕様とカタログ化
	•	MCP・LLM … ドキュメントとUI実装の連携・自動生成

⸻

目次
	1.	概要と前提
	2.	設計全体フロー（8ステップ）
	3.	各ステップの詳細・運用例
	4.	MCP/LLM自動化例
	5.	推奨リポジトリ構成案
	6.	参考資料・外部リンク

⸻

1. 概要と前提
	•	対象: Figma等ビジュアルツールを極力使わず、GitHubとコードベースでUI/UX設計を進めたいエンジニアリング主体チーム
	•	目的: URL構成未決定・UI未設計の機能群に対し、無駄なくUI設計・情報設計→コンポーネント分割→実装を進める
	•	成果物: 画面設計・ワイヤーフレーム・ページ遷移図・コンポーネント設計・UIカタログがGitHub上で再現性高く管理できる

⸻

2. 設計全体フロー（8ステップ）
	1.	機能リストの粒度調整
	2.	ページ階層（URL構成）のスケルトン作成
	3.	主要ユーザーフローの可視化
	4.	低忠実度ワイヤーフレーム設計
	5.	コンポーネントインベントリ抽出・粒度整理
	6.	Storybookセットアップ&自動Story生成
	7.	Autodocs/Visualテストの運用
	8.	MCP/LLMによるドキュメント・実装自動同期

⸻

3. 各ステップ詳細

1. 機能リストの粒度調整
	•	目的: 「何ができるか」をユーザーストーリーやユースケースベースで言語化。粒度を合わせ、優先度付けをする。
	•	成果物: docs/features.md
	•	記載例:

# ユーザーストーリー
- ユーザーは商品を一覧で確認できる
- 商品詳細を閲覧できる
- 商品を新規登録できる
- ...


	•	Tips: Qiita記事(https://qiita.com/mskmiki/items/544149987475719e417b) の「要素を闇雲に積み上げない」思考を意識

2. ページ階層のスケルトン作成
	•	目的: 全機能をどのURL/階層・ページで提供するかざっくり定める。CRUDパターン等の整理。
	•	成果物: docs/pages.yaml および docs/site-map.mmd
	•	記載例:

- path: /
  name: ホーム
  children:
    - path: /items
      name: 在庫一覧
      children:
        - path: /items/:id
          name: 詳細

→ これをChatGPT等でMermaid形式（graph TD）に変換:

graph TD
  Root[ホーム]
  Root --> Items[在庫一覧]
  Items --> Detail[詳細]


	•	Tips: MermaidはGitHub上で直接可視化できる。サイトマップ・階層のレビューにも活用。

3. 主要ユーザーフローの可視化
	•	目的: よくある操作（新規登録、更新、検索等）をフローチャートやシーケンス図で明示化。
	•	成果物: docs/flows/{機能名}.mmd
	•	記載例:

flowchart TD
  Start[商品一覧を開く]
  Start --> Select[商品選択]
  Select --> View[詳細閲覧]
  View --> Back[戻る]


	•	補足: テスト設計やバリデーション仕様、API設計との対応付けにも役立つ

4. 低忠実度ワイヤーフレーム設計
	•	目的: ページごとに大まかなブロック配置や主要要素を定義。箱組み・エリア分割中心。
	•	成果物: docs/wireframes/{ページ名}.md
	•	記載例1: Markdown+疑似JSX

## /items
<Page>
  <Header />
  <ItemTable />
  <PrimaryButton>Add</PrimaryButton>
</Page>


	•	記載例2: Mermaidブロック図

graph LR
  Header --> ItemTable
  ItemTable --> AddButton


	•	ポイント: Qiita記事内の「まず情報の整理」「情報設計に戻る」視点を随所に意識

5. コンポーネントインベントリ抽出・粒度整理
	•	目的: 各ワイヤーから再利用・カスタマイズ可能な部品（Atomic Designなどの粒度）を命名・props案を立てる
	•	成果物: src/components/README.md 等一覧、src/components/{部品名}/
	•	記載例:

- Header
- ItemTable (props: items[])
- PrimaryButton (props: label, onClick)


	•	補足: Mermaidで「Component – Page」対応図も描ける

6. Storybookセットアップ＆自動Story生成
	•	目的: UIカタログとして機能するStorybookを導入し、各コンポーネントの*.stories.tsxを生成
	•	成果物: .storybook/, src/components/**/*.stories.tsx
	•	Tips:
	•	StorybookのAutodocsはtags:['autodocs']で自動生成可能
	•	StorybookGPT/Genie（AIでstory雛形を生成するOSS/プラグイン）も活用
	•	CI（Chromatic等）連携でビジュアル差分テストも同時に

7. Autodocs/Visualテストの運用
	•	目的: Storybookの自動ドキュメント生成・ビジュアル回帰テストでUI仕様の乖離を減らす
	•	成果物: stories/**/*.mdx、CIレポート
	•	補足:
	•	Autodocsは型情報/コメントから仕様ページを自動生成
	•	ChromaticなどでPRごとにUI差分をチェック

8. MCP/LLMによるドキュメント・実装自動同期
	•	目的: ページ定義・サイトマップ・Storybook実装に齟齬が出た場合の検出・自動再生成
	•	成果物: .github/workflows/mcp-sync.yml等、MCPスクリプト
	•	運用例:
	•	GitHub ActionsからMCPクライアントをキックし、pages.yaml・site-map.mmd・storiesの差異を検出
	•	不一致時はLLMに再生成指示→自動PR化
	•	参考: MCP Model Context Protocol公式

⸻

4. MCP/LLM自動化例

4.1 LLMへのプロンプト例

pages.yaml を読み取り、Mermaid の site-map を生成してください。
制約:
- graph TD 形式
- ノード名は `path`、ラベルは `name`
- ルートは着色しない

4.2 MCP活用例
	•	GitHub Action上で「定義変更時に自動で図やコードを再生成」するCI/CDワークフローを構築
	•	例: pages.yaml→Mermaid site-map.mmd、またはstory雛形生成
	•	参考: MCP活用例（Qiita）

⸻

5. 推奨リポジトリ構成案

/docs/
  features.md         # ユーザーストーリー・機能一覧
  pages.yaml          # ページ階層・URL構成
  site-map.mmd        # Mermaid.js サイトマップ
  /flows/             # ユーザーフロー図
  /wireframes/        # 各画面ワイヤー
/src/components/      # UIコンポーネント実装
  Button/
  Header/
  ItemTable/
.storybook/
.github/workflows/
  mcp-sync.yml        # MCP連携用CI


⸻

6. 参考資料・外部リンク
	•	Qiita: 情報設計・UI設計の黄金パターン
	•	Qiita: MCP活用例（リバースエンジニアリング設計）
	•	Qiita: ChatGPTとMermaidを併用した設計手法
	•	Model Context Protocol 公式: https://github.com/modelcontext/protocol
	•	Storybook Autodocs: https://storybook.js.org/docs/writing-docs/autodocs
	•	Chromatic（StorybookのCI/ビジュアルテスト）: https://www.chromatic.com/
	•	Mermaid.js: https://mermaid-js.github.io/

⸻

（最終更新: 2025-07-29）
