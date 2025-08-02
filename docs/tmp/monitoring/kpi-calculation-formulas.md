# KPI計算式・測定方法定義

## 概要

本ドキュメントでは、KGI/KPIツリー構造で定義された各指標の具体的な計算式と測定方法を定義する。
実装可能性・測定精度・計算効率を考慮した実用的な計算手法を提示する。

## 基本データ定義

### 基本エンティティ

```typescript
// ユーザー情報
interface User {
  id: string;
  createdAt: Date;
  lastActiveAt: Date;
}

// 問題情報
interface Question {
  id: string;
  content: string;
  correctAnswer: boolean;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

// 回答履歴
interface Answer {
  id: string;
  userId: string;
  questionId: string;
  userAnswer: boolean;
  isCorrect: boolean;
  answeredAt: Date;
  sessionId: string;
}

// セッション情報
interface Session {
  id: string;
  userId: string;
  startAt: Date;
  endAt: Date | null;
  questionIds: string[];
  isCompleted: boolean;
}
```

### 時間窓定義

```typescript
const TIME_WINDOWS = {
  IMMEDIATE: 24 * 60 * 60 * 1000,      // 24時間
  SHORT_TERM: 7 * 24 * 60 * 60 * 1000, // 1週間  
  MEDIUM_TERM: 30 * 24 * 60 * 60 * 1000, // 1ヶ月
  LONG_TERM: 90 * 24 * 60 * 60 * 1000   // 3ヶ月
} as const;
```

## KGI計算式

### KGI-1: 学習効果向上（Learning Effectiveness）

```typescript
/**
 * 学習効果向上総合指標
 * 各KPIの重み付き平均として算出
 */
function calculateLearningEffectiveness(
  retryAccuracy: number,      // KPI-1.1 復習正答率
  progressRate: number,       // KPI-1.2 個人学習進捗率  
  weaknessImprovement: number,// KPI-1.3 弱点分野改善率
  continuityDays: number      // KPI-1.4 学習継続日数
): number {
  const weights = {
    retryAccuracy: 0.4,       // 最重要: 実際の学習成果
    progressRate: 0.25,       // 学習範囲の拡大
    weaknessImprovement: 0.25,// 弱点克服能力
    continuityDays: 0.1       // 継続性（他KPIで測定重複のため低ウェイト）
  };
  
  return (
    retryAccuracy * weights.retryAccuracy +
    progressRate * weights.progressRate +
    weaknessImprovement * weights.weaknessImprovement +
    continuityDays * weights.continuityDays
  );
}
```

### KGI-2: 問題解答数最大化（Answer Volume Maximization）

```typescript
/**
 * 問題解答数最大化指標
 * 対数スケールで成長率を評価
 */
function calculateAnswerVolumeMaximization(
  totalAnswers: number,           // KPI-2.1 総回答数
  answersPerUser: number,         // KPI-2.2 ユーザー当たり回答数
  newQuestionDiscoveryRate: number,// KPI-2.3 新規問題発見率
  completionRate: number          // KPI-2.4 問題完了率
): number {
  // 対数成長モデルを適用（持続可能な成長を評価）
  const logBase = Math.log(10);
  const volumeScore = Math.log(totalAnswers + 1) / logBase; // +1 for log(0) protection
  
  const qualityMultiplier = (
    answersPerUser * 0.3 +
    newQuestionDiscoveryRate * 0.3 +
    completionRate * 0.4
  );
  
  return volumeScore * qualityMultiplier;
}
```

### KGI-3: ユーザー継続率向上（User Retention）

```typescript
/**
 * ユーザー継続率向上指標
 * 複数時間軸での継続性を統合評価
 */
function calculateUserRetention(
  stickinessRatio: number,        // KPI-3.1 DAU/MAU比率
  sessionContinuityRate: number,  // KPI-3.2 セッション継続率
  reEngagementRate: number,       // KPI-3.3 復帰率
  featureEngagementDepth: number  // KPI-3.4 機能利用深度
): number {
  const weights = {
    stickiness: 0.35,             // 日常的利用度
    sessionContinuity: 0.25,      // セッション品質
    reEngagement: 0.25,           // 復帰力
    featureDepth: 0.15            // 利用深度
  };
  
  return (
    stickinessRatio * weights.stickiness +
    sessionContinuityRate * weights.sessionContinuity +
    reEngagementRate * weights.reEngagement +
    featureEngagementDepth * weights.featureDepth
  );
}
```

