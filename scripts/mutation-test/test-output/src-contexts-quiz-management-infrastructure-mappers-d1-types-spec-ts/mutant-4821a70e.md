# Mutant 4821a70e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7785
**Stable ID**: 4821a70e
**Location**: L490:23–L490:38

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7785
@@ -486,9 +486,9 @@
         { length: 1000 },
         (_, i) =>
           ({
             id: String(i),
-            question: `Question ${i}`,
+            question: ``,
             answer_type: "boolean",
             solution_id: `sol-${i}`,
             status: "approved",
             creator_id: `user-${i}`,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
