# Mutant 6ad914b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3280
**Stable ID**: 6ad914b6
**Location**: L22:33–L66:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3280
@@ -18,54 +18,10 @@
   } as const;
 
   beforeEach(() => {});
 
-  describe("Brand Types", () => {
-    describe("QuizId validation", () => {
-      it.each([
-        ["valid alphanumeric", "quiz-1", true],
-        ["valid with numbers", "quiz123", true],
-        ["valid with underscore", "quiz_test", true],
-        ["valid with dash", "quiz-test", true],
-        ["valid single char", "q", true],
-        ["empty string", "", false],
-        ["only spaces", "   ", true], // min(1) では空でなければ有効
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = QuizId.safeParse(input);
+  describe("Brand Types", () => {});
 
-        expect(result.success).toBe(isValid);
-        if (isValid && result.success) {
-          expect(result.data).toBeDefined();
-          expect(result.data).toBe(input);
-        }
-      });
-    });
-
-    describe("TagId validation", () => {
-      it.each([
-        ["valid alphanumeric", "tag-1", true],
-        ["valid with numbers", "tag123", true],
-        ["valid with underscore", "tag_test", true],
-        ["valid with dash", "tag-test", true],
-        ["valid single char", "t", true],
-        ["empty string", "", false],
-        ["only spaces", "   ", true], // min(1) では空でなければ有効
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = TagId.safeParse(input);
-
-        expect(result.success).toBe(isValid);
-        if (isValid && result.success) {
-          expect(result.data).toBeDefined();
-          expect(result.data).toBe(input);
-        }
-      });
-    });
-  });
-
   describe("Schema Validation", () => {
     it("should validate valid quiz data", () => {
       const quiz = QuizSummary.from(validQuizData);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
