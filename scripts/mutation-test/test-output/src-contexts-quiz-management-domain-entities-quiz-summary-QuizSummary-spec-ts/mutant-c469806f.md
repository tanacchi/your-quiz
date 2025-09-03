# Mutant c469806f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3326
**Stable ID**: c469806f
**Location**: L46:15–L56:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3326
@@ -42,19 +42,9 @@
       });
     });
 
     describe("TagId validation", () => {
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
+      it.each([])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
 
         expect(result.success).toBe(isValid);
         if (isValid && result.success) {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
