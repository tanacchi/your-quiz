# Mutant 90bcc31d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2513
**Stable ID**: 90bcc31d
**Location**: L826:51–L826:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2513
@@ -822,9 +822,9 @@
         createdAt: "2023-12-01T10:00:00.000Z",
       } as const;
 
       const issues: Issue[] = [
-        { path: ["id"], code: "invalid", message: "Invalid id" },
+        { path: ["id"], code: "invalid", message: "" },
         { path: ["question"], code: "invalid", message: "Invalid question" },
         {
           path: ["explanation"],
           code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
