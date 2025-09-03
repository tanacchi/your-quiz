# Mutant b5b7318d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 942
**Stable ID**: b5b7318d
**Location**: L49:37–L119:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #942
@@ -45,80 +45,10 @@
       });
     });
   });
 
-  describe("Entity Creation", () => {
-    it("should create valid quiz from complete data", () => {
-      const result = Quiz.from(validQuizData);
-      expect(result.isOk()).toBe(true);
+  describe("Entity Creation", () => {});
 
-      if (result.isOk()) {
-        const quiz = result.value;
-        expect(quiz.get("question")).toBe(
-          "Is TypeScript a superset of JavaScript?",
-        );
-        expect(quiz.get("answerType")).toBe("boolean");
-        expect(quiz.get("status")).toBe("pending_approval");
-      }
-    });
-
-    it("should suggest patches for invalid data", () => {
-      const invalidData = {
-        ...validQuizData,
-        question: "  ", // 空白のみ
-        answerType: "bool", // typo
-        status: "pending", // typo
-      };
-
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
-    it("should enforce answer type consistency", () => {
-      const inconsistentData = {
-        ...validQuizData,
-        answerType: "boolean" as const,
-        solution: {
-          id: "solution-1",
-          value: true,
-        },
-      };
-
-      const result = Quiz.from(inconsistentData);
-      expect(result.isOk()).toBe(true);
-    });
-
-    it("should validate solution requirement for boolean questions", () => {
-      const noSolutionData = {
-        ...validQuizData,
-        solution: null,
-      };
-
-      const result = Quiz.from(noSolutionData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const hasSolutionIssue = result.error.issues.some(
-          (issue) => issue.path[0] === "solution",
-        );
-        expect(hasSolutionIssue).toBe(true);
-      }
-    });
-  });
-
   describe("Business Logic", () => {
     let quiz: Quiz;
 
     beforeEach(() => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
