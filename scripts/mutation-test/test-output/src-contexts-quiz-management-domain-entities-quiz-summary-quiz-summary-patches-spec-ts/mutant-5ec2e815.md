# Mutant 5ec2e815 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4535
**Stable ID**: 5ec2e815
**Location**: L428:19–L428:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4535
@@ -424,9 +424,9 @@
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
           { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           {
-            path: ["approvedAt"],
+            path: [],
             code: "invalid",
             message: "Invalid approvedAt",
           },
         ];
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
