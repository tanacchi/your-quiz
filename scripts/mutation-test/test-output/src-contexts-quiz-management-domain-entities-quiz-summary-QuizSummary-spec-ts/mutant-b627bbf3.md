# Mutant b627bbf3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3323
**Stable ID**: b627bbf3
**Location**: L38:40–L41:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3323
@@ -34,12 +34,9 @@
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
 
         expect(result.success).toBe(isValid);
-        if (isValid && result.success) {
-          expect(result.data).toBeDefined();
-          expect(result.data).toBe(input);
-        }
+        if (isValid && result.success) {}
       });
     });
 
     describe("TagId validation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
