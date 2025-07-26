# データフロー図

## 概要

このドキュメントは、クイズアプリケーションのデータフローを視覚的に表現しています。

## アーキテクチャ構成

- **Input Layer**: ユーザーインターフェース層
- **Validation Layer**: データ検証層
- **Application Layer**: アプリケーションサービス層
- **Domain Layer**: ドメインロジック層
- **Persistence Layer**: データ永続化層
- **Data Storage**: 物理ストレージ層

## データフロー全体図

```mermaid
flowchart TD
    %% Data Sources
    Creator[👤 クイズ作成者]
    User[👤 回答者]
    Admin[👨‍💼 管理者]

    %% Input Layer
    subgraph "Input Layer"
        CreateForm[📝 クイズ作成フォーム]
        AnswerUI[📱 回答UI<br/>Tinder風スワイプ]
        AdminPanel[⚙️ 管理パネル<br/>承認・拒否]
    end

    %% Validation Layer
    subgraph "Validation Layer"
        Validator[✅ zod Validation<br/>・文字数制限<br/>・XSS対策<br/>・必須項目チェック]
    end

    %% Application Layer
    subgraph "Application Layer"
        QuizUC[🎯 Quiz Use Cases]
        AnswerUC[📊 Answer Use Cases]
        AdminUC[👨‍💼 Admin Use Cases]
    end

    %% Domain Layer
    subgraph "Domain Layer"
        QuizAggregate[🏛️ Quiz Aggregate<br/>・Quiz Entity<br/>・Question VO<br/>・Tag VO]
        AnswerAggregate[📈 Answer Aggregate<br/>・Answer Entity<br/>・Result VO<br/>・Timestamp VO]
    end

    %% Persistence Layer
    subgraph "Persistence Layer"
        QuizRepo[💾 Quiz Repository<br/>Drizzle ORM]
        AnswerRepo[📊 Answer Repository<br/>Event Store]
        CacheLayer[⚡ Cache Layer<br/>Multi-level]
    end

    %% Data Storage
    subgraph "Data Storage"
        MainDB[(🗄️ Main Database<br/>PostgreSQL<br/>ACID保証)]
        EventStore[(📅 Answer Events<br/>Time-series<br/>Append-only)]
        ClientCache[(📱 Client Storage<br/>IndexedDB<br/>オフライン対応)]
        ServerCache[(⚡ Server Cache<br/>Redis<br/>高速アクセス)]
    end

    %% Data Flow - Quiz Creation
    Creator --> CreateForm
    CreateForm --> Validator
    Validator -->|Validation Pass| QuizUC
    Validator -->|Validation Fail| CreateForm
    QuizUC --> QuizAggregate
    QuizAggregate --> QuizRepo
    QuizRepo --> MainDB

    %% Data Flow - Answer Submission
    User --> AnswerUI
    AnswerUI --> Validator
    Validator --> AnswerUC
    AnswerUC --> AnswerAggregate
    AnswerAggregate --> AnswerRepo
    AnswerRepo --> EventStore
    AnswerRepo --> ClientCache

    %% Data Flow - Admin Operations
    Admin --> AdminPanel
    AdminPanel --> AdminUC
    AdminUC --> QuizAggregate
    QuizAggregate --> QuizRepo

    %% Cache Flow
    QuizRepo <--> ServerCache
    AnswerRepo <--> ServerCache
    AnswerUI <--> ClientCache

    %% Read Path
    subgraph "Read Path (CQRS-like)"
        ReadModel[📖 Read Models<br/>・Quiz List View<br/>・Answer History View<br/>・Statistics View]
        MaterializedView[(📊 Materialized Views<br/>・承認済みクイズ<br/>・ユーザー統計)]
    end

    MainDB --> MaterializedView
    EventStore --> MaterializedView
    MaterializedView --> ReadModel
    ReadModel --> ServerCache

    %% Offline Sync
    subgraph "Offline Sync"
        SyncEngine[🔄 Sync Engine<br/>・競合解決<br/>・差分同期<br/>・エラー処理]
    end

    ClientCache <--> SyncEngine
    SyncEngine <--> AnswerRepo
    SyncEngine <--> QuizRepo

    %% Data Transformation
    subgraph "Data Transformation"
        DTOMapper[🔄 DTO Mapper<br/>・Domain↔API<br/>・Entity↔DTO<br/>・型安全変換]
        EventProcessor[⚡ Event Processor<br/>・Answer Events<br/>・統計更新<br/>・通知トリガー]
    end

    QuizAggregate <--> DTOMapper
    AnswerAggregate <--> DTOMapper
    EventStore --> EventProcessor
    EventProcessor --> MaterializedView

    %% Data Quality & Security
    subgraph "Data Quality & Security"
        Sanitizer[🧹 Data Sanitizer<br/>・HTML除去<br/>・特殊文字処理]
        Encryption[🔐 Encryption<br/>・ユーザー識別子<br/>・機密データ]
        Backup[💼 Backup System<br/>・日次バックアップ<br/>・ポイントインタイム復旧]
    end

    Validator --> Sanitizer
    QuizRepo --> Encryption
    MainDB --> Backup
    EventStore --> Backup

    %% Monitoring & Analytics
    subgraph "Monitoring & Analytics"
        Metrics[📊 Metrics Collector<br/>・パフォーマンス<br/>・利用統計]
        Logger[📝 Structured Logger<br/>・エラートラッキング<br/>・監査ログ]
    end

    QuizUC --> Metrics
    AnswerUC --> Metrics
    QuizRepo --> Logger
    AnswerRepo --> Logger

    %% Styling
    classDef userClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef inputClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef appClass fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef domainClass fill:#fff8e1,stroke:#f57f17,stroke-width:3px
    classDef dataClass fill:#ffebee,stroke:#c62828,stroke-width:2px
    classDef cacheClass fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    classDef securityClass fill:#fce4ec,stroke:#ad1457,stroke-width:2px

    class Creator,User,Admin userClass
    class CreateForm,AnswerUI,AdminPanel inputClass
    class QuizUC,AnswerUC,AdminUC,Validator appClass
    class QuizAggregate,AnswerAggregate domainClass
    class MainDB,EventStore dataClass
    class ClientCache,ServerCache,CacheLayer cacheClass
    class Sanitizer,Encryption,Backup securityClass
```

