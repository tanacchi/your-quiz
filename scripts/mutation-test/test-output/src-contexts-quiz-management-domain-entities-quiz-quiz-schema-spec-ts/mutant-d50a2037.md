# Mutant d50a2037 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2992
**Stable ID**: d50a2037
**Location**: L182:14–L182:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2992
@@ -178,9 +178,9 @@
         expect(quizValidation.success).toBe(true);
       });
     });
 
-    describe("Explanation Field", () => {
+    describe("", () => {
       it("should accept valid explanation", () => {
         const data = {
           ...validQuizData,
           explanation: "Detailed explanation about TypeScript",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
