# Mutant 0f49de08 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3167
**Stable ID**: 0f49de08
**Location**: L370:63–L377:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3167
@@ -366,16 +366,9 @@
       });
     });
 
     describe("Boundary Value Testing", () => {
-      it("should handle minimum valid question length", () => {
-        const minimalData = {
-          ...validQuizData,
-          question: "A", // 1 character after trim
-        };
-        const result = QuizSchema.safeParse(minimalData);
-        expect(result.success).toBe(true);
-      });
+      it("should handle minimum valid question length", () => {});
 
       it("should handle maximum valid question length", () => {
         const maximalData = {
           ...validQuizData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
