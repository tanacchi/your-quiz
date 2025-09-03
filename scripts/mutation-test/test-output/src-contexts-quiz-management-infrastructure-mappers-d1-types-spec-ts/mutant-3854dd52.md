# Mutant 3854dd52 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7502
**Stable ID**: 3854dd52
**Location**: L100:14–L100:34

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7502
@@ -96,9 +96,9 @@
     }
   };
 
   describe("Schema Validation", () => {
-    describe("Answer Type Schema", () => {
+    describe("", () => {
       test("should validate valid answer types", () => {
         const validTypes = [
           "boolean",
           "free_text",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
