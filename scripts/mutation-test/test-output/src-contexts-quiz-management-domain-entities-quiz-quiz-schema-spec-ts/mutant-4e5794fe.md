# Mutant 4e5794fe Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3097
**Stable ID**: 4e5794fe
**Location**: L277:12–L277:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3097
@@ -273,9 +273,9 @@
       });
     });
   });
 
-  describe("Cross-Field Validation (superRefine)", () => {
+  describe("", () => {
     describe("Approved Status and ApprovedAt", () => {
       it("should accept approved status with approvedAt", () => {
         const approvedData = {
           ...validQuizData,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
