# Mutant a415ac29 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5966
**Stable ID**: a415ac29
**Location**: L215:63–L235:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5966
@@ -211,30 +211,10 @@
     });
   });
 
   describe("Integration Scenarios", () => {
-    it("should handle typical quiz solution scenarios", () => {
-      const quizSolutions = [
-        { id: "solution-correct-answer", value: true },
-        { id: "solution-incorrect-answer", value: false },
-        { id: "solution-yes-no-yes", value: true },
-        { id: "solution-yes-no-no", value: false },
-        { id: "solution-true-false-true", value: true },
-        { id: "solution-true-false-false", value: false },
-      ];
+    it("should handle typical quiz solution scenarios", () => {});
 
-      quizSolutions.forEach((solution, _index) => {
-        const result = BooleanSolutionSchema.safeParse(solution);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.id).toBe(solution.id);
-          expect(result.data.value).toBe(solution.value);
-          expect(typeof result.data.value).toBe("boolean");
-        }
-      });
-    });
-
     it("should handle solutions with complex IDs", () => {
       const complexSolutions = [
         {
           id: "quiz-123-solution-456-boolean-true",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
