# モデル設計（最終成果物）フォーマット案2：レイヤードアーキテクチャ統合アプローチ

## フォーマットの概要

DDD 2024年のベストプラクティスに基づき、**4層アーキテクチャ（プレゼンテーション・アプリケーション・ドメイン・インフラストラクチャ）を明確に分離し、各層での4つの核心図表の役割と責任を体系化**したレイヤー中心の設計アプローチ。実装の責任分離と保守性を重視する。

## 記載項目テンプレート

### 1. レイヤー統合ドメインモデル図

#### 4層アーキテクチャ統合モデル

```markdown
## 4-Layer Architecture Integrated Domain Model

### Layer-Aware Domain Model Structure

```mermaid
graph TB
    %% Presentation Layer
    subgraph "Presentation Layer"
        WebController[Web Controllers<br/>- QuizController<br/>- SessionController<br/>- UserController]
        DTOs[Data Transfer Objects<br/>- QuizDTO<br/>- SessionDTO<br/>- UserDTO]
        ViewModels[View Models<br/>- QuizViewModel<br/>- SessionViewModel]
    end
    
    %% Application Layer  
    subgraph "Application Layer"
        AppServices[Application Services<br/>- QuizApplicationService<br/>- SessionApplicationService<br/>- UserApplicationService]
        CommandHandlers[Command Handlers<br/>- CreateQuizHandler<br/>- StartSessionHandler<br/>- SubmitAnswerHandler]
        QueryHandlers[Query Handlers<br/>- QuizQueryHandler<br/>- SessionQueryHandler<br/>- ReportQueryHandler]
        AppDTOs[Application DTOs<br/>- CreateQuizCommand<br/>- StartSessionCommand<br/>- SubmitAnswerCommand]
    end
    
    %% Domain Layer
    subgraph "Domain Layer"
        Aggregates[Aggregates<br/>- Quiz<br/>- QuizSession<br/>- User]
        Entities[Entities<br/>- Question<br/>- Answer<br/>- UserProfile]
        ValueObjects[Value Objects<br/>- QuizTitle<br/>- Score<br/>- Email]
        DomainServices[Domain Services<br/>- ScoreCalculationService<br/>- ContentValidationService]
        Repositories[Repository Interfaces<br/>- QuizRepository<br/>- SessionRepository<br/>- UserRepository]
        DomainEvents[Domain Events<br/>- QuizCreated<br/>- SessionCompleted<br/>- UserRegistered]
    end
    
    %% Infrastructure Layer
    subgraph "Infrastructure Layer"
        RepoImpl[Repository Implementations<br/>- PostgresQuizRepository<br/>- PostgresSessionRepository]
        ExternalServices[External Service Adapters<br/>- EmailServiceAdapter<br/>- PaymentServiceAdapter]
        Messaging[Messaging Infrastructure<br/>- EventPublisher<br/>- MessageHandler]
        Persistence[Persistence Models<br/>- QuizEntity (ORM)<br/>- SessionEntity (ORM)]
    end
    
    %% Layer Dependencies (Top to Bottom Only)
    WebController --> AppServices
    WebController --> DTOs
    AppServices --> CommandHandlers
    AppServices --> QueryHandlers
    CommandHandlers --> Aggregates
    CommandHandlers --> DomainServices
    QueryHandlers --> Repositories
    Aggregates --> ValueObjects
    Aggregates --> DomainEvents
    DomainServices --> Repositories
    Repositories --> RepoImpl
    RepoImpl --> Persistence
    DomainEvents --> Messaging
    ExternalServices --> Messaging
    
    classDef presentation fill:#ff6b6b,color:#fff
    classDef application fill:#4ecdc4,color:#fff
    classDef domain fill:#45b7d1,color:#fff
    classDef infrastructure fill:#96ceb4,color:#fff
    
    class WebController,DTOs,ViewModels presentation
    class AppServices,CommandHandlers,QueryHandlers,AppDTOs application
    class Aggregates,Entities,ValueObjects,DomainServices,Repositories,DomainEvents domain
    class RepoImpl,ExternalServices,Messaging,Persistence infrastructure
