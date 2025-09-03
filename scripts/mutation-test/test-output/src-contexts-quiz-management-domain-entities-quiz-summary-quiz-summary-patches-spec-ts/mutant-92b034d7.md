# Mutant 92b034d7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4200
**Stable ID**: 92b034d7
**Location**: L148:48–L181:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4200
@@ -144,43 +144,10 @@
         });
       });
     });
 
-    describe("suggestAnswerTypePatches", () => {
-      it.each([
-        ["single typo", "single", [{ answerType: "single_choice" }]],
-        ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
-        ["bool typo", "bool", [{ answerType: "boolean" }]],
-        ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
-        ["free typo", "free", [{ answerType: "free_text" }]],
-        ["text typo", "text", [{ answerType: "free_text" }]],
-        [
-          "answerType contains free",
-          "free_form",
-          [{ answerType: "free_text" }],
-        ],
-        ["unknown typo", "unknown_type", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestAnswerTypePatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestAnswerTypePatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply answerType correction patch correctly", () => {
-          const input = { ...validQuizSummaryInput, answerType: "single" };
-          const patches = suggestAnswerTypePatches(input.answerType);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.answerType).toBe("single_choice");
-        });
-      });
-    });
-
     describe("suggestStatusPatches", () => {
       it.each([
         ["pending typo", "pending", [{ status: "pending_approval" }]],
         ["waiting typo", "waiting", [{ status: "pending_approval" }]],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