## データフローの説明

### 1. クイズ作成フロー

1. **クイズ作成者** → **クイズ作成フォーム** でクイズを入力
2. **Validation Layer** でデータ検証（文字数制限、XSS対策等）
3. 検証通過後、**Quiz Use Cases** でビジネスロジック処理
4. **Quiz Aggregate** でドメインルール適用
5. **Quiz Repository** 経由で **PostgreSQL** に永続化

### 2. 回答フロー

1. **回答者** → **回答UI（Tinder風）** で回答
2. **Validation Layer** でデータ検証
3. **Answer Use Cases** で回答処理
4. **Answer Aggregate** でドメインルール適用
5. **Answer Repository** 経由で **Event Store** に記録
6. 同時に **IndexedDB** にキャッシュ（オフライン対応）

### 3. 管理フロー

1. **管理者** → **管理パネル** でクイズ承認・拒否
2. **Admin Use Cases** で管理操作
3. **Quiz Aggregate** でステータス更新
4. **Quiz Repository** 経由でデータベース更新

### 4. 読み取りパス（CQRS-like）

- **Materialized Views** で最適化されたデータビューを提供
- **Read Models** で画面表示用データを整形
- **Server Cache** で高速アクセス

### 5. オフライン同期

- **Sync Engine** が **Client Cache** と サーバー間の同期を管理
- 競合解決、差分同期、エラー処理を実装

### 6. データ品質・セキュリティ

- **Data Sanitizer** でデータクリーニング
- **Encryption** で機密データ暗号化
- **Backup System** でデータ保護

### 7. 監視・分析

- **Metrics Collector** でパフォーマンス監視
- **Structured Logger** でエラートラッキングと監査ログ

## 技術選択の背景

- **PostgreSQL**: ACID保証が必要なメインデータ
- **Event Store**: 回答履歴の時系列データ
- **IndexedDB**: ブラウザでのオフライン対応
- **Redis**: 高速キャッシュ
- **zod**: 型安全なバリデーション
- **Drizzle ORM**: 型安全なデータベースアクセス
