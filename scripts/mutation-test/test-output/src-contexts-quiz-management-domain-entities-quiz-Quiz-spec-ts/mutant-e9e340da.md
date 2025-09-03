# Mutant e9e340da Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 894
**Stable ID**: e9e340da
**Location**: L21:33–L47:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #894
@@ -17,36 +17,10 @@
     createdAt: "2023-12-01 10:00:00",
     approvedAt: undefined,
   } as const;
 
-  describe("Brand Types", () => {
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
+  describe("Brand Types", () => {});
 
-    describe("CreatorId validation", () => {
-      it.each([
-        ["valid alphanumeric", "creator-1", true],
-        ["valid with numbers", "creator123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = CreatorId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
-  });
-
   describe("Entity Creation", () => {
     it("should create valid quiz from complete data", () => {
       const result = Quiz.from(validQuizData);
       expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
