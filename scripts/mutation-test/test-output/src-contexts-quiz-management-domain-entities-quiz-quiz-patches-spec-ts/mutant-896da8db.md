# Mutant 896da8db Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2309
**Stable ID**: 896da8db
**Location**: L589:61–L712:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2309
@@ -585,132 +585,9 @@
         );
         expect(hasConsistencyPatch).toBe(true);
       });
 
-      describe("Integration with applyEntityPatches", () => {
-        it("should apply multiple patches correctly", () => {
-          const input = {
-            id: "  quiz-123  " as QuizId,
-            question: "",
-            answerType: "bool" as "boolean",
-            status: "pending" as "pending_approval",
-            solution: null as unknown as BooleanSolutionData,
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
-            {
-              path: ["solution"],
-              code: "invalid",
-              message: "Invalid solution",
-            },
-          ];
-
-          const patches = suggestQuizPatches(input, issues);
-          const patched = applyEntityPatches(input, patches);
-          if (typeof patched === "function") {
-            throw new Error("patched must be an object.");
-          }
-          expect(patched.id).toBe("quiz-123");
-          expect(patched.question).toBe("Sample boolean question?");
-          expect(patched.answerType).toBe("boolean");
-          expect(patched.status).toBe("pending_approval");
-          expect(patched.solution).toBeDefined();
-          expect(patched.solution?.value).toBe(false);
-        });
-
-        it("should handle consistency patches correctly", () => {
-          const mockTimestamp = 1234567890;
-          vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
-
-          const input = {
-            answerType: "bool" as "boolean",
-            solution: undefined as unknown as BooleanSolutionData,
-            id: "quiz-123",
-            question: "Valid question?",
-            status: "pending_approval",
-            creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
-          } as const;
-
-          const issues: Issue[] = [
-            {
-              path: ["answerType"],
-              code: "invalid",
-              message: "Invalid answerType",
-            },
-            {
-              path: ["solution"],
-              code: "invalid",
-              message: "Invalid solution",
-            },
-          ];
-
-          const patches = suggestQuizPatches(input, issues);
-          const patched = applyEntityPatches(input, patches);
-          if (typeof patched === "function") {
-            throw new Error("patched must be an object.");
-          }
-          expect(patched.answerType).toBe("boolean");
-          expect(patched.solution).toEqual({
-            id: `solution-${mockTimestamp}`,
-            value: false,
-          });
-
-          vi.restoreAllMocks();
-        });
-
-        it("should handle truncation patches correctly", () => {
-          const input = {
-            question: "A".repeat(501),
-            explanation: "B".repeat(1001),
-            id: "quiz-123",
-            answerType: "boolean" as const,
-            solution: { id: "solution-123", value: true },
-            status: "pending_approval" as const,
-            creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
-          };
-
-          const issues: Issue[] = [
-            {
-              path: ["question"],
-              code: "invalid",
-              message: "Invalid question",
-            },
-            {
-              path: ["explanation"],
-              code: "invalid",
-              message: "Invalid explanation",
-            },
-          ];
-
-          const patches = suggestQuizPatches(input, issues);
-          const patched = applyEntityPatches(input, patches);
-
-          if (typeof patched === "function") {
-            throw new Error("patched must be an object.");
-          }
-
-          expect(patched.question).toBe(`${"A".repeat(497)}...`);
-          expect(patched.question?.length).toBe(500);
-          expect(patched.explanation).toBe(`${"B".repeat(997)}...`);
-          expect(patched.explanation?.length).toBe(1000);
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
