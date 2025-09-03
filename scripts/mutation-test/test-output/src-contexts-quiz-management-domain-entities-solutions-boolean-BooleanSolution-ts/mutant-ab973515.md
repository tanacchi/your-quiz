# Mutant ab973515 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.ts
**Mutator**: StringLiteral
**Original ID**: 5688
**Stable ID**: ab973515
**Location**: L48:22–L48:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.ts	mutated #5688
@@ -44,9 +44,9 @@
   const parsed = BooleanSolutionSchema.safeParse(input);
   if (parsed.success) return ok(BooleanSolution.build(parsed.data));
 
   const issues = toIssues(parsed.error);
-  return err({ kind: "parse", issues, patches: [] });
+  return err({ kind: "", issues, patches: [] });
 }
 
 /**
  * BooleanSolution Entity - Immutable domain entity for boolean quiz solutions
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
