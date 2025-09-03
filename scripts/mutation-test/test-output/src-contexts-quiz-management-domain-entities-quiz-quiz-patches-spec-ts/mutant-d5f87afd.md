# Mutant d5f87afd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2379
**Stable ID**: d5f87afd
**Location**: L675:64–L711:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2379
@@ -671,45 +671,9 @@
 
           vi.restoreAllMocks();
         });
 
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
+        it("should handle truncation patches correctly", () => {});
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
