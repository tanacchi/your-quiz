# Mutant e8c6e736 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7710
**Stable ID**: e8c6e736
**Location**: L384:51–L387:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7710
@@ -380,12 +380,9 @@
         expect(isValidAnswerType("boolean")).toBe(true);
         expect(isValidAnswerType("invalid")).toBe(false);
       });
 
-      test("should validate quiz statuses", () => {
-        expect(isValidQuizStatus("approved")).toBe(true);
-        expect(isValidQuizStatus("invalid")).toBe(false);
-      });
+      test("should validate quiz statuses", () => {});
 
       test("should validate matching strategies", () => {
         expect(isValidMatchingStrategy("exact")).toBe(true);
         expect(isValidMatchingStrategy("invalid")).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
