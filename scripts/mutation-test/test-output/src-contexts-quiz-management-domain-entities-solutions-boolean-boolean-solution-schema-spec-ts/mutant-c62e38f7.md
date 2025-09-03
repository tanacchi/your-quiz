# Mutant c62e38f7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6051
**Stable ID**: c62e38f7
**Location**: L300:48–L300:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6051
@@ -296,9 +296,9 @@
       const invalidCases = [
         { data: { id: "", value: true }, expectedPath: ["id"] },
         { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
         { data: { id: "valid" }, expectedPath: ["value"] },
-        { data: { value: true }, expectedPath: ["id"] },
+        { data: { value: true }, expectedPath: [] },
         { data: {}, expectedPath: ["id"] },
       ];
 
       invalidCases.forEach(({ data, expectedPath }) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
