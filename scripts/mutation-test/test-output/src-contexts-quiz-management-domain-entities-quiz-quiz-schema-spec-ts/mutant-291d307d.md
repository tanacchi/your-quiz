# Mutant 291d307d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3000
**Stable ID**: 291d307d
**Location**: L192:58–L201:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3000
@@ -188,19 +188,10 @@
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
 
-      it("should accept quiz without explanation", () => {
-        const { explanation: _explanation, ...dataWithoutExplanation } =
-          validQuizData;
-        const result = QuizSchema.safeParse(dataWithoutExplanation);
-        expect(result.success).toBe(true);
+      it("should accept quiz without explanation", () => {});
 
-        if (result.success) {
-          expect(result.data.explanation).toBeUndefined();
-        }
-      });
-
       it.each([
         ["exactly 1000 chars", "A".repeat(1000), true],
         ["1001 chars", "A".repeat(1001), false],
         ["empty string", "", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
