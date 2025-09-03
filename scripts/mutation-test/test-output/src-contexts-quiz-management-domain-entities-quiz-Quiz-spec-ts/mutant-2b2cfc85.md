# Mutant 2b2cfc85 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1436
**Stable ID**: 2b2cfc85
**Location**: L690:24–L690:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1436
@@ -686,9 +686,9 @@
             answerType: "bool" as unknown as "boolean", // Invalid
             solution: { id: "sol-multi", value: true },
             status: "pending_approval", // Invalid
             creatorId: "creator-multi",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           const initialErrorCount = draft.getIssues().length;
           expect(initialErrorCount).toBeGreaterThan(0);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
