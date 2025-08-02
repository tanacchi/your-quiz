# SLO/SLI仕様定義

## 概要

本ドキュメントでは、広告収益最大化KGI/KPIツリーに基づいたService Level Objectives（SLO）およびService Level Indicators（SLI）を定義する。
事業目標達成に必要なサービス品質基準と、その測定指標を具体的に規定する。

## SLO/SLI設計方針

### 広告収益最大化に直結するSLO設定

- **ユーザー体験品質**: 広告表示によるUX悪化防止
- **システム可用性**: 広告機会損失の最小化
- **パフォーマンス**: ユーザー離脱防止・エンゲージメント維持
- **データ品質**: 正確な収益測定・最適化判断の基盤

## SLO/SLI階層構造

### Tier 1: Critical SLO（事業クリティカル）

#### SLO-1: ユーザー獲得・維持に関するサービス品質

| SLI | SLO | 測定期間 | 重要度 | 事業への影響 |
|-----|-----|----------|--------|-------------|
| **サービス可用性率** | 99.5% | 月次 | 最高 | ユーザー離脱・広告機会損失 |
| **アプリ起動成功率** | 99.8% | 日次 | 最高 | 新規ユーザー獲得阻害 |
| **ユーザー登録成功率** | 99.0% | 日次 | 高 | ユーザーベース拡大阻害 |

#### SLO-2: 広告表示・収益化に関するサービス品質

| SLI | SLO | 測定期間 | 重要度 | 事業への影響 |
|-----|-----|----------|--------|-------------|
| **広告表示成功率** | 99.0% | 日次 | 最高 | 直接的収益損失 |
| **広告読み込み時間** | <2秒（95%ile） | 時間 | 最高 | ユーザー体験悪化・離脱 |
| **広告クリック計測精度** | 99.9% | 日次 | 最高 | 収益計算の正確性 |

#### SLO-3: コア機能パフォーマンス

| SLI | SLO | 測定期間 | 重要度 | 事業への影響 |
|-----|-----|----------|--------|-------------|
| **問題表示応答時間** | <100ms（95%ile） | 時間 | 高 | エンゲージメント低下 |
| **回答送信成功率** | 99.5% | 日次 | 高 | 学習体験阻害 |
| **セッション継続率** | >85% | 日次 | 高 | 広告露出機会減少 |

### Tier 2: Important SLO（重要品質）

#### SLO-4: データ品質・分析基盤

| SLI | SLO | 測定期間 | 重要度 | 事業への影響 |
|-----|-----|----------|--------|-------------|
| **分析データ正確性** | 99.0% | 日次 | 高 | 意思決定精度低下 |
| **KPI計算処理時間** | <5分 | 時間 | 中 | リアルタイム最適化阻害 |
| **データ欠損率** | <1% | 日次 | 中 | 分析精度低下 |

#### SLO-5: ユーザー体験品質

| SLI | SLO | 測定期間 | 重要度 | 事業への影響 |
|-----|-----|----------|--------|-------------|
| **アプリクラッシュ率** | <0.1% | 日次 | 高 | ユーザー離脱 |
| **画面表示完了時間** | <1秒（90%ile） | 時間 | 中 | エンゲージメント低下 |
| **オフライン同期成功率** | 95% | 日次 | 中 | 利用機会損失 |

### Tier 3: Monitoring SLO（監視・運用品質）

#### SLO-6: 運用・保守品質

| SLI | SLO | 測定期間 | 重要度 | 事業への影響 |
|-----|-----|----------|--------|-------------|
| **アラート検出時間** | <1分 | 時間 | 中 | 障害対応遅延 |
| **障害復旧時間（MTTR）** | <30分 | 月次 | 中 | 収益機会損失期間 |
| **予防保守成功率** | 95% | 月次 | 低 | 計画外障害リスク |

## 詳細SLI定義・計算方法

### Critical Tier SLI詳細

#### SLI-1.1: サービス可用性率

