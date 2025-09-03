# Mutant e2b7ba6e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1947
**Stable ID**: e2b7ba6e
**Location**: L198:10–L198:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1947
@@ -194,9 +194,9 @@
         ["draft", "draft", [{ status: "pending_approval" }]],
         ["approve", "approve", [{ status: "approved" }]],
         ["accept", "accept", [{ status: "approved" }]],
         ["published", "published", [{ status: "approved" }]],
-        ["reject", "reject", [{ status: "rejected" }]],
+        ["", "reject", [{ status: "rejected" }]],
         ["decline", "decline", [{ status: "rejected" }]],
         ["denied", "denied", [{ status: "rejected" }]],
         ["mixed case", "PENDING", [{ status: "pending_approval" }]],
         ["with spaces", " approve ", [{ status: "approved" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