```

### Layer Responsibility Matrix

| Layer | Primary Responsibility | Domain Model Role | Allowed Dependencies | Prohibited Dependencies |
|-------|----------------------|-------------------|---------------------|------------------------|
| **Presentation** | UI/API interface | DTO transformation, input validation | Application layer only | Domain, Infrastructure direct access |
| **Application** | Use case orchestration | Command/Query coordination | Domain layer, Infrastructure contracts | Infrastructure implementations |
| **Domain** | Business logic | Core model definition | None (pure domain) | Any external dependencies |
| **Infrastructure** | Technical concerns | Persistence, external integration | Domain contracts only | Domain business logic |

### Cross-Layer Model Mapping

| Domain Concept | Presentation Layer | Application Layer | Domain Layer | Infrastructure Layer |
|----------------|-------------------|-------------------|--------------|---------------------|
| **Quiz** | QuizDTO, QuizViewModel | CreateQuizCommand, QuizQuery | Quiz Aggregate | QuizEntity (ORM) |
| **QuizSession** | SessionDTO, SessionViewModel | StartSessionCommand, SessionQuery | QuizSession Aggregate | SessionEntity (ORM) |
| **Score** | ScoreDisplay, ScoreDTO | ScoreCalculationResult | Score Value Object | ScoreData (JSON) |
| **User** | UserProfileDTO | UserCommand, UserQuery | User Aggregate | UserEntity (ORM) |
```

### 2. レイヤー別集約図

#### ドメイン層集約詳細設計

```mermaid
graph TB
    subgraph "Domain Layer - Pure Business Logic"
        subgraph "Quiz Aggregate"
            QuizRoot[Quiz Aggregate Root<br/>========================<br/>+QuizId id<br/>+QuizTitle title<br/>+QuizStatus status<br/>+List~Question~ questions<br/>========================<br/>+addQuestion(Question) Result<br/>+publish() Result<br/>+validatePublishability() boolean]
            
            Question[Question Entity<br/>================<br/>+QuestionId id<br/>+QuestionText text<br/>+QuestionType type<br/>+Points points<br/>================<br/>+validateAnswer(Answer) boolean]
            
            QuizTitle[QuizTitle Value Object<br/>=======================<br/>+string value<br/>+int maxLength: 200<br/>=======================<br/>+validate() ValidationResult<br/>+equals(QuizTitle) boolean]
            
            QuizStatus[QuizStatus Value Object<br/>========================<br/>+StatusEnum value<br/>========================<br/>+canTransitionTo(Status) boolean]
        end
        
        subgraph "QuizSession Aggregate"  
            SessionRoot[QuizSession Aggregate Root<br/>============================<br/>+QuizSessionId id<br/>+UserId userId<br/>+QuizId quizId<br/>+SessionStatus status<br/>+Map~QuestionId,Answer~ answers<br/>============================<br/>+submitAnswer(QuestionId, AnswerData) Result<br/>+complete() Result<br/>+calculateProgress() Progress]
            
            Answer[Answer Entity<br/>===============<br/>+QuestionId questionId<br/>+AnswerData data<br/>+Date submittedAt<br/>===============<br/>+isCorrect() boolean]
            
            Score[Score Value Object<br/>==================<br/>+int rawScore<br/>+float percentage<br/>+Date calculatedAt<br/>==================<br/>+equals(Score) boolean]
        end
        
        subgraph "Domain Services"
            ScoreService[ScoreCalculationService<br/>==========================<br/>+calculateScore(QuizSession, Quiz) Result~Score~<br/>+calculatePartialScore(List~Answer~) PartialScore<br/>+applyTimePenalty(Score, Duration) Score]
            
            ValidationService[ContentValidationService<br/>============================<br/>+validateQuizContent(Quiz) ValidationResult<br/>+checkContentPolicy(Content) PolicyResult<br/>+moderateContent(Content) ModerationResult]
        end
    end
    
    %% Aggregate Internal Relationships
    QuizRoot ||--o{ Question
    QuizRoot ||--|| QuizTitle
    QuizRoot ||--|| QuizStatus
    
    SessionRoot ||--o{ Answer
    SessionRoot ||--|| Score
    
    %% Domain Service Dependencies
    ScoreService ..> SessionRoot : calculates
    ScoreService ..> QuizRoot : uses
    ValidationService ..> QuizRoot : validates
    
    classDef aggregateRoot fill:#ff6b6b,color:#fff,stroke:#333,stroke-width:3px
    classDef entity fill:#4ecdc4,color:#fff,stroke:#333,stroke-width:2px
    classDef valueObject fill:#45b7d1,color:#fff,stroke:#333,stroke-width:1px
    classDef domainService fill:#96ceb4,color:#fff,stroke:#333,stroke-width:2px
    
    class QuizRoot,SessionRoot aggregateRoot
    class Question,Answer entity
    class QuizTitle,QuizStatus,Score valueObject
    class ScoreService,ValidationService domainService
```

