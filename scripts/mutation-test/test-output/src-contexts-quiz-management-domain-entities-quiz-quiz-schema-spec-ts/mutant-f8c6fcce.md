# Mutant f8c6fcce Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2997
**Stable ID**: f8c6fcce
**Location**: L186:24–L186:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2997
@@ -182,9 +182,9 @@
     describe("Explanation Field", () => {
       it("should accept valid explanation", () => {
         const data = {
           ...validQuizData,
-          explanation: "Detailed explanation about TypeScript",
+          explanation: "",
         };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
