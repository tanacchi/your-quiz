# Mutant f187e9cb Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5799
**Stable ID**: f187e9cb
**Location**: L69:66–L77:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5799
@@ -65,17 +65,9 @@
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
         ["boolean", true, false],
-      ])("should validate id: %s -> %s", (_desc, id, isValid) => {
-        const data = { ...validBooleanSolutionData, id };
-        const result = BooleanSolutionSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success) {
-          expect(result.data.id).toBe(id);
-        }
-      });
+      ])("should validate id: %s -> %s", (_desc, id, isValid) => {});
     });
 
     describe("Value Field Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