#### アプリケーション層集約統合

```mermaid
graph TB
    subgraph "Application Layer - Use Case Orchestration"
        subgraph "Quiz Management Use Cases"
            CreateQuizUC[Create Quiz Use Case<br/>========================<br/>Input: CreateQuizCommand<br/>Output: QuizCreatedResult<br/>========================<br/>1. Validate command<br/>2. Create Quiz aggregate<br/>3. Save via repository<br/>4. Publish domain events]
            
            PublishQuizUC[Publish Quiz Use Case<br/>========================<br/>Input: PublishQuizCommand<br/>Output: QuizPublishedResult<br/>========================<br/>1. Load Quiz aggregate<br/>2. Validate publishability<br/>3. Update status<br/>4. Trigger notifications]
        end
        
        subgraph "Session Management Use Cases"
            StartSessionUC[Start Session Use Case<br/>==========================<br/>Input: StartSessionCommand<br/>Output: SessionStartedResult<br/>==========================<br/>1. Validate user permissions<br/>2. Check existing sessions<br/>3. Create new session<br/>4. Initialize progress]
            
            SubmitAnswerUC[Submit Answer Use Case<br/>==========================<br/>Input: SubmitAnswerCommand<br/>Output: AnswerSubmittedResult<br/>==========================<br/>1. Load active session<br/>2. Validate answer format<br/>3. Record answer<br/>4. Update progress]
        end
        
        subgraph "Application Services Coordination"
            QuizAppService[Quiz Application Service<br/>============================<br/>Coordinates quiz-related use cases<br/>Manages cross-cutting concerns<br/>Handles transaction boundaries]
            
            SessionAppService[Session Application Service<br/>===============================<br/>Coordinates session-related use cases<br/>Manages session lifecycle<br/>Handles scoring integration]
        end
    end
    
    %% Use Case Dependencies  
    QuizAppService --> CreateQuizUC
    QuizAppService --> PublishQuizUC
    SessionAppService --> StartSessionUC
    SessionAppService --> SubmitAnswerUC
    
    %% Cross-Service Dependencies
    StartSessionUC -.-> QuizAppService : Quiz validation
    SubmitAnswerUC -.-> QuizAppService : Question validation
    
    classDef useCase fill:#feca57,color:#fff
    classDef appService fill:#48dbfb,color:#fff
    
    class CreateQuizUC,PublishQuizUC,StartSessionUC,SubmitAnswerUC useCase
    class QuizAppService,SessionAppService appService
```

### 3. レイヤードコンテキストマップ

#### 層間コンテキスト統合マップ

