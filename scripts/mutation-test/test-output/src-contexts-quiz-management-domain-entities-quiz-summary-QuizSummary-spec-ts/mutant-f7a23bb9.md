# Mutant f7a23bb9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3788
**Stable ID**: f7a23bb9
**Location**: L529:52–L531:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3788
@@ -525,11 +525,9 @@
     beforeEach(() => {
       draft = new QuizSummary.Draft();
     });
 
-    it("should initialize with empty state", () => {
-      expect(draft.state).toEqual({});
-    });
+    it("should initialize with empty state", () => {});
 
     describe("Field operations", () => {
       it.each([
         ["question", "Draft question"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
