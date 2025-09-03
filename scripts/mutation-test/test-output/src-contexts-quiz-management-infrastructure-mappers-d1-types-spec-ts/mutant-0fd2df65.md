# Mutant 0fd2df65 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7704
**Stable ID**: 0fd2df65
**Location**: L379:50–L382:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7704
@@ -375,12 +375,9 @@
       });
     });
 
     describe("String Validation Guards", () => {
-      test("should validate answer types", () => {
-        expect(isValidAnswerType("boolean")).toBe(true);
-        expect(isValidAnswerType("invalid")).toBe(false);
-      });
+      test("should validate answer types", () => {});
 
       test("should validate quiz statuses", () => {
         expect(isValidQuizStatus("approved")).toBe(true);
         expect(isValidQuizStatus("invalid")).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
