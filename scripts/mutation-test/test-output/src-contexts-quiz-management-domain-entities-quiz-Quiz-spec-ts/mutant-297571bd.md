# Mutant 297571bd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 956
**Stable ID**: 297571bd
**Location**: L64:57–L87:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #956
@@ -60,33 +60,10 @@
         expect(quiz.get("status")).toBe("pending_approval");
       }
     });
 
-    it("should suggest patches for invalid data", () => {
-      const invalidData = {
-        ...validQuizData,
-        question: "  ", // 空白のみ
-        answerType: "bool", // typo
-        status: "pending", // typo
-      };
+    it("should suggest patches for invalid data", () => {});
 
-      const result = Quiz.from(invalidData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues, patches } = result.error;
-        expect(issues.length).toBeGreaterThan(0);
-        expect(patches.length).toBeGreaterThan(0);
-
-        // patches contains question fix
-        const hasQuestionPatch = patches.some(
-          (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
-        );
-        expect(hasQuestionPatch).toBe(true);
-      }
-    });
-
     it("should enforce answer type consistency", () => {
       const inconsistentData = {
         ...validQuizData,
         answerType: "boolean" as const,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
