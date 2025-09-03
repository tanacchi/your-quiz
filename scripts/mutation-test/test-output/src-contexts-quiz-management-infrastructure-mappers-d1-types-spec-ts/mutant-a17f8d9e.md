# Mutant a17f8d9e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7790
**Stable ID**: a17f8d9e
**Location**: L495:25–L495:47

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7790
@@ -491,9 +491,9 @@
             answer_type: "boolean",
             solution_id: `sol-${i}`,
             status: "approved",
             creator_id: `user-${i}`,
-            created_at: "2023-01-01T00:00:00Z",
+            created_at: "",
           }) satisfies unknown,
       );
 
       largeDataset.forEach((item) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
