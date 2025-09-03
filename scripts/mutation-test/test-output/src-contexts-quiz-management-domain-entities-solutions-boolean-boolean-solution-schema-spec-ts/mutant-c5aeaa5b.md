# Mutant c5aeaa5b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5795
**Stable ID**: c5aeaa5b
**Location**: L68:10–L68:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5795
@@ -64,9 +64,9 @@
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
-        ["boolean", true, false],
+        ["", true, false],
       ])("should validate id: %s -> %s", (_desc, id, isValid) => {
         const data = { ...validBooleanSolutionData, id };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
