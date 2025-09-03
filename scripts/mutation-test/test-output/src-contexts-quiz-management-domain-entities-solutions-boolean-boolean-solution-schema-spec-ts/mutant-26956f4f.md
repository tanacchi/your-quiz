# Mutant 26956f4f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6050
**Stable ID**: 26956f4f
**Location**: L300:26–L300:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6050
@@ -296,9 +296,9 @@
       const invalidCases = [
         { data: { id: "", value: true }, expectedPath: ["id"] },
         { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
         { data: { id: "valid" }, expectedPath: ["value"] },
-        { data: { value: true }, expectedPath: ["id"] },
+        { data: { value: false }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
       ];
 
       invalidCases.forEach(({ data, expectedPath }) => {
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
