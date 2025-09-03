# Mutant c0faf8e8 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5845
**Stable ID**: c0faf8e8
**Location**: L92:19–L92:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5845
@@ -88,9 +88,9 @@
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["empty string", "", false],
         ["object", {}, false],
-        ["array", [], false],
+        ["array", ["Stryker was here"], false],
       ])("should validate value: %s -> %s", (_desc, value, isValid) => {
         const data = { ...validBooleanSolutionData, value };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
