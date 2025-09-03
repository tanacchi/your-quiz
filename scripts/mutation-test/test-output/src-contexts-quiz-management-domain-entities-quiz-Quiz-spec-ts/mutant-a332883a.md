# Mutant a332883a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1427
**Stable ID**: a332883a
**Location**: L681:61–L704:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1427
@@ -677,33 +677,10 @@
             }
           }
         });
 
-        it("should apply multiple patches correctly", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-multi-patch",
-            question: "  ", // Invalid
-            answerType: "bool" as unknown as "boolean", // Invalid
-            solution: { id: "sol-multi", value: true },
-            status: "pending_approval", // Invalid
-            creatorId: "creator-multi",
-            createdAt: "2023-12-01 10:00:00",
-          });
+        it("should apply multiple patches correctly", () => {});
 
-          const initialErrorCount = draft.getIssues().length;
-          expect(initialErrorCount).toBeGreaterThan(0);
-
-          const patches = draft.getPatches();
-          expect(patches.length).toBeGreaterThan(0);
-
-          draft.applyPatches(patches);
-
-          // After applying all patches, error count should be reduced
-          const finalErrorCount = draft.getIssues().length;
-          expect(finalErrorCount).toBeLessThanOrEqual(initialErrorCount);
-        });
-
         it("should handle empty patches array", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-empty-patches",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
