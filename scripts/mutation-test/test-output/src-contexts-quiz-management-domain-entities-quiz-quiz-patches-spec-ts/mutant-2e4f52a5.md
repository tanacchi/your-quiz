# Mutant 2e4f52a5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1909
**Stable ID**: 2e4f52a5
**Location**: L191:15–L210:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1909
@@ -187,28 +187,9 @@
       });
     });
 
     describe("suggestStatusPatches", () => {
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
+      it.each([])("should handle %s", (_desc, input, expected) => {
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
