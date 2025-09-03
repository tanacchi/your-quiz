# Mutant b7e738a5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4599
**Stable ID**: b7e738a5
**Location**: L477:55–L477:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4599
@@ -473,9 +473,9 @@
             createdAt: "2023-12-01T10:00:00.000Z",
           };
 
           const issues: Issue[] = [
-            { path: ["id"], code: "invalid", message: "Invalid id" },
+            { path: ["id"], code: "invalid", message: "" },
             {
               path: ["question"],
               code: "invalid",
               message: "Invalid question",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
