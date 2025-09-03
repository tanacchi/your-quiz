# Mutant dd9b5725 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7767
**Stable ID**: dd9b5725
**Location**: L465:12–L465:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7767
@@ -461,9 +461,9 @@
           expect(result.answer_type).toBe("boolean");
         }
       });
 
-      test("should throw error for invalid input", () => {
+      test("", () => {
         const conversionResult = Result.fromThrowable(() =>
           toBasicQuizInfo({ invalid: "data" }),
         )();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
