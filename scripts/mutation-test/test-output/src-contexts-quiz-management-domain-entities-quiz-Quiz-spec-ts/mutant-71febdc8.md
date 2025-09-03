# Mutant 71febdc8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1501
**Stable ID**: 71febdc8
**Location**: L797:34–L860:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1501
@@ -793,69 +793,6 @@
       });
     });
   });
 
-  describe("Patch System", () => {
-    it("should suggest question fixes", () => {
-      const result = Quiz.from({
-        ...validQuizData,
-        question: "   ",
-      });
-
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const questionPatch = result.error.patches.find(
-          (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
-        );
-        expect(questionPatch).toBeDefined();
-      }
-    });
-
-    it("should suggest answer type fixes", () => {
-      const result = Quiz.from({
-        ...validQuizData,
-        answerType: "bool",
-      });
-
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
-    it("should suggest status fixes", () => {
-      const result = Quiz.from({
-        ...validQuizData,
-        status: "pending",
-      });
-
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const statusPatch = result.error.patches.find(
-          (patch) =>
-            typeof patch === "object" && patch !== null && "status" in patch,
-        );
-        expect(statusPatch).toBeDefined();
-        if (statusPatch && "status" in statusPatch) {
-          expect(statusPatch.status).toBe("pending_approval");
-        }
-      }
-    });
-  });
+  describe("Patch System", () => {});
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
