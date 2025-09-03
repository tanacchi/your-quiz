# Mutant c68d58e3 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.ts
**Mutator**: StringLiteral
**Original ID**: 9540
**Stable ID**: c68d58e3
**Location**: L33:17–L33:43

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.ts	mutated #9540
@@ -29,9 +29,9 @@
     DB_exists: !!env.DB,
   });
 
   if (shouldUseMock(env)) {
-    console.log("Using MockQuizRepository");
+    console.log("");
     return new MockQuizRepository();
   }
 
   console.log("Using D1QuizRepository, DB:", !!env.DB);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
