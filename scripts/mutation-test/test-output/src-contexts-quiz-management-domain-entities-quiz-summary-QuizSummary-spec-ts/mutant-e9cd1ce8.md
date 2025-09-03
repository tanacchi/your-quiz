# Mutant e9cd1ce8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 3365
**Stable ID**: e9cd1ce8
**Location**: L60:13–L60:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3365
@@ -56,9 +56,9 @@
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
 
         expect(result.success).toBe(isValid);
-        if (isValid && result.success) {
+        if (isValid || result.success) {
           expect(result.data).toBeDefined();
           expect(result.data).toBe(input);
         }
       });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
