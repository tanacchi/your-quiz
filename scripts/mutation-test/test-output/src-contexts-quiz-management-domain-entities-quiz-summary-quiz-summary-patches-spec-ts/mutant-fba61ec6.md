# Mutant fba61ec6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4626
**Stable ID**: fba61ec6
**Location**: L506:62–L536:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4626
@@ -502,40 +502,10 @@
           expect(patched.status).toBe("pending_approval");
           expect(patched.tagIds).toEqual([]);
         });
 
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
+        it("should handle function patches correctly", () => {});
 
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
         it("should handle approved status patch integration", () => {
           const mockDate = "2023-12-01T10:00:00.000Z";
           vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