## KPI Level 1 計算式

### KPI-1.1: 復習正答率（リベンジ成功率）

```typescript
/**
 * 復習正答率計算
 * 過去に間違えた問題への再挑戦での正答率
 */
function calculateRetryAccuracyRate(
  userId: string,
  timeWindow: number = TIME_WINDOWS.MEDIUM_TERM
): number {
  const query = `
    WITH incorrect_answers AS (
      SELECT DISTINCT question_id, answered_at as first_incorrect_at
      FROM answers 
      WHERE user_id = ? 
        AND is_correct = false
        AND answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
    ),
    retry_attempts AS (
      SELECT 
        a.question_id,
        a.is_correct,
        a.answered_at
      FROM answers a
      INNER JOIN incorrect_answers ia ON a.question_id = ia.question_id
      WHERE a.user_id = ?
        AND a.answered_at > ia.first_incorrect_at
        AND a.answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
    )
    SELECT 
      COUNT(CASE WHEN is_correct = true THEN 1 END) as correct_retries,
      COUNT(*) as total_retries
    FROM retry_attempts
  `;
  
  const result = executeQuery(query, [userId, timeWindow/86400000, userId, timeWindow/86400000]);
  
  if (result.total_retries === 0) return 0;
  return result.correct_retries / result.total_retries;
}
```

### KPI-1.2: 個人学習進捗率

```typescript
/**
 * 個人学習進捗率計算
 * 利用可能問題に対する挑戦済み問題の割合
 */
function calculatePersonalProgressRate(userId: string): number {
  const totalQuestionsQuery = `
    SELECT COUNT(*) as total
    FROM questions 
    WHERE is_approved = true
  `;
  
  const attemptedQuestionsQuery = `
    SELECT COUNT(DISTINCT question_id) as attempted
    FROM answers
    WHERE user_id = ?
  `;
  
  const totalQuestions = executeQuery(totalQuestionsQuery).total;
  const attemptedQuestions = executeQuery(attemptedQuestionsQuery, [userId]).attempted;
  
  if (totalQuestions === 0) return 0;
  return attemptedQuestions / totalQuestions;
}
```

### KPI-1.3: 弱点分野改善率

```typescript
/**
 * 弱点分野改善率計算
 * 最も苦手な分野での正答率向上を測定
 */
function calculateWeaknessImprovementRate(
  userId: string,
  timeWindow: number = TIME_WINDOWS.MEDIUM_TERM
): number {
  const query = `
    WITH category_performance AS (
      SELECT 
        q.category,
        COUNT(CASE WHEN a.is_correct = true THEN 1 END) as correct_answers,
        COUNT(*) as total_answers,
        AVG(CASE WHEN a.is_correct THEN 1.0 ELSE 0.0 END) as accuracy_rate
      FROM answers a
      INNER JOIN questions q ON a.question_id = q.id
      WHERE a.user_id = ?
        AND a.answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY q.category
      HAVING total_answers >= 5  -- 最小サンプル数
    ),
    weakest_category AS (
      SELECT category, accuracy_rate
      FROM category_performance
      ORDER BY accuracy_rate ASC
      LIMIT 1
    ),
    improvement_trend AS (
      SELECT 
        DATE(a.answered_at) as answer_date,
        AVG(CASE WHEN a.is_correct THEN 1.0 ELSE 0.0 END) as daily_accuracy
      FROM answers a
      INNER JOIN questions q ON a.question_id = q.id
      INNER JOIN weakest_category wc ON q.category = wc.category
      WHERE a.user_id = ?
        AND a.answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY DATE(a.answered_at)
      ORDER BY answer_date
    )
    SELECT 
      COALESCE(
        (
          SELECT 
            (MAX(daily_accuracy) - MIN(daily_accuracy)) / 
            GREATEST(MIN(daily_accuracy), 0.01)  -- ゼロ除算防止
          FROM improvement_trend
        ), 
        0
      ) as improvement_rate
  `;
  
  const result = executeQuery(query, [userId, timeWindow/86400000, userId, timeWindow/86400000]);
  return Math.max(0, Math.min(1, result.improvement_rate)); // 0-1の範囲に正規化
}
```

### KPI-1.4: 学習継続日数

