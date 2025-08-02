Mutationテストとその自動改善の方針と手順

概要

Mutationテスト（変異テスト）は、コードの一部を意図的に変更（ミューテーション）し、それによって既存のテストが失敗するかを検証することで、テストの網羅性・有効性を評価する手法です。本方針では、Stryker を用いたMutationテストに対して、LLM（大規模言語モデル）を活用して自動的にテストを補強・改善する仕組みを構築することを目的とします。

⸻

自動改善の全体方針
	1.	Strykerによるミューテーションテストの実行
	2.	生存ミューテーション（Survived）の抽出
	3.	最小限の差分情報を生成
	4.	既存のテストケースと差分を元にLLMで新しいテストコードを生成
	5.	テストを追加し、Strykerを再実行してループ

⸻

詳細手順

1. Strykerによるテスト実行
	•	stryker.conf.json に以下を追加し、JSONレポートを出力:

{
  "reporters": ["progress", "json"]
}

	•	実行後、reports/mutation/mutation-report.json に結果が出力される

2. Survived mutant の抽出
	•	JSONから status: "Survived" を持つ mutant のみ抽出
	•	抽出する情報は以下に限定:
	•	sourceFile
	•	location.start.line および location.end.line
	•	replacement

3. 差分情報（Unified Diff）の生成
	•	元のファイルを読み込んで対象行を抽出
	•	diff ライブラリ等を用いて Unified Diff を生成
	•	差分の形式例:

@@ -42,7 +42,7 @@
-return a + b;
+return a - b; // mutated

4. LLM へのプロンプト構築
	•	各 mutant に対して次の情報を含んだ JSON を生成:

{
  "file": "src/foo.ts",
  "line": 42,
  "diff": "@@ -42,7 +42,7 @@\n-return a + b;\n+return a - b; // mutated"
}

	•	プロンプトの設計:

次の差分を元に、このコードのバグを検出する単体テストを生成してください。

	•	必要に応じて、関連する既存テストケース（類似性が高いもの1件）を添付する

5. 自動ループによる改善
	•	LLM によって生成されたテストコードを追加
	•	Stryker を再実行
	•	Survived が残っていれば再度 2 に戻る
	•	CI上では --break-on=m>0 等で継続的に検証・改善を実行可能

⸻

トークン効率を高める工夫
	•	差分のみを送信し、コード全文は避ける
	•	JSONをチャンク分割し、複数 mutant をバッチ処理
	•	LLM の system プロンプトに共通指示を固定（userプロンプト短縮）
	•	Equivalent mutant など殺せない変異は最初から除外

⸻

まとめ

本アプローチにより、テスト網羅率を定量的に測定し、不足をLLMベースで補完する自動化ループを構築できます。特に以下のようなプロジェクトに有効です：
	•	レガシーコードのテスト強化
	•	TDD/BDD後の補完テスト生成
	•	品質担保を定量評価したいプロジェクト

プロンプトサイズとテスト精度のバランスを取りつつ、継続的な品質向上が期待されます。