```markdown
## Layered Context Integration Map

### Layer-to-Context Mapping

```mermaid
graph TB
    %% External Systems Layer
    subgraph "External Systems"
        WebBrowser[Web Browser]
        MobileApp[Mobile App]
        LMS[Learning Management System]
        PaymentGateway[Payment Gateway]
        EmailProvider[Email Provider]
    end
    
    %% Presentation Layer Contexts
    subgraph "Presentation Layer Contexts"
        WebContext[Web Interface Context<br/>- HTTP Controllers<br/>- REST API endpoints<br/>- Request/Response handling]
        
        APIContext[API Gateway Context<br/>- API versioning<br/>- Rate limiting<br/>- Authentication middleware]
    end
    
    %% Application Layer Contexts
    subgraph "Application Layer Contexts"
        LearningAppCtx[Learning Application Context<br/>- Session management use cases<br/>- Progress tracking<br/>- Score calculation coordination]
        
        ContentAppCtx[Content Application Context<br/>- Quiz management use cases<br/>- Content validation<br/>- Publishing workflows]
        
        UserAppCtx[User Application Context<br/>- User registration<br/>- Profile management<br/>- Permission handling]
    end
    
    %% Domain Layer Contexts  
    subgraph "Domain Layer Contexts"
        LearningDomainCtx[Learning Domain Context<br/>- QuizSession aggregate<br/>- Answer entities<br/>- Score value objects]
        
        ContentDomainCtx[Content Domain Context<br/>- Quiz aggregate<br/>- Question entities<br/>- Content validation services]
        
        UserDomainCtx[User Domain Context<br/>- User aggregate<br/>- Profile entities<br/>- Permission value objects]
    end
    
    %% Infrastructure Layer Contexts
    subgraph "Infrastructure Layer Contexts"
        PersistenceCtx[Persistence Context<br/>- Database repositories<br/>- ORM mappings<br/>- Transaction management]
        
        IntegrationCtx[Integration Context<br/>- External service adapters<br/>- Message queue handlers<br/>- Event publishers]
        
        SecurityCtx[Security Context<br/>- Authentication providers<br/>- Authorization services<br/>- Token management]
    end
    
    %% External to Presentation
    WebBrowser --> WebContext
    MobileApp --> APIContext
    LMS --> APIContext
    
    %% Presentation to Application
    WebContext --> LearningAppCtx
    WebContext --> ContentAppCtx
    APIContext --> UserAppCtx
    
    %% Application to Domain
    LearningAppCtx --> LearningDomainCtx
    ContentAppCtx --> ContentDomainCtx
    UserAppCtx --> UserDomainCtx
    
    %% Domain to Infrastructure
    LearningDomainCtx --> PersistenceCtx
    ContentDomainCtx --> PersistenceCtx
    UserDomainCtx --> SecurityCtx
    
    %% Infrastructure to External
    IntegrationCtx --> PaymentGateway
    IntegrationCtx --> EmailProvider
    SecurityCtx --> LMS
    
    classDef external fill:#e17055,color:#fff
    classDef presentation fill:#fd79a8,color:#fff
    classDef application fill:#fdcb6e,color:#fff
    classDef domain fill:#6c5ce7,color:#fff
    classDef infrastructure fill:#00b894,color:#fff
    
    class WebBrowser,MobileApp,LMS,PaymentGateway,EmailProvider external
    class WebContext,APIContext presentation
    class LearningAppCtx,ContentAppCtx,UserAppCtx application
    class LearningDomainCtx,ContentDomainCtx,UserDomainCtx domain
    class PersistenceCtx,IntegrationCtx,SecurityCtx infrastructure
```

### Context-Layer Responsibility Matrix

| Context | Presentation | Application | Domain | Infrastructure | External Integration |
|---------|--------------|-------------|--------|----------------|---------------------|
| **Learning** | Session UI, Progress display | Session orchestration | QuizSession aggregate | Session persistence | Progress synchronization |
| **Content** | Quiz editor, Content forms | Content workflows | Quiz aggregate | Content storage | Content moderation APIs |
| **User** | Profile UI, Auth forms | User management | User aggregate | User persistence | Identity providers |
| **Security** | Auth middleware | Permission checks | Authorization rules | Token storage | OAuth providers |

### Layer Communication Patterns

| From Layer | To Layer | Communication Pattern | Data Contract | Error Handling | Performance |
|------------|----------|----------------------|---------------|----------------|-------------|
| Presentation → Application | Method invocation | DTO mapping | Commands/Queries | HTTP status codes | <50ms |
| Application → Domain | Direct method calls | Domain objects | Aggregates | Domain exceptions | <10ms |
| Domain → Infrastructure | Interface injection | Repository pattern | Domain contracts | Result objects | <100ms |
| Infrastructure → External | Adapter pattern | External models | API contracts | Circuit breaker | <2000ms |
```

### 4. レイヤー統合状態遷移図

#### 層間状態遷移統合モデル

