# Mutant 1de772fe Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.ts
**Mutator**: BooleanLiteral
**Original ID**: 9536
**Stable ID**: 1de772fe
**Location**: L29:17–L29:24

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.ts	mutated #9536
@@ -25,9 +25,9 @@
 export function createQuizRepository(env: CloudflareBindings): IQuizRepository {
   console.log("QuizRepositoryFactory - env:", {
     NODE_ENV: env.NODE_ENV,
     USE_MOCK_DB: env.USE_MOCK_DB,
-    DB_exists: !!env.DB,
+    DB_exists: !env.DB,
   });
 
   if (shouldUseMock(env)) {
     console.log("Using MockQuizRepository");
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