```typescript
/**
 * サービス可用性率の計算
 * 定義: ユーザーがアプリを正常に利用できた時間の割合
 */
interface AvailabilitySLI {
  measurement: 'uptime_percentage';
  calculation: '(uptime_seconds / total_seconds) * 100';
  errorBudget: '0.5%'; // 99.5% SLO
  measurementWindow: '30days';
}

function calculateAvailability(
  uptimeSeconds: number,
  totalSeconds: number
): number {
  return (uptimeSeconds / totalSeconds) * 100;
}

// 計測対象
const AVAILABILITY_ENDPOINTS = [
  '/api/quiz/list',      // クイズ一覧
  '/api/quiz/answer',    // 回答送信
  '/api/user/progress',  // 進捗取得
  '/api/ads/display'     // 広告表示
];
```

#### SLI-1.2: アプリ起動成功率

```typescript
/**
 * アプリ起動成功率の計算
 * 定義: アプリ起動試行に対する成功の割合
 */
interface AppLaunchSLI {
  measurement: 'launch_success_rate';
  calculation: '(successful_launches / total_launch_attempts) * 100';
  errorBudget: '0.2%'; // 99.8% SLO
  measurementWindow: '24hours';
}

function calculateLaunchSuccessRate(
  successfulLaunches: number,
  totalLaunchAttempts: number
): number {
  if (totalLaunchAttempts === 0) return 100; // No attempts = 100%
  return (successfulLaunches / totalLaunchAttempts) * 100;
}

// 成功定義
const LAUNCH_SUCCESS_CRITERIA = {
  maxStartupTime: 3000,     // 3秒以内
  initialAPIResponseOK: true, // 初回API成功
  criticalResourcesLoaded: true // 必須リソース読み込み完了
};
```

#### SLI-2.1: 広告表示成功率

```typescript
/**
 * 広告表示成功率の計算
 * 定義: 広告表示要求に対する成功表示の割合
 */
interface AdDisplaySLI {
  measurement: 'ad_display_success_rate';
  calculation: '(successful_ad_displays / total_ad_requests) * 100';
  errorBudget: '1.0%'; // 99.0% SLO
  measurementWindow: '24hours';
}

function calculateAdDisplaySuccessRate(
  successfulDisplays: number,
  totalRequests: number
): number {
  if (totalRequests === 0) return 100;
  return (successfulDisplays / totalRequests) * 100;
}

// 成功定義
const AD_DISPLAY_SUCCESS_CRITERIA = {
  adContentLoaded: true,    // 広告コンテンツ読み込み完了
  displayTime: '>1000ms',   // 1秒以上表示
  viewabilityMet: true,     // 可視性基準満たす
  errorOccurred: false      // エラー未発生
};
```

#### SLI-2.2: 広告読み込み時間

```typescript
/**
 * 広告読み込み時間の計算
 * 定義: 広告表示要求から画面表示完了までの時間
 */
interface AdLoadTimeSLI {
  measurement: 'ad_load_time_95percentile';
  calculation: 'percentile(ad_load_times, 95)';
  errorBudget: '2000ms'; // 2秒SLO
  measurementWindow: '1hour';
}

function calculateAdLoadTime95Percentile(
  loadTimes: number[]
): number {
  const sorted = loadTimes.sort((a, b) => a - b);
  const index = Math.ceil(sorted.length * 0.95) - 1;
  return sorted[index] || 0;
}

// 測定ポイント
const AD_LOAD_MEASUREMENT_POINTS = {
  start: 'ad_request_initiated',
  end: 'ad_fully_rendered',
  exclusions: ['network_timeout', 'user_navigation']
};
```

#### SLI-3.1: 問題表示応答時間

