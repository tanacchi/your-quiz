# Mutant 9f7f9896 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6030
**Stable ID**: 9f7f9896
**Location**: L296:28–L302:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6030
@@ -292,15 +292,9 @@
   });
 
   describe("Error Handling", () => {
     it("should provide clear error messages for invalid data", () => {
-      const invalidCases = [
-        { data: { id: "", value: true }, expectedPath: ["id"] },
-        { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
-        { data: { id: "valid" }, expectedPath: ["value"] },
-        { data: { value: true }, expectedPath: ["id"] },
-        { data: {}, expectedPath: ["id"] },
-      ];
+      const invalidCases = [];
 
       invalidCases.forEach(({ data, expectedPath }) => {
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
