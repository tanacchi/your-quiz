# Mutant e77f9a0e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4643
**Stable ID**: e77f9a0e
**Location**: L538:69–L573:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4643
@@ -534,44 +534,9 @@
 
           expect(patched.tagIds).toEqual(["valid", "trimmed"]);
         });
 
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
+        it("should handle approved status patch integration", () => {});
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
