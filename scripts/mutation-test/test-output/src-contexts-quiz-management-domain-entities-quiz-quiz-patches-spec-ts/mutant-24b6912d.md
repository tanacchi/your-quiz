# Mutant 24b6912d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1911
**Stable ID**: 24b6912d
**Location**: L192:10–L192:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1911
@@ -188,9 +188,9 @@
     });
 
     describe("suggestStatusPatches", () => {
       it.each([
-        ["pending", "pending", [{ status: "pending_approval" }]],
+        ["", "pending", [{ status: "pending_approval" }]],
         ["waiting", "waiting", [{ status: "pending_approval" }]],
         ["draft", "draft", [{ status: "pending_approval" }]],
         ["approve", "approve", [{ status: "approved" }]],
         ["accept", "accept", [{ status: "approved" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
