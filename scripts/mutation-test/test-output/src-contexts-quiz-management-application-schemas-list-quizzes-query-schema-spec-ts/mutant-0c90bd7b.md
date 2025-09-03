# Mutant 0c90bd7b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 243
**Stable ID**: 0c90bd7b
**Location**: L128:15–L140:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #243
@@ -124,21 +124,9 @@
       });
     });
 
     describe("Limit Field Validation", () => {
-      it.each([
-        ["minimum valid limit", 1, true],
-        ["default limit", 10, true],
-        ["moderate limit", 50, true],
-        ["maximum valid limit", 100, true],
-        ["zero limit", 0, false],
-        ["negative limit", -1, false],
-        ["over maximum limit", 101, false],
-        ["decimal number", 10.5, false],
-        ["string number", "10", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
+      it.each([])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
         const input = limit === undefined ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
