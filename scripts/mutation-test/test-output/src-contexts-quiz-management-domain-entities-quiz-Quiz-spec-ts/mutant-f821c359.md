# Mutant f821c359 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1424
**Stable ID**: f821c359
**Location**: L675:54–L677:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1424
@@ -671,11 +671,9 @@
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
             expect(updatedQuestion).not.toBe("   ");
             expect(typeof updatedQuestion).toBe("string");
-            if (typeof updatedQuestion === "string") {
-              expect(updatedQuestion.trim().length).toBeGreaterThan(0);
-            }
+            if (typeof updatedQuestion === "string") {}
           }
         });
 
         it("should apply multiple patches correctly", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
