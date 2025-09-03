# Mutant 1e33fc2d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 3943
**Stable ID**: 1e33fc2d
**Location**: L70:22–L70:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3943
@@ -66,9 +66,9 @@
   if (parsed.success) return ok(QuizSummary.build(parsed.data));
 
   const issues = toIssues(parsed.error);
   const patches = suggestQuizSummaryPatches(input, issues);
-  return err({ kind: "parse", issues, patches });
+  return err({ kind: "", issues, patches });
 }
 
 /**
  * QuizSummary Entity - Immutable domain entity for quiz summary data
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
