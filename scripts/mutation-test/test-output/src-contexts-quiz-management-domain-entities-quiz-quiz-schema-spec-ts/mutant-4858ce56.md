# Mutant 4858ce56 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3165
**Stable ID**: 4858ce56
**Location**: L369:46–L396:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3165
@@ -365,37 +365,10 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Boundary Value Testing", () => {
-      it("should handle minimum valid question length", () => {
-        const minimalData = {
-          ...validQuizData,
-          question: "A", // 1 character after trim
-        };
-        const result = QuizSchema.safeParse(minimalData);
-        expect(result.success).toBe(true);
-      });
+    describe("Boundary Value Testing", () => {});
 
-      it("should handle maximum valid question length", () => {
-        const maximalData = {
-          ...validQuizData,
-          question: "A".repeat(500), // exactly 500 characters
-        };
-        const result = QuizSchema.safeParse(maximalData);
-        expect(result.success).toBe(true);
-      });
-
-      it("should handle maximum valid explanation length", () => {
-        const maxExplanationData = {
-          ...validQuizData,
-          explanation: "A".repeat(1000), // exactly 1000 characters
-        };
-        const result = QuizSchema.safeParse(maxExplanationData);
-        expect(result.success).toBe(true);
-      });
-    });
-
     describe("Complex Boolean Solutions", () => {
       it.each([
         ["true value", { id: "sol-1", value: true }],
         ["false value", { id: "sol-2", value: false }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
