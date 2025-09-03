# Mutant 5aa82956 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7616
**Stable ID**: 5aa82956
**Location**: L269:14–L269:36

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7616
@@ -265,9 +265,9 @@
         });
       });
     });
 
-    describe("Parsed Choice Schema", () => {
+    describe("", () => {
       test("should validate valid parsed choice", () => {
         expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