```typescript
/**
 * 学習継続日数計算
 * 現在から遡って連続して学習した日数
 */
function calculateLearningContinuityDays(userId: string): number {
  const query = `
    WITH daily_activity AS (
      SELECT DISTINCT DATE(answered_at) as activity_date
      FROM answers
      WHERE user_id = ?
        AND answered_at >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)  -- 過去1年間
      ORDER BY activity_date DESC
    ),
    continuity_check AS (
      SELECT 
        activity_date,
        ROW_NUMBER() OVER (ORDER BY activity_date DESC) as row_num,
        DATE_SUB(activity_date, INTERVAL ROW_NUMBER() OVER (ORDER BY activity_date DESC) - 1 DAY) as continuity_group
      FROM daily_activity
    )
    SELECT COUNT(*) as continuous_days
    FROM continuity_check
    WHERE continuity_group = (
      SELECT continuity_group 
      FROM continuity_check 
      WHERE activity_date = CURDATE() 
         OR activity_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      LIMIT 1
    )
  `;
  
  const result = executeQuery(query, [userId]);
  return result.continuous_days || 0;
}
```

### KPI-2.1: 総回答数

```typescript
/**
 * 総回答数計算（期間別）
 */
function calculateTotalAnswers(
  timeWindow: number = TIME_WINDOWS.SHORT_TERM
): number {
  const query = `
    SELECT COUNT(*) as total_answers
    FROM answers
    WHERE answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
  `;
  
  const result = executeQuery(query, [timeWindow/86400000]);
  return result.total_answers;
}
```

### KPI-2.2: ユーザー当たり回答数

```typescript
/**
 * ユーザー当たり回答数計算
 */
function calculateAnswersPerUser(
  timeWindow: number = TIME_WINDOWS.SHORT_TERM
): number {
  const query = `
    SELECT 
      COUNT(*) as total_answers,
      COUNT(DISTINCT user_id) as active_users
    FROM answers
    WHERE answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
  `;
  
  const result = executeQuery(query, [timeWindow/86400000]);
  
  if (result.active_users === 0) return 0;
  return result.total_answers / result.active_users;
}
```

### KPI-2.3: 新規問題発見率

```typescript
/**
 * 新規問題発見率計算
 * ユーザーが未回答の問題に遭遇する割合
 */
function calculateNewQuestionDiscoveryRate(
  timeWindow: number = TIME_WINDOWS.SHORT_TERM
): number {
  const query = `
    WITH user_question_combinations AS (
      SELECT DISTINCT 
        u.id as user_id,
        q.id as question_id
      FROM users u
      CROSS JOIN questions q
      WHERE u.last_active_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
        AND q.is_approved = true
    ),
    answered_combinations AS (
      SELECT DISTINCT user_id, question_id
      FROM answers
      WHERE answered_at < DATE_SUB(NOW(), INTERVAL ? DAY)
    ),
    new_discoveries AS (
      SELECT DISTINCT a.user_id, a.question_id
      FROM answers a
      LEFT JOIN answered_combinations ac 
        ON a.user_id = ac.user_id AND a.question_id = ac.question_id
      WHERE a.answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
        AND ac.question_id IS NULL  -- 初回回答
    )
    SELECT 
      COUNT(nd.question_id) as new_discoveries,
      COUNT(a.question_id) as total_answers
    FROM answers a
    LEFT JOIN new_discoveries nd 
      ON a.user_id = nd.user_id AND a.question_id = nd.question_id
    WHERE a.answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
  `;
  
  const result = executeQuery(query, [timeWindow/86400000, timeWindow/86400000, timeWindow/86400000, timeWindow/86400000]);
  
  if (result.total_answers === 0) return 0;
  return result.new_discoveries / result.total_answers;
}
```

### KPI-2.4: 問題完了率

```typescript
/**
 * 問題完了率計算
 * セッション内で開始した問題の完了割合
 */
function calculateQuestionCompletionRate(
  timeWindow: number = TIME_WINDOWS.SHORT_TERM
): number {
  const query = `
    SELECT 
      COUNT(CASE WHEN s.is_completed = true THEN 1 END) as completed_sessions,
      COUNT(*) as total_sessions
    FROM sessions s
    WHERE s.start_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      AND ARRAY_LENGTH(s.question_ids) > 0  -- 問題が含まれるセッション
  `;
  
  const result = executeQuery(query, [timeWindow/86400000]);
  
  if (result.total_sessions === 0) return 0;
  return result.completed_sessions / result.total_sessions;
}
```

### KPI-3.1: DAU/MAU比率（Stickiness）

