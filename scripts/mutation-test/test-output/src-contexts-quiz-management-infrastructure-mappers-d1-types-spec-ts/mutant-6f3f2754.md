# Mutant 6f3f2754 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7716
**Stable ID**: 6f3f2754
**Location**: L389:57–L392:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7716
@@ -385,12 +385,9 @@
         expect(isValidQuizStatus("approved")).toBe(true);
         expect(isValidQuizStatus("invalid")).toBe(false);
       });
 
-      test("should validate matching strategies", () => {
-        expect(isValidMatchingStrategy("exact")).toBe(true);
-        expect(isValidMatchingStrategy("invalid")).toBe(false);
-      });
+      test("should validate matching strategies", () => {});
     });
   });
 
   describe("Conversion Functions", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
