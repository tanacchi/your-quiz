# Mutant cce6da76 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9492
**Stable ID**: cce6da76
**Location**: L91:20–L91:66

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9492
@@ -87,9 +87,9 @@
       env: createMockEnv({ NODE_ENV: "production" }),
       expectedType: D1QuizRepository,
     },
     {
-      description: "本番環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
+      description: "",
       env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
       expectedType: D1QuizRepository,
     },
   ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
