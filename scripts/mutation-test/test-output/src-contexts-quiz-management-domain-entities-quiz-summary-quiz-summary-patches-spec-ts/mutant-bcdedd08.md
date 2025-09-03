# Mutant bcdedd08 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4268
**Stable ID**: bcdedd08
**Location**: L183:44–L216:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4268
@@ -179,43 +179,10 @@
         });
       });
     });
 
-    describe("suggestStatusPatches", () => {
-      it.each([
-        ["pending typo", "pending", [{ status: "pending_approval" }]],
-        ["waiting typo", "waiting", [{ status: "pending_approval" }]],
-        ["approve typo", "approve", [{ status: "approved" }]],
-        ["accept typo", "accept", [{ status: "approved" }]],
-        ["reject typo", "reject", [{ status: "rejected" }]],
-        ["decline typo", "decline", [{ status: "rejected" }]],
-        [
-          "pending_approval contains pending",
-          "pending_approval",
-          [{ status: "pending_approval" }],
-        ],
-        ["unknown typo", "unknown_status", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestStatusPatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestStatusPatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply status correction patch correctly", () => {
-          const input = { ...validQuizSummaryInput, status: "pending" };
-          const patches = suggestStatusPatches(input.status);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.status).toBe("pending_approval");
-        });
-      });
-    });
-
     describe("suggestTagIdsPatches", () => {
       it("should handle null tagIds", () => {
         const result = suggestTagIdsPatches(null);
         expect(result).toEqual([{ tagIds: [] }]);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
