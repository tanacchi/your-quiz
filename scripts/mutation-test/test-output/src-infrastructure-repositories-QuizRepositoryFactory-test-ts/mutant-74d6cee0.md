# Mutant 74d6cee0 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9495
**Stable ID**: 74d6cee0
**Location**: L92:65–L92:72

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9495
@@ -88,9 +88,9 @@
       expectedType: D1QuizRepository,
     },
     {
       description: "本番環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
+      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "" }),
       expectedType: D1QuizRepository,
     },
   ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
