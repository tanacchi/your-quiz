# Mutant 7863de6d Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.ts
**Mutator**: StringLiteral
**Original ID**: 9541
**Stable ID**: 7863de6d
**Location**: L37:15–L37:44

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.ts	mutated #9541
@@ -33,9 +33,9 @@
     console.log("Using MockQuizRepository");
     return new MockQuizRepository();
   }
 
-  console.log("Using D1QuizRepository, DB:", !!env.DB);
+  console.log("", !!env.DB);
   if (!env.DB) {
     console.error("ERROR: env.DB is undefined!");
   }
   return new D1QuizRepository(env.DB);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
