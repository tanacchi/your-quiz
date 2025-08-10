import "@typespec/http";
import "@typespec/openapi3";
import "./common/types.tsp";
import "./common/errors.tsp";
import "./models/user.tsp";
import "./models/quiz.tsp";
import "./models/attempt.tsp";
import "./models/deck.tsp";
import "./models/tag.tsp";
import "./operations/quiz-management.tsp";
// import "./operations/quiz-learning.tsp";
// import "./operations/user-session.tsp";
import "./operations/search.tsp";

using Http;

@service()
@doc("""
スマートフォン向けクイズアプリケーションのAPI

このAPIは、教育・学習支援を目的としたクイズアプリケーションのための包括的なサービスを提供します。

## 主要機能
- **クイズ管理**: 作成、更新、削除、承認ワークフロー
- **検索・発見**: 高度なフィルタリングとソート機能
- **学習支援**: パーソナライズされた学習体験
- **タグシステム**: 階層的なコンテンツ分類

## 技術仕様
- **認証**: 全操作でユーザー認証が必要
- **レート制限**: API操作には適切な制限を設定
- **データ形式**: JSON形式でのリクエスト・レスポンス
- **文字エンコーディング**: UTF-8
""")
namespace YourQuizAPI;
