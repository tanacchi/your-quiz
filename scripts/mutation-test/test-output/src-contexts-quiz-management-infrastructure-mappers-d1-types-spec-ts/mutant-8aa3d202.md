# Mutant 8aa3d202 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7703
**Stable ID**: 8aa3d202
**Location**: L379:12–L379:42

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7703
@@ -375,9 +375,9 @@
       });
     });
 
     describe("String Validation Guards", () => {
-      test("should validate answer types", () => {
+      test("", () => {
         expect(isValidAnswerType("boolean")).toBe(true);
         expect(isValidAnswerType("invalid")).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
