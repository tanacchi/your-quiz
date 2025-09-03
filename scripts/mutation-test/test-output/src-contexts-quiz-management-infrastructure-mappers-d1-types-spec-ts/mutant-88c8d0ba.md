# Mutant 88c8d0ba Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7520
**Stable ID**: 88c8d0ba
**Location**: L124:12–L124:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7520
@@ -120,9 +120,9 @@
       });
     });
 
     describe("Quiz Status Schema", () => {
-      test("should validate valid quiz statuses", () => {
+      test("", () => {
         const validStatuses = ["pending_approval", "approved", "rejected"];
 
         validStatuses.forEach((status) => {
           expectValidParse(zodQuizStatusSchema, status);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
