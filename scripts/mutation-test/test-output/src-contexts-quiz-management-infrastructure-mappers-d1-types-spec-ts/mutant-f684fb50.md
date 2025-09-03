# Mutant f684fb50 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7518
**Stable ID**: f684fb50
**Location**: L123:14–L123:34

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7518
@@ -119,9 +119,9 @@
         });
       });
     });
 
-    describe("Quiz Status Schema", () => {
+    describe("", () => {
       test("should validate valid quiz statuses", () => {
         const validStatuses = ["pending_approval", "approved", "rejected"];
 
         validStatuses.forEach((status) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
