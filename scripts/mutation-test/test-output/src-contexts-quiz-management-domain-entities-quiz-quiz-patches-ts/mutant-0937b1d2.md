# Mutant 0937b1d2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2691
**Stable ID**: 0937b1d2
**Location**: L141:43–L141:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2691
@@ -137,9 +137,9 @@
         id: `solution-${Date.now()}`,
         value: false,
       },
     });
-  } else if (typeof value === "object" && value !== null) {
+  } else if (typeof value === "object" && true) {
     // BooleanSolutionスキーマに合わない場合の修正
     const solutionParsed = BooleanSolutionSchema.safeParse(value);
     if (!solutionParsed.success) {
       // 型安全なプロパティアクセスのため、unknown経由でキャスト
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
