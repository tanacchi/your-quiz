# Mutant edf455ed Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7500
**Stable ID**: edf455ed
**Location**: L99:12–L99:31

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7500
@@ -95,9 +95,9 @@
       expect(success).toBe(false);
     }
   };
 
-  describe("Schema Validation", () => {
+  describe("", () => {
     describe("Answer Type Schema", () => {
       test("should validate valid answer types", () => {
         const validTypes = [
           "boolean",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
