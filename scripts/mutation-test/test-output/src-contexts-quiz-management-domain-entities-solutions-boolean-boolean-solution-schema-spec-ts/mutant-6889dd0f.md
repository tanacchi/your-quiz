# Mutant 6889dd0f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5905
**Stable ID**: 6889dd0f
**Location**: L150:77–L162:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5905
@@ -146,22 +146,10 @@
       });
     });
 
     describe("Minimal Valid Data", () => {
-      it("should accept minimal valid data with single character id", () => {
-        const minimalData = {
-          id: "s",
-          value: true,
-        };
-        const result = BooleanSolutionSchema.safeParse(minimalData);
-        expect(result.success).toBe(true);
+      it("should accept minimal valid data with single character id", () => {});
 
-        if (result.success) {
-          expect(result.data.id).toBe("s");
-          expect(result.data.value).toBe(true);
-        }
-      });
-
       it("should accept minimal valid data with false value", () => {
         const minimalData = {
           id: "s",
           value: false,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
