# Mutant ff187b98 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4927
**Stable ID**: ff187b98
**Location**: L28:30–L48:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4927
@@ -24,30 +24,10 @@
     createdAt: "2023-12-01 10:00:00",
   };
 
   describe("Brand Types", () => {
-    describe("QuizId", () => {
-      it.each([
-        ["valid alphanumeric", "quiz-123", true],
-        ["valid with underscore", "quiz_test", true],
-        ["valid single char", "q", true],
-        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-        ["number", 123, false],
-        ["object", {}, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = QuizId.safeParse(input);
-        expect(result.success).toBe(isValid);
+    describe("QuizId", () => {});
 
-        if (isValid && result.success) {
-          expect(result.data).toBe(input);
-        }
-      });
-    });
-
     describe("SolutionId", () => {
       it.each([
         ["valid format", "solution-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
