# Mutant d1270c28 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1929
**Stable ID**: d1270c28
**Location**: L195:10–L195:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1929
@@ -191,9 +191,9 @@
       it.each([
         ["pending", "pending", [{ status: "pending_approval" }]],
         ["waiting", "waiting", [{ status: "pending_approval" }]],
         ["draft", "draft", [{ status: "pending_approval" }]],
-        ["approve", "approve", [{ status: "approved" }]],
+        ["", "approve", [{ status: "approved" }]],
         ["accept", "accept", [{ status: "approved" }]],
         ["published", "published", [{ status: "approved" }]],
         ["reject", "reject", [{ status: "rejected" }]],
         ["decline", "decline", [{ status: "rejected" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
