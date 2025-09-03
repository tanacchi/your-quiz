# Mutant ff86fafd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1583
**Stable ID**: ff86fafd
**Location**: L46:22–L46:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1583
@@ -42,9 +42,9 @@
   if (parsed.success) return ok(Quiz.build(parsed.data));
 
   const issues = toIssues(parsed.error);
   const patches = suggestQuizPatches(input, issues);
-  return err({ kind: "parse", issues, patches });
+  return err({ kind: "", issues, patches });
 }
 
 /**
  * Quiz Entity - Immutable domain entity for quiz management with BooleanSolution integration
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
