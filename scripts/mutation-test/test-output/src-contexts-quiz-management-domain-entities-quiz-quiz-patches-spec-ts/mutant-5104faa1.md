# Mutant 5104faa1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2340
**Stable ID**: 5104faa1
**Location**: L616:21–L616:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2340
@@ -612,9 +612,9 @@
             },
             { path: ["status"], code: "invalid", message: "Invalid status" },
             {
               path: ["solution"],
-              code: "invalid",
+              code: "",
               message: "Invalid solution",
             },
           ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
