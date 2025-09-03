# Mutant 3d8fe120 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1121
**Stable ID**: 3d8fe120
**Location**: L283:58–L292:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1121
@@ -279,19 +279,10 @@
         expect(quizEntity.getSolution().get("value")).toBe(false);
       }
     });
 
-    it("should handle validation errors in draft", () => {
-      const draft = new Quiz.Draft();
-      draft.update("question", ""); // Invalid
-      draft.update("answerType", "boolean");
+    it("should handle validation errors in draft", () => {});
 
-      expect(draft.hasErrors()).toBe(true);
-
-      const entityResult = draft.commit();
-      expect(entityResult.isErr()).toBe(true);
-    });
-
     it("should provide patches for draft errors", () => {
       const draft = new Quiz.Draft();
       draft.update("question", "  "); // Whitespace only
       draft.update("answerType", "bool" as unknown as "boolean"); // Typo for testing
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
