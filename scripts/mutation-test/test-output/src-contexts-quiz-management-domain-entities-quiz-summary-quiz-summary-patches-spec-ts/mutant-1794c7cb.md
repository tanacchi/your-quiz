# Mutant 1794c7cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4440
**Stable ID**: 1794c7cb
**Location**: L348:48–L576:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4440
@@ -344,238 +344,10 @@
       });
     });
   });
 
-  describe("Integrated Patch Suggester", () => {
-    describe("suggestQuizSummaryPatches", () => {
-      it("should return empty array for non-object input", () => {
-        const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid" },
-        ];
+  describe("Integrated Patch Suggester", () => {});
 
-        const nonObjectInputs = [null, undefined, "string", 123, true, []];
-
-        nonObjectInputs.forEach((input) => {
-          const result = suggestQuizSummaryPatches(input, issues);
-          expect(result).toEqual([]);
-        });
-      });
-
-      it("should only suggest patches for fields mentioned in issues", () => {
-        const input = {
-          id: "  quiz-123  ",
-          question: "  Valid question  ",
-          answerType: "single",
-          status: "pending",
-          tagIds: null,
-        };
-
-        const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid question" },
-          {
-            path: ["answerType"],
-            code: "invalid",
-            message: "Invalid answerType",
-          },
-        ];
-
-        const result = suggestQuizSummaryPatches(input, issues);
-
-        // Should only suggest patches for question and answerType, not for id, status, or tagIds
-        expect(result).toHaveLength(2);
-        expect(result).toContainEqual({ question: "Valid question" });
-        expect(result).toContainEqual({ answerType: "single_choice" });
-      });
-
-      it("should suggest patches for all relevant fields when issues exist", () => {
-        const input = {
-          id: "  quiz-123  ",
-          question: "",
-          explanation: "  explanation  ",
-          solutionId: "  solution-456  ",
-          creatorId: "  creator-789  ",
-          answerType: "bool",
-          status: "pending",
-          tagIds: ["valid", "", " trimmed "],
-          approvedAt: undefined,
-        };
-
-        const issues: Issue[] = [
-          { path: ["id"], code: "invalid", message: "Invalid id" },
-          { path: ["question"], code: "invalid", message: "Invalid question" },
-          {
-            path: ["explanation"],
-            code: "invalid",
-            message: "Invalid explanation",
-          },
-          {
-            path: ["solutionId"],
-            code: "invalid",
-            message: "Invalid solutionId",
-          },
-          {
-            path: ["creatorId"],
-            code: "invalid",
-            message: "Invalid creatorId",
-          },
-          {
-            path: ["answerType"],
-            code: "invalid",
-            message: "Invalid answerType",
-          },
-          { path: ["status"], code: "invalid", message: "Invalid status" },
-          { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
-          {
-            path: ["approvedAt"],
-            code: "invalid",
-            message: "Invalid approvedAt",
-          },
-        ];
-
-        const result = suggestQuizSummaryPatches(input, issues);
-
-        expect(result.length).toBeGreaterThan(0);
-
-        // Check for specific patches
-        const hasIdPatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "id" in patch &&
-            patch.id === "quiz-123",
-        );
-        const hasQuestionPatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
-            patch.question === "Sample question",
-        );
-        const hasAnswerTypePatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
-        );
-
-        expect(hasIdPatch).toBe(true);
-        expect(hasQuestionPatch).toBe(true);
-        expect(hasAnswerTypePatch).toBe(true);
-      });
-
-      describe("Integration with applyEntityPatches", () => {
-        it("should apply multiple patches correctly", () => {
-          const input = {
-            id: "  quiz-123  ",
-            question: "",
-            answerType: "bool" as unknown as "boolean",
-            status: "pending" as unknown as "pending_approval",
-            tagIds: null,
-            solutionId: "solution-456",
-            creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
-          };
-
-          const issues: Issue[] = [
-            { path: ["id"], code: "invalid", message: "Invalid id" },
-            {
-              path: ["question"],
-              code: "invalid",
-              message: "Invalid question",
-            },
-            {
-              path: ["answerType"],
-              code: "invalid",
-              message: "Invalid answerType",
-            },
-            { path: ["status"], code: "invalid", message: "Invalid status" },
-            { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
-          ];
-
-          const patches = suggestQuizSummaryPatches(input, issues);
-          const patched: QuizSummaryInput =
-            applyEntityPatches<QuizSummaryInput>(
-              input,
-              patches,
-            ) as QuizSummaryInput;
-
-          expect(patched.id).toBe("quiz-123");
-          expect(patched.question).toBe("Sample question");
-          expect(patched.answerType).toBe("boolean");
-          expect(patched.status).toBe("pending_approval");
-          expect(patched.tagIds).toEqual([]);
-        });
-
-        it("should handle function patches correctly", () => {
-          const input = {
-            tagIds: [
-              "valid",
-              "",
-              " trimmed ",
-              null,
-              123,
-            ] as unknown as string[],
-            id: "quiz-123",
-            question: "Valid question",
-            answerType: "single_choice" as const,
-            solutionId: "solution-456",
-            status: "pending_approval" as const,
-            creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
-          };
-
-          const issues: Issue[] = [
-            { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
-          ];
-
-          const patches = suggestQuizSummaryPatches(input, issues);
-          const patched: QuizSummaryInput =
-            applyEntityPatches<QuizSummaryInput>(
-              input,
-              patches,
-            ) as QuizSummaryInput;
-
-          expect(patched.tagIds).toEqual(["valid", "trimmed"]);
-        });
-
-        it("should handle approved status patch integration", () => {
-          const mockDate = "2023-12-01T10:00:00.000Z";
-          vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
-
-          const input = {
-            status: "approved" as const,
-            approvedAt: undefined,
-            id: "quiz-123",
-            question: "Valid question",
-            answerType: "single_choice" as const,
-            solutionId: "solution-456",
-            creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
-          };
-
-          const issues: Issue[] = [
-            { path: ["status"], code: "invalid", message: "Invalid status" },
-            {
-              path: ["approvedAt"],
-              code: "invalid",
-              message: "Invalid approvedAt",
-            },
-          ];
-
-          const patches = suggestQuizSummaryPatches(input, issues);
-          const patched: QuizSummaryInput =
-            applyEntityPatches<QuizSummaryInput>(
-              input,
-              patches,
-            ) as QuizSummaryInput;
-
-          expect(patched.status).toBe("approved");
-          expect(patched.approvedAt).toBe(mockDate);
-
-          vi.restoreAllMocks();
-        });
-      });
-    });
-  });
-
   describe("Edge Cases and Error Handling", () => {
     it("should handle empty issues array", () => {
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, []);
       expect(result).toEqual([]);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
