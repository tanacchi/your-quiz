# Mutant 090efae4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3240
**Stable ID**: 090efae4
**Location**: L469:27–L473:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3240
@@ -465,13 +465,9 @@
 
       const result = QuizSchema.safeParse(minimalQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.explanation).toBeUndefined();
-        expect(result.data.approvedAt).toBeUndefined();
-        expect(result.data.solution.value).toBe(false);
-      }
+      if (result.success) {}
     });
 
     it("should handle rejected quiz with explanation", () => {
       const rejectedQuiz = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
