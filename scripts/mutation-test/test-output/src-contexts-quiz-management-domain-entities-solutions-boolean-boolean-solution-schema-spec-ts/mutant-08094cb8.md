# Mutant 08094cb8 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6044
**Stable ID**: 08094cb8
**Location**: L299:17–L299:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6044
@@ -295,9 +295,9 @@
     it("should provide clear error messages for invalid data", () => {
       const invalidCases = [
         { data: { id: "", value: true }, expectedPath: ["id"] },
         { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
-        { data: { id: "valid" }, expectedPath: ["value"] },
+        { data: {}, expectedPath: ["value"] },
         { data: { value: true }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
       ];
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
