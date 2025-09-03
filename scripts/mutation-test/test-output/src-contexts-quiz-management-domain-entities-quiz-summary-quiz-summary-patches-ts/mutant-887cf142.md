# Mutant 887cf142 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 4837
**Stable ID**: 887cf142
**Location**: L117:14–L117:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4837
@@ -113,9 +113,9 @@
   const patches: QuizSummaryPatch[] = [];
 
   if (value == null) {
     patches.push({ tagIds: [] });
-  } else if (Array.isArray(value)) {
+  } else if (true) {
     // 関数型でまとめて補正（TagId形式チェック + trim）
     patches.push(() => {
       const validTagIds = value
         .filter((x: unknown) => typeof x === "string")
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
