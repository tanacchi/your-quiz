# Mutant 0bdd5535 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5916
**Stable ID**: 0bdd5535
**Location**: L164:69–L176:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5916
@@ -160,21 +160,9 @@
           expect(result.data.value).toBe(true);
         }
       });
 
-      it("should accept minimal valid data with false value", () => {
-        const minimalData = {
-          id: "s",
-          value: false,
-        };
-        const result = BooleanSolutionSchema.safeParse(minimalData);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.id).toBe("s");
-          expect(result.data.value).toBe(false);
-        }
-      });
+      it("should accept minimal valid data with false value", () => {});
     });
 
     describe("Type Safety", () => {
       it("should ensure value is exactly boolean type", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