```typescript
/**
 * 問題表示応答時間の計算
 * 定義: 問題表示要求からレンダリング完了までの時間
 */
interface QuizResponseTimeSLI {
  measurement: 'quiz_response_time_95percentile';
  calculation: 'percentile(response_times, 95)';
  errorBudget: '100ms'; // 100ms SLO
  measurementWindow: '1hour';
}

function calculateQuizResponseTime95Percentile(
  responseTimes: number[]
): number {
  const sorted = responseTimes.sort((a, b) => a - b);
  const index = Math.ceil(sorted.length * 0.95) - 1;
  return sorted[index] || 0;
}

// API別応答時間基準
const QUIZ_API_SLO_TARGETS = {
  '/api/quiz/random': 50,    // ランダム問題取得
  '/api/quiz/category': 100, // カテゴリ別問題取得
  '/api/quiz/review': 80,    // 復習問題取得
  '/api/quiz/progress': 30   // 進捗更新
};
```

## Important Tier SLI詳細

#### SLI-4.1: 分析データ正確性

```typescript
/**
 * 分析データ正確性の計算
 * 定義: 収集データと実際の値の一致率
 */
interface DataAccuracySLI {
  measurement: 'data_accuracy_rate';
  calculation: '(accurate_records / total_records) * 100';
  errorBudget: '1.0%'; // 99.0% SLO
  measurementWindow: '24hours';
}

function calculateDataAccuracyRate(
  accurateRecords: number,
  totalRecords: number
): number {
  if (totalRecords === 0) return 100;
  return (accurateRecords / totalRecords) * 100;
}

// 正確性検証項目
const DATA_ACCURACY_CHECKS = {
  kpi_calculations: 'KPI計算結果の妥当性',
  user_activity_logs: 'ユーザー行動ログの完整性',
  ad_revenue_tracking: '広告収益計測の正確性',
  conversion_attribution: '転換属性の正確性'
};
```

#### SLI-4.2: KPI計算処理時間

```typescript
/**
 * KPI計算処理時間の計算
 * 定義: KPI更新バッチ処理の完了時間
 */
interface KPIProcessingTimeSLI {
  measurement: 'kpi_processing_time_max';
  calculation: 'max(processing_times_per_batch)';
  errorBudget: '300000ms'; // 5分SLO
  measurementWindow: '1hour';
}

function calculateKPIProcessingTime(
  batchStartTime: Date,
  batchEndTime: Date
): number {
  return batchEndTime.getTime() - batchStartTime.getTime();
}

// 処理時間制限（KPI別）
const KPI_PROCESSING_TIME_LIMITS = {
  user_metrics: 60000,      // 1分
  ad_metrics: 120000,       // 2分
  engagement_metrics: 180000, // 3分
  revenue_metrics: 300000   // 5分
};
```

## SLO違反時の対応プロシージャ

### Tier 1 Critical SLO違反対応

#### 即座対応（5分以内）

```typescript
interface CriticalSLOViolationResponse {
  detectionTime: Date;
  notificationChannels: ['slack-critical', 'pagerduty', 'email-emergency'];
  autoActions: [
    'traffic_throttling',      // トラフィック制限
    'fallback_activation',     // フォールバック起動
    'cache_warming'            // キャッシュ事前読み込み
  ];
  escalationThreshold: '15minutes';
}

// 自動復旧処理
const CRITICAL_AUTO_RECOVERY = {
  service_unavailable: 'activate_backup_servers',
  ad_display_failure: 'switch_to_backup_ad_network',
  api_timeout: 'enable_circuit_breaker'
};
```

#### 根本原因分析（24時間以内）

```typescript
interface RootCauseAnalysis {
  timeline: 'detailed_incident_timeline';
  impactAssessment: {
    userImpact: 'affected_user_count',
    revenueImpact: 'lost_ad_revenue_estimate',
    brandImpact: 'user_satisfaction_survey'
  };
  preventiveMeasures: [
    'infrastructure_improvements',
    'monitoring_enhancements',
    'process_improvements'
  ];
}
```

### Tier 2 Important SLO違反対応

#### 監視強化（1時間以内）

