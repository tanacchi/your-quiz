# Mutant 1227c8ca Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4267
**Stable ID**: 1227c8ca
**Location**: L183:14–L183:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4267
@@ -179,9 +179,9 @@
         });
       });
     });
 
-    describe("suggestStatusPatches", () => {
+    describe("", () => {
       it.each([
         ["pending typo", "pending", [{ status: "pending_approval" }]],
         ["waiting typo", "waiting", [{ status: "pending_approval" }]],
         ["approve typo", "approve", [{ status: "approved" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
