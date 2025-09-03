# Mutant 25a00cf0 Report

**File**: src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts
**Mutator**: ArrayDeclaration
**Original ID**: 8359
**Stable ID**: 25a00cf0
**Location**: L21:21–L21:44

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts	original
+++ src/contexts/quiz-management/infrastructure/repositories/MockQuizRepository.ts	mutated #8359
@@ -17,9 +17,9 @@
   private readonly mockData: QuizSummary[];
 
   constructor() {
     // D1検証システムを活用した型安全なフィクスチャーロード
-    this.mockData = [...loadQuizFixtures()];
+    this.mockData = [];
   }
 
   create(
     quiz: QuizSummary,
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
