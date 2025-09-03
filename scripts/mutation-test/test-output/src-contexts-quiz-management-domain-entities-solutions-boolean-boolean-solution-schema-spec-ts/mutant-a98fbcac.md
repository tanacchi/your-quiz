# Mutant a98fbcac Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5864
**Stable ID**: a98fbcac
**Location**: L116:37–L121:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5864
@@ -112,14 +112,9 @@
         expect(result.success).toBe(false);
       });
 
       it("should reject data with nested extra fields", () => {
-        const dataWithNestedExtra = {
-          ...validBooleanSolutionData,
-          metadata: {
-            extra: "field",
-          },
-        };
+        const dataWithNestedExtra = {};
         const result = BooleanSolutionSchema.safeParse(dataWithNestedExtra);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
