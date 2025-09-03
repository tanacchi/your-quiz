# Mutant 863d03c1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2952
**Stable ID**: 863d03c1
**Location**: L145:55–L157:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2952
@@ -141,22 +141,10 @@
       });
     });
 
     describe("Solution Field", () => {
-      it("should accept valid BooleanSolution", () => {
-        const validSolution = {
-          id: "solution-456",
-          value: false,
-        };
-        const data = { ...validQuizData, solution: validSolution };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
+      it("should accept valid BooleanSolution", () => {});
 
-        if (result.success) {
-          expect(result.data.solution).toEqual(validSolution);
-        }
-      });
-
       it.each([
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
