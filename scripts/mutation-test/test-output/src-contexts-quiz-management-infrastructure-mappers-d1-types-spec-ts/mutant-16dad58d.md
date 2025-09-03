# Mutant 16dad58d Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7789
**Stable ID**: 16dad58d
**Location**: L494:25–L494:36

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7789
@@ -490,9 +490,9 @@
             question: `Question ${i}`,
             answer_type: "boolean",
             solution_id: `sol-${i}`,
             status: "approved",
-            creator_id: `user-${i}`,
+            creator_id: ``,
             created_at: "2023-01-01T00:00:00Z",
           }) satisfies unknown,
       );
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
