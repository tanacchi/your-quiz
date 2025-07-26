# クイズフロー図

## 概要

このドキュメントは、クイズ回答の一連の流れを示します。

## Mermaid図

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant B as 📱 Browser
    participant C as 🌐 CDN
    participant F as ⚙️ Frontend
    participant A as 🚀 API
    participant D as 📄 Database
    participant I as 💾 IndexedDB

    Note over U,I: クイズ検索・回答フロー

    %% 1. クイズ一覧取得
    U->>B: クイズ一覧表示要求
    B->>C: GET /quizzes (with tags filter)
    C->>F: Cache Miss時
    F->>A: GET /api/quizzes?tags=math
    A->>D: SELECT * FROM quizzes WHERE tags @> '["math"]'
    D-->>A: クイズリスト
    A-->>F: JSON Response (100ms以内)
    F-->>C: HTML + State
    C-->>B: Cached Response
    B-->>U: クイズ一覧画面表示

    %% 2. オフライン対応 (事前ダウンロード)
    Note over B,I: オフライン対応
    B->>I: クイズデータ保存
    I-->>B: 保存完了

    %% 3. クイズ回答
    U->>B: スワイプで回答 (◯/×)
    Note over B: Tinder UI操作
    B->>A: POST /api/quizzes/{id}/answers
    Note over A: {"answer": true, "timestamp": "..."}
    A->>D: INSERT INTO answer_events
    D-->>A: 保存成功
    A-->>B: 正誤判定 + 解説
    B->>I: 回答履歴保存
    I-->>B: 保存完了
    B-->>U: 結果表示→フェードアウト→解説表示

    %% 4. オフライン時の動作
    Note over U,I: オフラインモード
    U->>B: ネットワーク断線状態
    B-xF: 通信エラー
    B->>I: ローカルクイズ取得
    I-->>B: キャッシュ済みクイズ
    B-->>U: オフラインモード表示

    %% 5. 回答 (オフライン)
    U->>B: オフライン回答
    B->>I: 未同期回答として保存
    I-->>B: 保存完了
    B-->>U: 回答結果表示 (同期マーク付き)

    %% 6. オンライン復旧時同期
    Note over B,A: オンライン復旧
    B->>A: POST /api/answers/sync
    Note over A: 未同期回答の一括送信
    A->>D: バッチ挿入
    D-->>A: 同期完了
    A-->>B: 同期結果
    B->>I: 同期済み状態更新
    I-->>B: 更新完了
    B-->>U: 同期完了通知
```
