# Mutant 6c7f35bb Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7619
**Stable ID**: 6c7f35bb
**Location**: L270:57–L272:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7619
@@ -266,11 +266,9 @@
       });
     });
 
     describe("Parsed Choice Schema", () => {
-      test("should validate valid parsed choice", () => {
-        expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
-      });
+      test("should validate valid parsed choice", () => {});
 
       test("should handle orderIndex conversion", () => {
         const choiceWithStringIndex = {
           ...createValidParsedChoice(),
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
