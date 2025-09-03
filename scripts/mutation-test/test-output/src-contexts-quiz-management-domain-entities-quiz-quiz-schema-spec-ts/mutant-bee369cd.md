# Mutant bee369cd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3242
**Stable ID**: bee369cd
**Location**: L476:8–L476:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3242
@@ -472,9 +472,9 @@
         expect(result.data.solution.value).toBe(false);
       }
     });
 
-    it("should handle rejected quiz with explanation", () => {
+    it("", () => {
       const rejectedQuiz = {
         ...validQuizData,
         status: "rejected" as const,
         explanation: "This quiz was rejected due to unclear wording.",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
