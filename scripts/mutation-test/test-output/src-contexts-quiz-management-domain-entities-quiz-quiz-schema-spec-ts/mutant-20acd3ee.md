# Mutant 20acd3ee Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2995
**Stable ID**: 20acd3ee
**Location**: L183:51–L190:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2995
@@ -179,16 +179,9 @@
       });
     });
 
     describe("Explanation Field", () => {
-      it("should accept valid explanation", () => {
-        const data = {
-          ...validQuizData,
-          explanation: "Detailed explanation about TypeScript",
-        };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+      it("should accept valid explanation", () => {});
 
       it("should accept quiz without explanation", () => {
         const { explanation: _explanation, ...dataWithoutExplanation } =
           validQuizData;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
