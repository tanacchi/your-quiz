# Mutant 2feb89e7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6046
**Stable ID**: 2feb89e7
**Location**: L299:48–L299:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6046
@@ -295,9 +295,9 @@
     it("should provide clear error messages for invalid data", () => {
       const invalidCases = [
         { data: { id: "", value: true }, expectedPath: ["id"] },
         { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
-        { data: { id: "valid" }, expectedPath: ["value"] },
+        { data: { id: "valid" }, expectedPath: [] },
         { data: { value: true }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
       ];
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
