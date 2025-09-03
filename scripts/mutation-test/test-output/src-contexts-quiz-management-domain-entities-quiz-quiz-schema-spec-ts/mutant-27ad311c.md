# Mutant 27ad311c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2789
**Stable ID**: 27ad311c
**Location**: L31:15–L37:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2789
@@ -27,15 +27,9 @@
   };
 
   describe("Brand Types Re-export", () => {
     describe("QuizIdSchema", () => {
-      it.each([
-        ["valid format", "quiz-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
+      it.each([])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizIdSchema.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
