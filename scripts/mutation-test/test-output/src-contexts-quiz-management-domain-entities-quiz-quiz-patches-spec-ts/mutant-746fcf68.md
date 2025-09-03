# Mutant 746fcf68 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1810
**Stable ID**: 746fcf68
**Location**: L157:48–L188:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1810
@@ -153,41 +153,10 @@
         });
       });
     });
 
-    describe("suggestAnswerTypePatches", () => {
-      it.each([
-        ["bool", "bool", [{ answerType: "boolean" }]],
-        ["boolean", "boolean", [{ answerType: "boolean" }]],
-        ["true_false", "true_false", [{ answerType: "boolean" }]],
-        ["truefalse", "truefalse", [{ answerType: "boolean" }]],
-        ["yes_no", "yes_no", [{ answerType: "boolean" }]],
-        ["yesno", "yesno", [{ answerType: "boolean" }]],
-        ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
-        ["○×", "○×", [{ answerType: "boolean" }]],
-        ["ox", "ox", [{ answerType: "boolean" }]],
-        ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
-        ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
-        ["with spaces", " boolean ", [{ answerType: "boolean" }]],
-        ["valid boolean", "boolean", [{ answerType: "boolean" }]],
-        ["unknown type", "single_choice", []],
-        ["non-string input", 123, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestAnswerTypePatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestAnswerTypePatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply boolean correction patch correctly", () => {
-          const input = { ...validQuizInput, answerType: "bool" };
-          const patches = suggestAnswerTypePatches(input.answerType);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.answerType).toBe("boolean");
-        });
-      });
-    });
-
     describe("suggestStatusPatches", () => {
       it.each([
         ["pending", "pending", [{ status: "pending_approval" }]],
         ["waiting", "waiting", [{ status: "pending_approval" }]],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
