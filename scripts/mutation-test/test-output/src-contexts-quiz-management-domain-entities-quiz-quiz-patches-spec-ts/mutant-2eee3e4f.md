# Mutant 2eee3e4f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2198
**Stable ID**: 2eee3e4f
**Location**: L505:19–L505:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2198
@@ -501,9 +501,9 @@
           question: "",
           explanation: "A".repeat(1001),
           creatorId: "  creator-789  ",
           answerType: "bool",
-          status: "pending",
+          status: "",
           solution: null,
         };
 
         const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
