# Mutant dbaaee4d Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5844
**Stable ID**: dbaaee4d
**Location**: L92:10–L92:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5844
@@ -88,9 +88,9 @@
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["empty string", "", false],
         ["object", {}, false],
-        ["array", [], false],
+        ["", [], false],
       ])("should validate value: %s -> %s", (_desc, value, isValid) => {
         const data = { ...validBooleanSolutionData, value };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