```markdown
## Layer-Integrated State Transition Model

### Multi-Layer State Coordination

```mermaid
stateDiagram-v2
    state "Presentation Layer States" as PresentationLayer {
        [*] --> FormRendered : User loads page
        FormRendered --> FormSubmitted : User submits
        FormSubmitted --> ResponseReceived : Server responds
        ResponseReceived --> FormRendered : Success/Error display
        ResponseReceived --> [*] : Navigation
    }
    
    state "Application Layer States" as ApplicationLayer {
        [*] --> CommandReceived : HTTP request arrives
        CommandReceived --> CommandValidated : Input validation
        CommandValidated --> DomainOperationStarted : Call domain
        DomainOperationStarted --> DomainOperationCompleted : Domain processing
        DomainOperationCompleted --> ResponseGenerated : Create response
        ResponseGenerated --> [*] : Return to presentation
        
        CommandValidated --> ValidationFailed : Invalid input
        ValidationFailed --> ResponseGenerated : Error response
        
        DomainOperationStarted --> DomainOperationFailed : Domain error
        DomainOperationFailed --> ResponseGenerated : Error response
    }
    
    state "Domain Layer States" as DomainLayer {
        [*] --> AggregateLoaded : Repository access
        AggregateLoaded --> BusinessRuleEvaluated : Apply business logic
        BusinessRuleEvaluated --> StateChanged : Valid operation
        StateChanged --> EventGenerated : Publish domain events
        EventGenerated --> AggregatePersisted : Save changes
        AggregatePersisted --> [*] : Operation complete
        
        BusinessRuleEvaluated --> BusinessRuleViolated : Invalid operation
        BusinessRuleViolated --> [*] : Return error
    }
    
    state "Infrastructure Layer States" as InfrastructureLayer {
        [*] --> ConnectionEstablished : Database/Service connection
        ConnectionEstablished --> DataRetrieved : Query execution
        ConnectionEstablished --> DataPersisted : Save operation
        ConnectionEstablished --> MessageSent : External communication
        
        DataRetrieved --> [*] : Return data
        DataPersisted --> [*] : Confirm save
        MessageSent --> [*] : Confirm delivery
        
        ConnectionEstablished --> ConnectionFailed : Network/Service error
        ConnectionFailed --> [*] : Return error
    }
    
    %% Layer Interactions
    FormSubmitted --> CommandReceived : HTTP Request
    ResponseGenerated --> ResponseReceived : HTTP Response
    
    DomainOperationStarted --> AggregateLoaded : Domain call
    AggregatePersisted --> DomainOperationCompleted : Domain result
    BusinessRuleViolated --> DomainOperationFailed : Domain error
    
    AggregateLoaded --> ConnectionEstablished : Repository call
    DataRetrieved --> AggregateLoaded : Data loaded
    StateChanged --> ConnectionEstablished : Persistence call
    DataPersisted --> AggregatePersisted : Save confirmed
    EventGenerated --> ConnectionEstablished : Event publishing
    MessageSent --> EventGenerated : Event published
```

### Cross-Layer State Dependencies

| Trigger Layer | Target Layer | State Transition | Dependency Type | Rollback Strategy |
|---------------|--------------|------------------|-----------------|-------------------|
| Presentation | Application | Form Submit → Command Process | Synchronous | Display error |
| Application | Domain | Command → Business Operation | Synchronous | Return domain error |
| Domain | Infrastructure | State Change → Persistence | Synchronous | Transaction rollback |
| Infrastructure | External | Data Change → Notification | Asynchronous | Retry + DLQ |

### Error State Propagation

```mermaid
sequenceDiagram
    participant P as Presentation
    participant A as Application  
    participant D as Domain
    participant I as Infrastructure
    
    Note over P,I: Error Propagation Flow
    
    P->>A: Submit Command
    A->>A: Validate Input
    
    alt Input Valid
        A->>D: Execute Business Operation
        D->>D: Check Business Rules
        
        alt Business Rules Valid
            D->>I: Persist Changes
            I->>I: Execute Database Transaction
            
            alt Database Success
                I-->>D: Success
                D-->>A: Operation Complete
                A-->>P: 200 OK + Result
            else Database Error
                I-->>D: Persistence Error
                D-->>A: Infrastructure Error
                A-->>P: 500 Internal Server Error
            end
        else Business Rules Violated
            D-->>A: Domain Error
            A-->>P: 400 Bad Request + Business Error
        end
    else Input Invalid
        A-->>P: 422 Unprocessable Entity + Validation Errors
    end
```

### Layer-Specific State Monitoring

| Layer | State Metrics | Monitoring Tools | Alert Thresholds | Recovery Actions |
|-------|---------------|------------------|------------------|------------------|
| **Presentation** | Response time, Error rate | APM tools | >2s response, >5% errors | Load balancer failover |
| **Application** | Command throughput, Validation errors | Custom metrics | >1000 req/s, >10% validation failures | Circuit breaker activation |
| **Domain** | Business rule violations, Aggregate operations | Domain events | >1% rule violations | Manual review process |
| **Infrastructure** | Database connections, External service calls | Infrastructure monitoring | >80% connection usage, >5s external calls | Scale resources, fallback services |
```

---

## サンプル実装：クイズアプリケーション レイヤード統合

