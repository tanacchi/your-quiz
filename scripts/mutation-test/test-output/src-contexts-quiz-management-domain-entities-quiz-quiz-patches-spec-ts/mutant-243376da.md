# Mutant 243376da Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2321
**Stable ID**: 243376da
**Location**: L602:55–L602:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2321
@@ -598,9 +598,9 @@
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
