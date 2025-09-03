# Mutant b3ad9acc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3102
**Stable ID**: b3ad9acc
**Location**: L279:65–L287:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3102
@@ -275,17 +275,9 @@
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Approved Status and ApprovedAt", () => {
-      it("should accept approved status with approvedAt", () => {
-        const approvedData = {
-          ...validQuizData,
-          status: "approved" as const,
-          approvedAt: "2023-12-02 10:00:00",
-        };
-        const result = QuizSchema.safeParse(approvedData);
-        expect(result.success).toBe(true);
-      });
+      it("should accept approved status with approvedAt", () => {});
 
       it("should reject approved status without approvedAt", () => {
         const approvedWithoutTimestamp = {
           ...validQuizData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