### 1. 4層統合ドメインモデル（クイズアプリ）

```mermaid
graph TB
    %% Presentation Layer
    subgraph "Presentation Layer"
        QuizController[QuizController<br/>+createQuiz(CreateQuizRequest)<br/>+publishQuiz(PublishQuizRequest)<br/>+getQuiz(QuizId)]
        SessionController[SessionController<br/>+startSession(StartSessionRequest)<br/>+submitAnswer(SubmitAnswerRequest)<br/>+getSessionStatus(SessionId)]
        QuizDTO[QuizDTO<br/>+id: string<br/>+title: string<br/>+questions: QuestionDTO[]]
        SessionDTO[SessionDTO<br/>+id: string<br/>+quizId: string<br/>+status: string<br/>+score: number]
    end
    
    %% Application Layer
    subgraph "Application Layer"
        QuizAppService[QuizApplicationService<br/>+createQuiz(CreateQuizCommand)<br/>+publishQuiz(PublishQuizCommand)]
        SessionAppService[SessionApplicationService<br/>+startSession(StartSessionCommand)<br/>+submitAnswer(SubmitAnswerCommand)]
        CreateQuizHandler[CreateQuizCommandHandler<br/>+handle(CreateQuizCommand)]
        StartSessionHandler[StartSessionCommandHandler<br/>+handle(StartSessionCommand)]
    end
    
    %% Domain Layer
    subgraph "Domain Layer"
        Quiz[Quiz Aggregate<br/>+QuizId id<br/>+QuizTitle title<br/>+List~Question~ questions<br/>+publish(): Result]
        QuizSession[QuizSession Aggregate<br/>+SessionId id<br/>+UserId userId<br/>+submitAnswer(): Result]
        ScoreService[ScoreCalculationService<br/>+calculateScore(Session, Quiz): Score]
        QuizRepo[QuizRepository Interface<br/>+save(Quiz)<br/>+findById(QuizId)]
    end
    
    %% Infrastructure Layer
    subgraph "Infrastructure Layer"
        PostgresQuizRepo[PostgresQuizRepository<br/>+save(Quiz)<br/>+findById(QuizId)]
        QuizEntity[QuizEntity (ORM)<br/>+id: UUID<br/>+title: String<br/>+questions: QuestionEntity[]]
        EventPublisher[DomainEventPublisher<br/>+publish(DomainEvent)]
    end
    
    %% Dependencies (Top-Down Only)
    QuizController --> QuizAppService
    SessionController --> SessionAppService
    QuizAppService --> CreateQuizHandler
    SessionAppService --> StartSessionHandler
    CreateQuizHandler --> Quiz
    StartSessionHandler --> QuizSession
    Quiz --> ScoreService
    ScoreService --> QuizRepo
    QuizRepo <|-- PostgresQuizRepo
    PostgresQuizRepo --> QuizEntity
    Quiz --> EventPublisher
```

### 2. レイヤー別集約詳細（Quiz集約）