```typescript
/**
 * DAU/MAU比率計算
 * 月間アクティブユーザーの日次利用度
 */
function calculateStickinessRatio(): number {
  const query = `
    WITH daily_active_users AS (
      SELECT COUNT(DISTINCT user_id) as dau
      FROM answers
      WHERE DATE(answered_at) = CURDATE()
    ),
    monthly_active_users AS (
      SELECT COUNT(DISTINCT user_id) as mau
      FROM answers
      WHERE answered_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    )
    SELECT 
      dau.dau,
      mau.mau,
      CASE 
        WHEN mau.mau > 0 THEN dau.dau / mau.mau 
        ELSE 0 
      END as stickiness_ratio
    FROM daily_active_users dau, monthly_active_users mau
  `;
  
  const result = executeQuery(query);
  return result.stickiness_ratio;
}
```

### KPI-3.2: セッション継続率

```typescript
/**
 * セッション継続率計算
 * 一定時間以上継続したセッションの割合
 */
function calculateSessionContinuityRate(
  minimumDuration: number = 5 * 60 * 1000, // 5分
  timeWindow: number = TIME_WINDOWS.SHORT_TERM
): number {
  const query = `
    SELECT 
      COUNT(CASE 
        WHEN TIMESTAMPDIFF(SECOND, start_at, COALESCE(end_at, NOW())) >= ? 
        THEN 1 
      END) as long_sessions,
      COUNT(*) as total_sessions
    FROM sessions
    WHERE start_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
  `;
  
  const result = executeQuery(query, [minimumDuration/1000, timeWindow/86400000]);
  
  if (result.total_sessions === 0) return 0;
  return result.long_sessions / result.total_sessions;
}
```

### KPI-3.3: 復帰率（Re-engagement）

```typescript
/**
 * 復帰率計算
 * 一定期間離脱後に復帰したユーザーの割合
 */
function calculateReEngagementRate(
  inactivePeriod: number = 7 * 24 * 60 * 60 * 1000, // 1週間
  observationWindow: number = TIME_WINDOWS.MEDIUM_TERM
): number {
  const query = `
    WITH user_activity_gaps AS (
      SELECT 
        user_id,
        answered_at,
        LAG(answered_at) OVER (PARTITION BY user_id ORDER BY answered_at) as prev_activity,
        TIMESTAMPDIFF(SECOND, 
          LAG(answered_at) OVER (PARTITION BY user_id ORDER BY answered_at), 
          answered_at
        ) as gap_seconds
      FROM answers
      WHERE answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
    ),
    re_engagements AS (
      SELECT DISTINCT user_id
      FROM user_activity_gaps
      WHERE gap_seconds >= ?  -- 指定期間以上の離脱後復帰
    ),
    total_inactive_users AS (
      SELECT COUNT(DISTINCT user_id) as inactive_count
      FROM (
        SELECT user_id
        FROM user_activity_gaps
        WHERE gap_seconds >= ?
      ) t
    )
    SELECT 
      COUNT(re.user_id) as re_engaged_users,
      tiu.inactive_count as total_inactive_users
    FROM re_engagements re, total_inactive_users tiu
  `;
  
  const result = executeQuery(query, [
    observationWindow/86400000, 
    inactivePeriod/1000, 
    inactivePeriod/1000
  ]);
  
  if (result.total_inactive_users === 0) return 0;
  return result.re_engaged_users / result.total_inactive_users;
}
```

### KPI-3.4: 機能利用深度

```typescript
/**
 * 機能利用深度計算
 * 利用可能機能に対する実際の利用機能数の割合
 */
function calculateFeatureEngagementDepth(
  userId: string,
  timeWindow: number = TIME_WINDOWS.MEDIUM_TERM
): number {
  // 利用可能機能の定義
  const AVAILABLE_FEATURES = [
    'quiz_answering',
    'answer_history_view',
    'retry_questions',
    'category_filtering',
    'progress_tracking',
    'offline_sync'
  ];
  
  const query = `
    WITH feature_usage AS (
      SELECT 
        'quiz_answering' as feature,
        CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END as is_used
      FROM answers
      WHERE user_id = ? AND answered_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      
      UNION ALL
      
      SELECT 
        'answer_history_view' as feature,
        CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END as is_used
      FROM user_actions
      WHERE user_id = ? 
        AND action_type = 'view_history'
        AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      
      -- 他の機能利用状況も同様に追加...
    )
    SELECT SUM(is_used) as used_features_count
    FROM feature_usage
  `;
  
  const result = executeQuery(query, [userId, timeWindow/86400000, userId, timeWindow/86400000]);
  
  return result.used_features_count / AVAILABLE_FEATURES.length;
}
```

