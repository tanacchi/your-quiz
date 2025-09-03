# Mutant a73e8406 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4657
**Stable ID**: a73e8406
**Location**: L554:59–L554:75

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4657
@@ -550,9 +550,9 @@
             createdAt: "2023-12-01T10:00:00.000Z",
           };
 
           const issues: Issue[] = [
-            { path: ["status"], code: "invalid", message: "Invalid status" },
+            { path: ["status"], code: "invalid", message: "" },
             {
               path: ["approvedAt"],
               code: "invalid",
               message: "Invalid approvedAt",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
