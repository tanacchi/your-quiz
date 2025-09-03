# Mutant cc0a20f9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3172
**Stable ID**: cc0a20f9
**Location**: L379:63–L386:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3172
@@ -375,16 +375,9 @@
         const result = QuizSchema.safeParse(minimalData);
         expect(result.success).toBe(true);
       });
 
-      it("should handle maximum valid question length", () => {
-        const maximalData = {
-          ...validQuizData,
-          question: "A".repeat(500), // exactly 500 characters
-        };
-        const result = QuizSchema.safeParse(maximalData);
-        expect(result.success).toBe(true);
-      });
+      it("should handle maximum valid question length", () => {});
 
       it("should handle maximum valid explanation length", () => {
         const maxExplanationData = {
           ...validQuizData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
