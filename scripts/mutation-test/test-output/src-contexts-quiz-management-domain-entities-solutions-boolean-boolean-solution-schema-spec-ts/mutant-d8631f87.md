# Mutant d8631f87 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6040
**Stable ID**: d8631f87
**Location**: L298:39–L298:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6040
@@ -294,9 +294,9 @@
   describe("Error Handling", () => {
     it("should provide clear error messages for invalid data", () => {
       const invalidCases = [
         { data: { id: "", value: true }, expectedPath: ["id"] },
-        { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
+        { data: { id: "valid", value: "" }, expectedPath: ["value"] },
         { data: { id: "valid" }, expectedPath: ["value"] },
         { data: { value: true }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