- 関連指標の監視頻度増加
- 追加ログ・メトリクス収集開始
- 担当チームへの通知

#### 改善計画策定（1週間以内）

- 原因分析・改善施策の策定
- 実装スケジュール・責任者決定
- SLO見直しの必要性検討

## エラーバジェット管理

### エラーバジェット消費率監視

```typescript
interface ErrorBudgetManagement {
  budgetCalculation: '(1 - SLO_target) * measurement_window';
  consumptionTracking: 'real_time_violation_accumulation';
  alertThresholds: {
    warning: '50%',    // バジェット50%消費で警告
    critical: '80%',   // バジェット80%消費で緊急対応
    exhausted: '100%'  // バジェット枯渇で機能停止検討
  };
}

// 月次エラーバジェット例（99.5% SLO）
const MONTHLY_ERROR_BUDGET = {
  totalMinutes: 43200,      // 30日 × 24時間 × 60分
  allowedDowntime: 216,     // 0.5% = 216分
  warningThreshold: 108,    // 50% = 108分
  criticalThreshold: 173    // 80% = 173分
};
```

### バジェット枯渇時のポリシー

```typescript
interface BudgetExhaustionPolicy {
  immediate_actions: [
    'feature_degradation',     // 非必須機能の一時停止
    'traffic_shaping',         // 負荷制限
    'emergency_maintenance'    // 緊急メンテナンス実施
  ];
  
  recovery_plan: {
    short_term: 'service_stabilization',
    medium_term: 'infrastructure_scaling',
    long_term: 'architecture_improvement'
  };
  
  slo_adjustment: 'consider_slo_relaxation_if_pattern_recurring';
}
```

## 監視・アラート設定

### リアルタイム監視ダッシュボード

```typescript
interface MonitoringDashboard {
  tier1_slos: {
    refreshInterval: '10seconds',
    alertDelay: '30seconds',
    visualizations: ['time_series', 'gauge', 'status_indicator']
  };
  
  tier2_slos: {
    refreshInterval: '1minute',
    alertDelay: '5minutes',
    visualizations: ['time_series', 'histogram']
  };
  
  error_budget: {
    refreshInterval: '1minute',
    displays: ['consumption_rate', 'remaining_budget', 'projection']
  };
}
```

### アラート閾値・通知設定

| SLO Tier | 警告閾値 | 緊急閾値 | 通知チャネル | エスカレーション |
|----------|----------|----------|-------------|----------------|
| **Tier 1** | SLO × 0.98 | SLO × 0.95 | Slack + PagerDuty | 5分後にマネージャー |
| **Tier 2** | SLO × 0.95 | SLO × 0.90 | Slack + Email | 30分後にチームリード |
| **Tier 3** | SLO × 0.90 | SLO × 0.80 | Email | 2時間後にチームリード |

## 継続的改善・見直し

### SLO見直しサイクル

```typescript
interface SLOReviewCycle {
  monthly_review: {
    sli_accuracy_validation: '測定精度の検証',
    slo_target_appropriateness: 'SLO目標値の妥当性',
    business_alignment: '事業目標との整合性'
  };
  
  quarterly_review: {
    comprehensive_analysis: '包括的パフォーマンス分析',
    slo_restructuring: 'SLO構造の見直し',
    new_sli_introduction: '新規SLI導入検討'
  };
  
  annual_review: {
    strategic_alignment: '戦略的方向性との整合',
    industry_benchmarking: '業界ベンチマーク比較',
    technology_evolution: '技術進化への対応'
  };
}
```

### 改善施策の効果測定

```typescript
interface ImprovementTracking {
  before_after_analysis: 'SLO改善施策の前後比較';
  statistical_significance: '統計的有意性の検証';
  business_impact_correlation: '事業指標への影響相関';
  cost_benefit_analysis: 'コスト対効果分析';
}
```

---

**作成日**: 2025-01-31  
**作成者**: System  
**更新日**: 2025-01-31