# Mutant d9e3ab09 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1977
**Stable ID**: d9e3ab09
**Location**: L204:11–L204:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1977
@@ -200,9 +200,9 @@
         ["denied", "denied", [{ status: "rejected" }]],
         ["mixed case", "PENDING", [{ status: "pending_approval" }]],
         ["with spaces", " approve ", [{ status: "approved" }]],
         [
-          "pending_approval contains pending",
+          "",
           "pending_approval",
           [{ status: "pending_approval" }],
         ],
         ["unknown status", "unknown_status", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
