# Mutant 7b8c2e78 Report

**File**: src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts
**Mutator**: BlockStatement
**Original ID**: 8358
**Stable ID**: 7b8c2e78
**Location**: L19:17–L22:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts	original
+++ src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts	mutated #8358
@@ -15,12 +15,9 @@
  */
 export class MockQuizRepository implements IQuizRepository {
   private readonly mockData: QuizSummary[];
 
-  constructor() {
-    // D1検証システムを活用した型安全なフィクスチャーロード
-    this.mockData = [...loadQuizFixtures()];
-  }
+  constructor() {}
 
   create(
     quiz: QuizSummary,
     _solution: components["schemas"]["Solution"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
