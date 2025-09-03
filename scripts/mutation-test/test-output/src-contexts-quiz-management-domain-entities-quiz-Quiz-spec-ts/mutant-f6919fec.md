# Mutant f6919fec Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1154
**Stable ID**: f6919fec
**Location**: L327:30–L339:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1154
@@ -323,21 +323,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isOk()).toBe(true);
 
-          if (result.isOk()) {
-            const quiz = result.value;
-            expect(quiz.get("id")).toBe("quiz-from-draft");
-            expect(quiz.get("question")).toBe(
-              "Is Rust a systems programming language?",
-            );
-            expect(quiz.get("answerType")).toBe("boolean");
-            expect(quiz.getSolution().get("value")).toBe(true);
-            expect(quiz.get("explanation")).toBe(
-              "Rust is designed for systems programming with memory safety",
-            );
-            expect(quiz.get("status")).toBe("pending_approval");
-          }
+          if (result.isOk()) {}
         });
 
         it("should work with incrementally built draft", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
