# Mutant cb3783bb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1189
**Stable ID**: cb3783bb
**Location**: L362:30–L368:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1189
@@ -358,15 +358,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isOk()).toBe(true);
 
-          if (result.isOk()) {
-            const quiz = result.value;
-            expect(quiz.get("question")).toBe(
-              "Can TypeScript catch runtime errors?",
-            );
-            expect(quiz.getSolution().get("value")).toBe(false);
-          }
+          if (result.isOk()) {}
         });
 
         it("should create quiz with business logic methods working", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