## Sub-KPI計算式（抜粋）

### Sub-KPI-1.1.1: 即時復習正答率（24時間以内）

```typescript
function calculateImmediateRetryAccuracy(userId: string): number {
  return calculateRetryAccuracyRate(userId, TIME_WINDOWS.IMMEDIATE);
}
```

### Sub-KPI-2.1.1: 日次総回答数

```typescript
function calculateDailyTotalAnswers(): number {
  const query = `
    SELECT COUNT(*) as daily_answers
    FROM answers
    WHERE DATE(answered_at) = CURDATE()
  `;
  
  const result = executeQuery(query);
  return result.daily_answers;
}
```

## 計算効率最適化

### インデックス設計

```sql
-- 回答履歴テーブルのインデックス
CREATE INDEX idx_answers_user_time ON answers(user_id, answered_at);
CREATE INDEX idx_answers_question_time ON answers(question_id, answered_at);
CREATE INDEX idx_answers_session ON answers(session_id);

-- セッションテーブルのインデックス  
CREATE INDEX idx_sessions_user_time ON sessions(user_id, start_at);
CREATE INDEX idx_sessions_completed ON sessions(is_completed, start_at);

-- 問題テーブルのインデックス
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_approved ON questions(is_approved);
```

### キャッシュ戦略

```typescript
interface MetricsCache {
  // 高頻度アクセス指標のキャッシュ（1時間有効）
  dailyMetrics: Map<string, { value: number; cachedAt: Date }>;
  
  // ユーザー個別指標のキャッシュ（30分有効）  
  userMetrics: Map<string, Map<string, { value: number; cachedAt: Date }>>;
  
  // 集計指標のキャッシュ（24時間有効）
  aggregateMetrics: Map<string, { value: number; cachedAt: Date }>;
}

const CACHE_DURATIONS = {
  DAILY_METRICS: 60 * 60 * 1000,      // 1時間
  USER_METRICS: 30 * 60 * 1000,       // 30分
  AGGREGATE_METRICS: 24 * 60 * 60 * 1000 // 24時間
};
```

### バッチ計算スケジュール

```typescript
const CALCULATION_SCHEDULE = {
  // リアルタイム計算（API応答時）
  REALTIME: [
    'daily_total_answers',
    'session_continuity_rate',
    'current_active_users'
  ],
  
  // 1時間毎計算
  HOURLY: [
    'answers_per_user',
    'question_completion_rate',
    'stickiness_ratio'
  ],
  
  // 日次計算  
  DAILY: [
    'retry_accuracy_rate',
    'personal_progress_rate',
    'weakness_improvement_rate',
    're_engagement_rate'
  ],
  
  // 週次計算
  WEEKLY: [
    'learning_continuity_days',
    'new_question_discovery_rate',
    'feature_engagement_depth'
  ]
};
```

## データ品質保証

### 異常値検出

```typescript
/**
 * 指標値の異常検出
 */
function detectAnomalies(metricValue: number, metricName: string): boolean {
  const NORMAL_RANGES = {
    retry_accuracy_rate: { min: 0, max: 1 },
    stickiness_ratio: { min: 0, max: 1 },
    session_continuity_rate: { min: 0, max: 1 },
    answers_per_user: { min: 0, max: 1000 }, // 想定最大値
  };
  
  const range = NORMAL_RANGES[metricName];
  if (!range) return false;
  
  return metricValue < range.min || metricValue > range.max;
}
```

### 欠損データ対応

```typescript
/**
 * 欠損データの補完戦略
 */
function handleMissingData(metricValue: number | null, metricName: string): number {
  if (metricValue !== null) return metricValue;
  
  // デフォルト値戦略
  const DEFAULT_VALUES = {
    retry_accuracy_rate: 0,    // 保守的見積もり
    stickiness_ratio: 0,       // 未利用として扱う
    session_continuity_rate: 0, // 継続なしとして扱う
    answers_per_user: 0        // 未回答として扱う
  };
  
  return DEFAULT_VALUES[metricName] || 0;
}
```

---

**作成日**: 2025-01-31  
**作成者**: System  
**更新日**: 2025-01-31