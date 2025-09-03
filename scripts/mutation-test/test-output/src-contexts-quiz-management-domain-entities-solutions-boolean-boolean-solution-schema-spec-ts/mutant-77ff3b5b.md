# Mutant 77ff3b5b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6038
**Stable ID**: 77ff3b5b
**Location**: L298:17–L298:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6038
@@ -294,9 +294,9 @@
   describe("Error Handling", () => {
     it("should provide clear error messages for invalid data", () => {
       const invalidCases = [
         { data: { id: "", value: true }, expectedPath: ["id"] },
-        { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
+        { data: {}, expectedPath: ["value"] },
         { data: { id: "valid" }, expectedPath: ["value"] },
         { data: { value: true }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
       ];
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
