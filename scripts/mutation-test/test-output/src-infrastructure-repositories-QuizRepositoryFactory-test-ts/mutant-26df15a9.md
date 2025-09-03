# Mutant 26df15a9 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9462
**Stable ID**: 26df15a9
**Location**: L50:65–L50:72

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9462
@@ -46,9 +46,9 @@
       expected: false,
     },
     {
       description: "本番環境でUSE_MOCK_DBがfalseの場合はfalse",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
+      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "" }),
       expected: false,
     },
   ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
