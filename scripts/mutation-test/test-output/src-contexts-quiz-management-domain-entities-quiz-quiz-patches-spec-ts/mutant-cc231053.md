# Mutant cc231053 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2393
**Stable ID**: cc231053
**Location**: L690:21–L690:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2393
@@ -686,9 +686,9 @@
 
           const issues: Issue[] = [
             {
               path: ["question"],
-              code: "invalid",
+              code: "",
               message: "Invalid question",
             },
             {
               path: ["explanation"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
