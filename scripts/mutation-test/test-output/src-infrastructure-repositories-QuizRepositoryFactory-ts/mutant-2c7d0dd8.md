# Mutant 2c7d0dd8 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.ts
**Mutator**: BooleanLiteral
**Original ID**: 9544
**Stable ID**: 2c7d0dd8
**Location**: L38:7–L38:14

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.ts	mutated #9544
@@ -34,9 +34,9 @@
     return new MockQuizRepository();
   }
 
   console.log("Using D1QuizRepository, DB:", !!env.DB);
-  if (!env.DB) {
+  if (env.DB) {
     console.error("ERROR: env.DB is undefined!");
   }
   return new D1QuizRepository(env.DB);
 }
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
