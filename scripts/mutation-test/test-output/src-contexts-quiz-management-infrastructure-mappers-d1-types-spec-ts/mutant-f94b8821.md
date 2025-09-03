# Mutant f94b8821 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7512
**Stable ID**: f94b8821
**Location**: L114:12–L114:48

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7512
@@ -110,9 +110,9 @@
           expectValidParse(zodAnswerTypeSchema, type);
         });
       });
 
-      test("should reject invalid answer types", () => {
+      test("", () => {
         const invalidTypes = ["invalid", "", null, undefined];
 
         invalidTypes.forEach((type) => {
           expectInvalidParse(zodAnswerTypeSchema, type);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
