# Mutant 7460cf29 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4536
**Stable ID**: 7460cf29
**Location**: L428:20–L428:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4536
@@ -424,9 +424,9 @@
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
           { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           {
-            path: ["approvedAt"],
+            path: [""],
             code: "invalid",
             message: "Invalid approvedAt",
           },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
