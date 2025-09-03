# Mutant 3e12d63f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 896
**Stable ID**: 3e12d63f
**Location**: L22:41–L33:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #896
@@ -18,20 +18,9 @@
     approvedAt: undefined,
   } as const;
 
   describe("Brand Types", () => {
-    describe("QuizId validation", () => {
-      it.each([
-        ["valid alphanumeric", "quiz-1", true],
-        ["valid with numbers", "quiz123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = QuizId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("QuizId validation", () => {});
 
     describe("CreatorId validation", () => {
       it.each([
         ["valid alphanumeric", "creator-1", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
