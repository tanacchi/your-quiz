# Mutant e8b231a5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1728
**Stable ID**: e8b231a5
**Location**: L92:49–L124:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1728
@@ -88,42 +88,10 @@
         });
       });
     });
 
-    describe("suggestExplanationPatches", () => {
-      it.each([
-        [
-          "untrimmed explanation",
-          "  Valid explanation  ",
-          [{ explanation: "Valid explanation" }],
-        ],
-        ["exactly 1000 chars", "A".repeat(1000), []],
-        [
-          "1001 chars",
-          "A".repeat(1001),
-          [{ explanation: `${"A".repeat(997)}...` }],
-        ],
-        ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
-        ["non-string input", 123, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestExplanationPatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestExplanationPatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply truncation patch correctly", () => {
-          const longExplanation = "A".repeat(1001);
-          const input = { ...validQuizInput, explanation: longExplanation };
-          const patches = suggestExplanationPatches(input.explanation);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.explanation).toBe(`${"A".repeat(997)}...`);
-          expect(patched.explanation?.length).toBe(1000);
-        });
-      });
-    });
-
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
         ["creatorId field", "creatorId"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
