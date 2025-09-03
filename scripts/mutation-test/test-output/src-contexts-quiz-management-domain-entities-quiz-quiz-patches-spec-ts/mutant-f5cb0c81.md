# Mutant f5cb0c81 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1907
**Stable ID**: f5cb0c81
**Location**: L190:14–L190:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1907
@@ -186,9 +186,9 @@
         });
       });
     });
 
-    describe("suggestStatusPatches", () => {
+    describe("", () => {
       it.each([
         ["pending", "pending", [{ status: "pending_approval" }]],
         ["waiting", "waiting", [{ status: "pending_approval" }]],
         ["draft", "draft", [{ status: "pending_approval" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
