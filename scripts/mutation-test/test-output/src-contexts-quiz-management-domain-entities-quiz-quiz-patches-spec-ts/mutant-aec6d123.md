# Mutant aec6d123 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1917
**Stable ID**: aec6d123
**Location**: L193:10–L193:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1917
@@ -189,9 +189,9 @@
 
     describe("suggestStatusPatches", () => {
       it.each([
         ["pending", "pending", [{ status: "pending_approval" }]],
-        ["waiting", "waiting", [{ status: "pending_approval" }]],
+        ["", "waiting", [{ status: "pending_approval" }]],
         ["draft", "draft", [{ status: "pending_approval" }]],
         ["approve", "approve", [{ status: "approved" }]],
         ["accept", "accept", [{ status: "approved" }]],
         ["published", "published", [{ status: "approved" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
