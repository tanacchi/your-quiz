# Mutant 6702f09c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5798
**Stable ID**: 6702f09c
**Location**: L69:10–L69:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5798
@@ -65,9 +65,9 @@
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
         ["boolean", true, false],
-      ])("should validate id: %s -> %s", (_desc, id, isValid) => {
+      ])("", (_desc, id, isValid) => {
         const data = { ...validBooleanSolutionData, id };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
