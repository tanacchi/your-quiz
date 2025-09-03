# Mutant 1d7bb7eb Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7620
**Stable ID**: 1d7bb7eb
**Location**: L274:12–L274:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7620
@@ -270,9 +270,9 @@
       test("should validate valid parsed choice", () => {
         expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
       });
 
-      test("should handle orderIndex conversion", () => {
+      test("", () => {
         const choiceWithStringIndex = {
           ...createValidParsedChoice(),
           orderIndex: "2",
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
