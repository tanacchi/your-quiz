# Mutant 37da1cec Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7651
**Stable ID**: 37da1cec
**Location**: L323:42–L325:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7651
@@ -319,11 +319,9 @@
           {},
           { invalid: "data" },
         ];
 
-        invalidInputs.forEach((input) => {
-          expect(isQuizRow(input)).toBe(false);
-        });
+        invalidInputs.forEach((input) => {});
       });
     });
 
     describe("isCountResult", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
