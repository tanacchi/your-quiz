# Mutant c475889f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2833
**Stable ID**: c475889f
**Location**: L57:12–L57:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2833
@@ -53,9 +53,9 @@
       });
     });
   });
 
-  describe("QuizSchema Validation", () => {
+  describe("", () => {
     describe("Required Fields", () => {
       it("should accept valid complete boolean quiz", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
