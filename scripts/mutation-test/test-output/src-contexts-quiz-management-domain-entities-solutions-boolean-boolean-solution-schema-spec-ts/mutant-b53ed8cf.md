# Mutant b53ed8cf Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5847
**Stable ID**: b53ed8cf
**Location**: L93:10–L93:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5847
@@ -89,9 +89,9 @@
         ["undefined value", undefined, false],
         ["empty string", "", false],
         ["object", {}, false],
         ["array", [], false],
-      ])("should validate value: %s -> %s", (_desc, value, isValid) => {
+      ])("", (_desc, value, isValid) => {
         const data = { ...validBooleanSolutionData, value };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
