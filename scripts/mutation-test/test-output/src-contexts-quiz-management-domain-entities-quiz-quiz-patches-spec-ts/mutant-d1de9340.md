# Mutant d1de9340 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2538
**Stable ID**: d1de9340
**Location**: L839:55–L839:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2538
@@ -835,9 +835,9 @@
           code: "invalid",
           message: "Invalid answerType",
         },
         { path: ["solution"], code: "invalid", message: "Invalid solution" },
-        { path: ["status"], code: "invalid", message: "Invalid status" },
+        { path: ["status"], code: "invalid", message: "" },
         { path: ["creatorId"], code: "invalid", message: "Invalid creatorId" },
       ];
 
       const patches = suggestQuizPatches(messyInput, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
