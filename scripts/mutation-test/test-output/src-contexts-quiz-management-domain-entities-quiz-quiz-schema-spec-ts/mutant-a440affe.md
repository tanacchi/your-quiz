# Mutant a440affe Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3177
**Stable ID**: a440affe
**Location**: L388:66–L395:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3177
@@ -384,16 +384,9 @@
         const result = QuizSchema.safeParse(maximalData);
         expect(result.success).toBe(true);
       });
 
-      it("should handle maximum valid explanation length", () => {
-        const maxExplanationData = {
-          ...validQuizData,
-          explanation: "A".repeat(1000), // exactly 1000 characters
-        };
-        const result = QuizSchema.safeParse(maxExplanationData);
-        expect(result.success).toBe(true);
-      });
+      it("should handle maximum valid explanation length", () => {});
     });
 
     describe("Complex Boolean Solutions", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
