# Mutant 89bb0cb8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1167
**Stable ID**: 89bb0cb8
**Location**: L342:12–L342:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1167
@@ -338,9 +338,9 @@
             expect(quiz.get("status")).toBe("pending_approval");
           }
         });
 
-        it("should work with incrementally built draft", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
 
           // Build draft step by step
           draft.update("id", "quiz-incremental");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
