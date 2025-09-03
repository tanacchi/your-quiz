# Mutant ce3378ef Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1091
**Stable ID**: ce3378ef
**Location**: L242:44–L245:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1091
@@ -238,12 +238,9 @@
     });
 
     describe("Validation Methods", () => {
       it("should identify incomplete quiz", () => {
-        const incompleteResult = Quiz.from({
-          ...validQuizData,
-          question: "",
-        });
+        const incompleteResult = Quiz.from({});
 
         expect(incompleteResult.isErr()).toBe(true);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
