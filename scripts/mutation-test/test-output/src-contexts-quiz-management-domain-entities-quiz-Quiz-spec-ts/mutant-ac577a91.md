# Mutant ac577a91 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1523
**Stable ID**: ac577a91
**Location**: L815:50–L839:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1523
@@ -811,34 +811,10 @@
         expect(questionPatch).toBeDefined();
       }
     });
 
-    it("should suggest answer type fixes", () => {
-      const result = Quiz.from({
-        ...validQuizData,
-        answerType: "bool",
-      });
+    it("should suggest answer type fixes", () => {});
 
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const answerTypePatch = result.error.patches.find(
-          (patch) =>
-            typeof patch === "object" &&
-            patch !== null &&
-            "answerType" in patch,
-        );
-        expect(answerTypePatch).toBeDefined();
-        if (
-          answerTypePatch &&
-          typeof answerTypePatch === "object" &&
-          "answerType" in answerTypePatch
-        ) {
-          expect(answerTypePatch.answerType).toBe("boolean");
-        }
-      }
-    });
-
     it("should suggest status fixes", () => {
       const result = Quiz.from({
         ...validQuizData,
         status: "pending",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
