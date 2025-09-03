# Mutant fcd1025a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1908
**Stable ID**: fcd1025a
**Location**: L190:44–L224:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1908
@@ -186,44 +186,10 @@
         });
       });
     });
 
-    describe("suggestStatusPatches", () => {
-      it.each([
-        ["pending", "pending", [{ status: "pending_approval" }]],
-        ["waiting", "waiting", [{ status: "pending_approval" }]],
-        ["draft", "draft", [{ status: "pending_approval" }]],
-        ["approve", "approve", [{ status: "approved" }]],
-        ["accept", "accept", [{ status: "approved" }]],
-        ["published", "published", [{ status: "approved" }]],
-        ["reject", "reject", [{ status: "rejected" }]],
-        ["decline", "decline", [{ status: "rejected" }]],
-        ["denied", "denied", [{ status: "rejected" }]],
-        ["mixed case", "PENDING", [{ status: "pending_approval" }]],
-        ["with spaces", " approve ", [{ status: "approved" }]],
-        [
-          "pending_approval contains pending",
-          "pending_approval",
-          [{ status: "pending_approval" }],
-        ],
-        ["unknown status", "unknown_status", []],
-        ["non-string input", 123, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestStatusPatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestStatusPatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply status correction patch correctly", () => {
-          const input = { ...validQuizInput, status: "pending" };
-          const patches = suggestStatusPatches(input.status);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.status).toBe("pending_approval");
-        });
-      });
-    });
-
     describe("suggestSolutionPatches", () => {
       it("should handle null solution", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
