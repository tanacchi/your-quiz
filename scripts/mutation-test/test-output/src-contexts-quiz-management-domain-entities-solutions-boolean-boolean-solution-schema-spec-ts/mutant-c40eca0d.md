# Mutant c40eca0d Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6076
**Stable ID**: c40eca0d
**Location**: L330:40–L333:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6076
@@ -326,11 +326,8 @@
         [],
         () => {},
       ];
 
-      invalidInputs.forEach((input) => {
-        const result = BooleanSolutionSchema.safeParse(input);
-        expect(result.success).toBe(false);
-      });
+      invalidInputs.forEach((input) => {});
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
