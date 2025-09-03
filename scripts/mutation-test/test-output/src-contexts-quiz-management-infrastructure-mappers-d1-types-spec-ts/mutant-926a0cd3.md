# Mutant 926a0cd3 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7740
**Stable ID**: 926a0cd3
**Location**: L420:12–L420:43

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7740
@@ -416,9 +416,9 @@
           expect(result.answer_type).toBe("boolean");
         }
       });
 
-      test("should handle optional fields", () => {
+      test("", () => {
         const inputWithOptionals = {
           ...createValidQuizRow(),
           explanation: "Test explanation",
           boolean_value: 1,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
