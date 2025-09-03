# Mutant 27b2043f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5865
**Stable ID**: 27b2043f
**Location**: L118:21–L120:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5865
@@ -114,11 +114,9 @@
 
       it("should reject data with nested extra fields", () => {
         const dataWithNestedExtra = {
           ...validBooleanSolutionData,
-          metadata: {
-            extra: "field",
-          },
+          metadata: {},
         };
         const result = BooleanSolutionSchema.safeParse(dataWithNestedExtra);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
