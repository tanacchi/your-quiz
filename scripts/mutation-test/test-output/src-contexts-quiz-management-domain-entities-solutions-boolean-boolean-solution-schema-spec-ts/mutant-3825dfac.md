# Mutant 3825dfac Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6035
**Stable ID**: 3825dfac
**Location**: L297:56–L297:62

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6035
@@ -293,9 +293,9 @@
 
   describe("Error Handling", () => {
     it("should provide clear error messages for invalid data", () => {
       const invalidCases = [
-        { data: { id: "", value: true }, expectedPath: ["id"] },
+        { data: { id: "", value: true }, expectedPath: [] },
         { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
         { data: { id: "valid" }, expectedPath: ["value"] },
         { data: { value: true }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
