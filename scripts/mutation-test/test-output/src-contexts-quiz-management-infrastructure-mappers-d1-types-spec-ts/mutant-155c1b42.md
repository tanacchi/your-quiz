# Mutant 155c1b42 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7504
**Stable ID**: 155c1b42
**Location**: L101:12–L101:48

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7504
@@ -97,9 +97,9 @@
   };
 
   describe("Schema Validation", () => {
     describe("Answer Type Schema", () => {
-      test("should validate valid answer types", () => {
+      test("", () => {
         const validTypes = [
           "boolean",
           "free_text",
           "single_choice",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
