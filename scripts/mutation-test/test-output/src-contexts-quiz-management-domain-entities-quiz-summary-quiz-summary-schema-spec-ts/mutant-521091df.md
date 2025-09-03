# Mutant 521091df Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4928
**Stable ID**: 521091df
**Location**: L29:15–L40:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4928
@@ -25,20 +25,9 @@
   };
 
   describe("Brand Types", () => {
     describe("QuizId", () => {
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
+      it.each([])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success) {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
