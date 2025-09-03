# Mutant 6a215b28 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5753
**Stable ID**: 6a215b28
**Location**: L52:15–L69:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5753
@@ -48,26 +48,9 @@
       });
     });
 
     describe("ID Field Validation", () => {
-      it.each([
-        ["valid alphanumeric", "solution-123", true],
-        ["valid with underscore", "solution_test", true],
-        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["valid single char", "s", true],
-        [
-          "valid long id",
-          "solution-very-long-identifier-with-many-parts",
-          true,
-        ],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-        ["number", 123, false],
-        ["object", {}, false],
-        ["boolean", true, false],
-      ])("should validate id: %s -> %s", (_desc, id, isValid) => {
+      it.each([])("should validate id: %s -> %s", (_desc, id, isValid) => {
         const data = { ...validBooleanSolutionData, id };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
