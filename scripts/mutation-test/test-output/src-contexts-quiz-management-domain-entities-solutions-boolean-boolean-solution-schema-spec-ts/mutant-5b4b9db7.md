# Mutant 5b4b9db7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5853
**Stable ID**: 5b4b9db7
**Location**: L98:40–L101:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5853
@@ -94,12 +94,9 @@
         const data = { ...validBooleanSolutionData, value };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
-          expect(result.data.value).toBe(value);
-          expect(typeof result.data.value).toBe("boolean");
-        }
+        if (isValid && result.success) {}
       });
     });
 
     describe("Strict Mode", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
