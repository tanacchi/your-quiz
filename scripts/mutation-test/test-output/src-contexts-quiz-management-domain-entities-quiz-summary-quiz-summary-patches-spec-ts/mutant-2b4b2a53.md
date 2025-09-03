# Mutant 2b4b2a53 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4458
**Stable ID**: 2b4b2a53
**Location**: L363:78–L387:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4458
@@ -359,34 +359,10 @@
           expect(result).toEqual([]);
         });
       });
 
-      it("should only suggest patches for fields mentioned in issues", () => {
-        const input = {
-          id: "  quiz-123  ",
-          question: "  Valid question  ",
-          answerType: "single",
-          status: "pending",
-          tagIds: null,
-        };
+      it("should only suggest patches for fields mentioned in issues", () => {});
 
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
       it("should suggest patches for all relevant fields when issues exist", () => {
         const input = {
           id: "  quiz-123  ",
           question: "",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
