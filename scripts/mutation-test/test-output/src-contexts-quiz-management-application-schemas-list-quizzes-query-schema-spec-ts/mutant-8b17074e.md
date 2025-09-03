# Mutant 8b17074e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 302
**Stable ID**: 8b17074e
**Location**: L165:15–L175:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #302
@@ -161,19 +161,9 @@
       });
     });
 
     describe("Offset Field Validation", () => {
-      it.each([
-        ["zero offset", 0, true],
-        ["small offset", 10, true],
-        ["large offset", 1000, true],
-        ["very large offset", 999999, true],
-        ["negative offset", -1, false],
-        ["decimal number", 5.5, false],
-        ["string number", "0", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
+      it.each([])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
         const input = offset === undefined ? {} : { offset };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
