# Mutant 5f089c6d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4585
**Stable ID**: 5f089c6d
**Location**: L463:61–L574:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4585
@@ -459,120 +459,9 @@
         expect(hasQuestionPatch).toBe(true);
         expect(hasAnswerTypePatch).toBe(true);
       });
 
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
+      describe("Integration with applyEntityPatches", () => {});
     });
   });
 
   describe("Edge Cases and Error Handling", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
