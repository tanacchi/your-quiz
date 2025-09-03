# Mutant d7620b18 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4654
**Stable ID**: d7620b18
**Location**: L554:21–L554:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4654
@@ -550,9 +550,9 @@
             createdAt: "2023-12-01T10:00:00.000Z",
           };
 
           const issues: Issue[] = [
-            { path: ["status"], code: "invalid", message: "Invalid status" },
+            { path: [], code: "invalid", message: "Invalid status" },
             {
               path: ["approvedAt"],
               code: "invalid",
               message: "Invalid approvedAt",
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
