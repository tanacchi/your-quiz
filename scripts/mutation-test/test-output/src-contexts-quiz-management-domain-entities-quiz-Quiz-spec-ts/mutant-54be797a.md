# Mutant 54be797a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1129
**Stable ID**: 54be797a
**Location**: L294:57–L303:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1129
@@ -290,19 +290,10 @@
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
     });
 
-    it("should provide patches for draft errors", () => {
-      const draft = new Quiz.Draft();
-      draft.update("question", "  "); // Whitespace only
-      draft.update("answerType", "bool" as unknown as "boolean"); // Typo for testing
+    it("should provide patches for draft errors", () => {});
 
-      expect(draft.hasErrors()).toBe(true);
-
-      const patches = draft.getPatches();
-      expect(patches.length).toBeGreaterThan(0);
-    });
-
     describe("Quiz.fromDraft Method", () => {
       describe("Successful Conversion", () => {
         it("should create Quiz entity from valid draft", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
