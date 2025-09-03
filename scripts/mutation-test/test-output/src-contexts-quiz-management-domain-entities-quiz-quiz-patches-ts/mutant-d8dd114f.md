# Mutant d8dd114f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: LogicalOperator
**Original ID**: 2687
**Stable ID**: d8dd114f
**Location**: L141:14–L141:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2687
@@ -137,9 +137,9 @@
         id: `solution-${Date.now()}`,
         value: false,
       },
     });
-  } else if (typeof value === "object" && value !== null) {
+  } else if (typeof value === "object" || value !== null) {
     // BooleanSolutionスキーマに合わない場合の修正
     const solutionParsed = BooleanSolutionSchema.safeParse(value);
     if (!solutionParsed.success) {
       // 型安全なプロパティアクセスのため、unknown経由でキャスト
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
