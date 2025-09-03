# Mutant f5a5b172 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1935
**Stable ID**: f5a5b172
**Location**: L196:10–L196:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1935
@@ -192,9 +192,9 @@
         ["pending", "pending", [{ status: "pending_approval" }]],
         ["waiting", "waiting", [{ status: "pending_approval" }]],
         ["draft", "draft", [{ status: "pending_approval" }]],
         ["approve", "approve", [{ status: "approved" }]],
-        ["accept", "accept", [{ status: "approved" }]],
+        ["", "accept", [{ status: "approved" }]],
         ["published", "published", [{ status: "approved" }]],
         ["reject", "reject", [{ status: "rejected" }]],
         ["decline", "decline", [{ status: "rejected" }]],
         ["denied", "denied", [{ status: "rejected" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
