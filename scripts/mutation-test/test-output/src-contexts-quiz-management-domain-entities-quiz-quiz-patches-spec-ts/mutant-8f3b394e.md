# Mutant 8f3b394e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2231
**Stable ID**: 8f3b394e
**Location**: L528:19–L528:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2231
@@ -524,9 +524,9 @@
             code: "invalid",
             message: "Invalid answerType",
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
-          { path: ["solution"], code: "invalid", message: "Invalid solution" },
+          { path: [], code: "invalid", message: "Invalid solution" },
         ];
 
         const result = suggestQuizPatches(input, issues);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
