# Mutant 1dd629c8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7709
**Stable ID**: 1dd629c8
**Location**: L384:12–L384:43

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7709
@@ -380,9 +380,9 @@
         expect(isValidAnswerType("boolean")).toBe(true);
         expect(isValidAnswerType("invalid")).toBe(false);
       });
 
-      test("should validate quiz statuses", () => {
+      test("", () => {
         expect(isValidQuizStatus("approved")).toBe(true);
         expect(isValidQuizStatus("invalid")).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
