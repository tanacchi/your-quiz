# Mutant 87e3980a Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9459
**Stable ID**: 87e3980a
**Location**: L49:20–L49:53

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9459
@@ -45,9 +45,9 @@
       env: createMockEnv({ NODE_ENV: "production" }),
       expected: false,
     },
     {
-      description: "本番環境でUSE_MOCK_DBがfalseの場合はfalse",
+      description: "",
       env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
       expected: false,
     },
   ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