```mermaid
graph TB
    subgraph "Domain Layer - Quiz Aggregate"
        QuizAR[Quiz Aggregate Root<br/>================================<br/>Domain Responsibility:<br/>- Business rule enforcement<br/>- State consistency<br/>- Invariant protection<br/>================================<br/>+addQuestion(Question): Result<br/>+publish(): Result<br/>+validatePublishability(): boolean]
        
        Question[Question Entity<br/>==================<br/>Domain Responsibility:<br/>- Question validation<br/>- Answer checking<br/>==================<br/>+validateAnswer(Answer): boolean<br/>+calculatePoints(): Points]
        
        QuizTitle[QuizTitle Value Object<br/>==========================<br/>Domain Responsibility:<br/>- Title validation<br/>- Format enforcement<br/>==========================<br/>+validate(): ValidationResult]
    end
    
    subgraph "Application Layer - Quiz Coordination"
        CreateQuizUC[Create Quiz Use Case<br/>===========================<br/>Application Responsibility:<br/>- Transaction coordination<br/>- Cross-aggregate orchestration<br/>- Event publishing<br/>===========================<br/>1. Validate command<br/>2. Create aggregate<br/>3. Save via repository<br/>4. Publish events]
        
        PublishQuizUC[Publish Quiz Use Case<br/>============================<br/>Application Responsibility:<br/>- Business process coordination<br/>- External service integration<br/>- State transition management<br/>============================<br/>1. Load aggregate<br/>2. Validate business rules<br/>3. Update state<br/>4. Notify stakeholders]
    end
    
    subgraph "Infrastructure Layer - Quiz Persistence"
        QuizRepository[PostgresQuizRepository<br/>============================<br/>Infrastructure Responsibility:<br/>- Data persistence<br/>- Query optimization<br/>- Transaction management<br/>============================<br/>+save(Quiz): void<br/>+findById(QuizId): Quiz<br/>+findByCreator(UserId): Quiz[]]
        
        QuizEntity[QuizEntity (JPA/Hibernate)<br/>==============================<br/>Infrastructure Responsibility:<br/>- ORM mapping<br/>- Database schema alignment<br/>- Relationship management<br/>==============================<br/>@Entity, @Table annotations<br/>Bidirectional relationships]
    end
    
    %% Layer Dependencies
    CreateQuizUC --> QuizAR : Creates and manipulates
    PublishQuizUC --> QuizAR : Loads and updates
    QuizAR --> QuizRepository : Interface dependency
    QuizRepository --> QuizEntity : ORM mapping
    
    QuizAR ||--o{ Question : Composition
    QuizAR ||--|| QuizTitle : Value Object
    
    classDef domain fill:#6c5ce7,color:#fff
    classDef application fill:#fdcb6e,color:#fff
    classDef infrastructure fill:#00b894,color:#fff
    
    class QuizAR,Question,QuizTitle domain
    class CreateQuizUC,PublishQuizUC application
    class QuizRepository,QuizEntity infrastructure
```

### 3. レイヤードコンテキストマップ（クイズアプリ）

```mermaid
graph TB
    %% External Systems
    subgraph "External Systems"
        Student[Student Browser]
        Teacher[Teacher Dashboard]
        LMSSystem[LMS Integration]
    end
    
    %% Presentation Layer
    subgraph "Presentation Layer"
        WebAPI[Web API Controllers<br/>- QuizController<br/>- SessionController<br/>- UserController]
        GraphQLAPI[GraphQL API<br/>- Quiz queries<br/>- Session mutations<br/>- Real-time subscriptions]
    end
    
    %% Application Layer
    subgraph "Application Layer"
        LearningApp[Learning Application<br/>- Session management<br/>- Progress tracking<br/>- Score calculation]
        ContentApp[Content Application<br/>- Quiz creation<br/>- Content validation<br/>- Publishing workflow]
        ReportApp[Reporting Application<br/>- Analytics generation<br/>- Performance reports<br/>- Usage statistics]
    end
    
    %% Domain Layer
    subgraph "Domain Layer"
        LearningDomain[Learning Domain<br/>- QuizSession aggregate<br/>- Progress value objects<br/>- Score calculation services]
        ContentDomain[Content Domain<br/>- Quiz aggregate<br/>- Question entities<br/>- Validation services]
        UserDomain[User Domain<br/>- User aggregate<br/>- Profile management<br/>- Permission services]
    end
    
    %% Infrastructure Layer
    subgraph "Infrastructure Layer"
        DatabaseInfra[Database Infrastructure<br/>- PostgreSQL repositories<br/>- Entity mappings<br/>- Transaction management]
        MessagingInfra[Messaging Infrastructure<br/>- Event publishing<br/>- Message queues<br/>- External notifications]
        CacheInfra[Cache Infrastructure<br/>- Redis caching<br/>- Session storage<br/>- Performance optimization]
    end
    
    %% Layer Connections
    Student --> WebAPI
    Teacher --> GraphQLAPI
    LMSSystem --> WebAPI
    
    WebAPI --> LearningApp
    WebAPI --> ContentApp
    GraphQLAPI --> ReportApp
    
    LearningApp --> LearningDomain
    ContentApp --> ContentDomain
    ReportApp --> UserDomain
    
    LearningDomain --> DatabaseInfra
    ContentDomain --> DatabaseInfra
    UserDomain --> MessagingInfra
    LearningDomain --> CacheInfra
    
    classDef external fill:#e17055,color:#fff
    classDef presentation fill:#fd79a8,color:#fff
    classDef application fill:#fdcb6e,color:#fff
    classDef domain fill:#6c5ce7,color:#fff
    classDef infrastructure fill:#00b894,color:#fff
    
    class Student,Teacher,LMSSystem external
    class WebAPI,GraphQLAPI presentation
    class LearningApp,ContentApp,ReportApp application
    class LearningDomain,ContentDomain,UserDomain domain
    class DatabaseInfra,MessagingInfra,CacheInfra infrastructure
```

