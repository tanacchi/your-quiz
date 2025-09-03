# Mutant eb4257d8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7628
**Stable ID**: eb4257d8
**Location**: L289:12–L289:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7628
@@ -285,9 +285,9 @@
           expect(parseResult.data.orderIndex).toBe(2);
         }
       });
 
-      test("should reject invalid parsed choice", () => {
+      test("", () => {
         const requiredFields = [
           "id",
           "solutionId",
           "text",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
