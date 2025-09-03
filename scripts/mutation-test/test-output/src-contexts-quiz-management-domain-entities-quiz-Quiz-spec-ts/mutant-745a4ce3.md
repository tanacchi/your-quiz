# Mutant 745a4ce3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1097
**Stable ID**: 745a4ce3
**Location**: L253:48–L281:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1097
@@ -249,38 +249,10 @@
     });
   });
 
   describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
-      const draft = new Quiz.Draft();
-      draft.update("question", "Draft question: Is this true?");
-      draft.with({
-        answerType: "boolean",
-        solution: {
-          id: "sol-draft",
-          value: false,
-        },
-        id: "quiz-draft",
-        creatorId: "creator-draft",
-        status: "pending_approval",
-        createdAt: "2023-12-01 10:00:00",
-      });
+    it("should work with Draft pattern", () => {});
 
-      expect(draft.hasErrors()).toBe(false);
-
-      const entityResult = draft.commit();
-      expect(entityResult.isOk()).toBe(true);
-
-      if (entityResult.isOk()) {
-        const quizEntity = entityResult.value;
-        expect(quizEntity.get("question")).toBe(
-          "Draft question: Is this true?",
-        );
-        expect(quizEntity.get("answerType")).toBe("boolean");
-        expect(quizEntity.getSolution().get("value")).toBe(false);
-      }
-    });
-
     it("should handle validation errors in draft", () => {
       const draft = new Quiz.Draft();
       draft.update("question", ""); // Invalid
       draft.update("answerType", "boolean");
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
