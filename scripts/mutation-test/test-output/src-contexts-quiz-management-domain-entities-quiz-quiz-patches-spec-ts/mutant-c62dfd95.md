# Mutant c62dfd95 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2311
**Stable ID**: c62dfd95
**Location**: L590:61–L632:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2311
@@ -586,52 +586,10 @@
         expect(hasConsistencyPatch).toBe(true);
       });
 
       describe("Integration with applyEntityPatches", () => {
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
+        it("should apply multiple patches correctly", () => {});
 
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
         it("should handle consistency patches correctly", () => {
           const mockTimestamp = 1234567890;
           vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
