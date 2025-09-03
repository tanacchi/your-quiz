# Mutant 7166c89f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1923
**Stable ID**: 7166c89f
**Location**: L194:10–L194:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1923
@@ -190,9 +190,9 @@
     describe("suggestStatusPatches", () => {
       it.each([
         ["pending", "pending", [{ status: "pending_approval" }]],
         ["waiting", "waiting", [{ status: "pending_approval" }]],
-        ["draft", "draft", [{ status: "pending_approval" }]],
+        ["", "draft", [{ status: "pending_approval" }]],
         ["approve", "approve", [{ status: "approved" }]],
         ["accept", "accept", [{ status: "approved" }]],
         ["published", "published", [{ status: "approved" }]],
         ["reject", "reject", [{ status: "rejected" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
