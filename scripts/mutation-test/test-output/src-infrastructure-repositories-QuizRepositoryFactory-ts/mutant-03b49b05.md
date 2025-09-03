# Mutant 03b49b05 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.ts
**Mutator**: ConditionalExpression
**Original ID**: 9545
**Stable ID**: 03b49b05
**Location**: L38:7–L38:14

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.ts	mutated #9545
@@ -34,9 +34,9 @@
     return new MockQuizRepository();
   }
 
   console.log("Using D1QuizRepository, DB:", !!env.DB);
-  if (!env.DB) {
+  if (true) {
     console.error("ERROR: env.DB is undefined!");
   }
   return new D1QuizRepository(env.DB);
 }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
