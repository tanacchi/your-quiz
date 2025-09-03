# Mutant 1147b3ab Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9530
**Stable ID**: 1147b3ab
**Location**: L128:20–L130:8

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9530
@@ -124,11 +124,9 @@
       });
       const useMock = shouldUseMock(mockEnv);
       const repository = createQuizRepository(mockEnv);
 
-      if (useMock) {
-        expect(repository).toBeInstanceOf(MockQuizRepository);
-      } else {
+      if (useMock) {} else {
         expect(repository).toBeInstanceOf(D1QuizRepository);
       }
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