### 4. 層間状態遷移統合（クイズセッション）

```mermaid
stateDiagram-v2
    %% Presentation Layer States
    state PresentationLayer {
        [*] --> QuizListLoaded
        QuizListLoaded --> QuizSelected : User clicks quiz
        QuizSelected --> SessionFormRendered : Load session form
        SessionFormRendered --> SessionStartRequested : User starts session
        SessionStartRequested --> SessionActiveUI : Session started
        SessionActiveUI --> AnswerFormRendered : Show question
        AnswerFormRendered --> AnswerSubmitted : User submits answer
        AnswerSubmitted --> SessionActiveUI : Next question
        SessionActiveUI --> SessionCompleteUI : Quiz completed
        SessionCompleteUI --> [*] : Navigate away
    }
    
    %% Application Layer States
    state ApplicationLayer {
        [*] --> StartSessionCommandReceived
        StartSessionCommandReceived --> SessionValidationStarted
        SessionValidationStarted --> SessionCreationInitiated : Valid request
        SessionCreationInitiated --> SessionCreated : Domain success
        SessionCreated --> SessionStartedEventPublished
        SessionStartedEventPublished --> [*]
        
        SessionValidationStarted --> ValidationFailed : Invalid request
        ValidationFailed --> [*]
        
        SessionCreationInitiated --> SessionCreationFailed : Domain error
        SessionCreationFailed --> [*]
    }
    
    %% Domain Layer States  
    state DomainLayer {
        [*] --> SessionAggregateCreated
        SessionAggregateCreated --> SessionActive : Start session
        SessionActive --> AnswerProcessing : Submit answer
        AnswerProcessing --> SessionActive : Answer recorded
        SessionActive --> ScoreCalculation : Complete session
        ScoreCalculation --> SessionCompleted : Score calculated
        SessionCompleted --> [*]
        
        AnswerProcessing --> AnswerRejected : Invalid answer
        AnswerRejected --> SessionActive : Return to active
    }
    
    %% Infrastructure Layer States
    state InfrastructureLayer {
        [*] --> DatabaseConnectionEstablished
        DatabaseConnectionEstablished --> SessionEntityCreated : Persist session
        DatabaseConnectionEstablished --> AnswerEntityCreated : Persist answer
        DatabaseConnectionEstablished --> ScoreEntityUpdated : Update score
        
        SessionEntityCreated --> [*]
        AnswerEntityCreated --> [*]
        ScoreEntityUpdated --> [*]
        
        DatabaseConnectionEstablished --> DatabaseError : Connection failed
        DatabaseError --> [*]
    }
    
    %% Cross-Layer Transitions
    SessionStartRequested --> StartSessionCommandReceived : HTTP Request
    SessionCreated --> SessionAggregateCreated : Domain call
    SessionAggregateCreated --> DatabaseConnectionEstablished : Persistence
    SessionEntityCreated --> SessionStartedEventPublished : Success callback
    SessionStartedEventPublished --> SessionActiveUI : HTTP Response
```

---

## フォーマットの特徴

### 利点
- **責任分離**: 各層の役割が明確で保守性が高い
- **実装指針**: レイヤー構造から直接実装アーキテクチャを導出
- **テスト容易性**: 層ごとの独立したテストが可能
- **技術変更耐性**: インフラ層の変更がドメイン層に影響しない
- **チーム分担**: 層ごとに異なるチームが並行開発可能
- **スケーラビリティ**: 層ごとの独立したスケーリングが可能

### 欠点
- **複雑性**: 4層構造により設計・実装が複雑化
- **パフォーマンス**: 層間通信によるオーバーヘッド
- **DTOマッピング**: 層間でのデータ変換コストが高い
- **過度な抽象化**: 小規模システムには過剰な構造
- **学習コスト**: チーム全体での層設計理解が必要

### 適用場面
- **大規模システム**: 複数チームでの並行開発が必要
- **長期保守**: 技術変更への耐性が重要
- **企業システム**: 安定性と保守性を重視
- **レガシー統合**: 既存システムとの統合が必要
- **コンプライアンス**: 監査や規制対応が必要
- **技術多様性**: 異なる技術スタックの統合が必要