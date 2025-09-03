# Mutant b1d0873c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3223
**Stable ID**: b1d0873c
**Location**: L443:27–L449:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3223
@@ -439,15 +439,9 @@
 
       const result = QuizSchema.safeParse(fullApprovedQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.answerType).toBe("boolean");
-        expect(result.data.solution.value).toBe(true);
-        expect(result.data.status).toBe("approved");
-        expect(result.data.approvedAt).toBeDefined();
-        expect(result.data.explanation).toBeDefined();
-      }
+      if (result.success) {}
     });
 
     it("should handle minimal valid boolean quiz", () => {
       const minimalQuiz = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
