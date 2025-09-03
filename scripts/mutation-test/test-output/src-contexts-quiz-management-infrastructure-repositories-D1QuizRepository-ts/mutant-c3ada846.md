# Mutant c3ada846 Report

**File**: src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts
**Mutator**: StringLiteral
**Original ID**: 7915
**Stable ID**: c3ada846
**Location**: L30:17–L30:53

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts	original
+++ src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts	mutated #7915
@@ -26,9 +26,9 @@
  * 型安全なエラーハンドリングを提供します。
  */
 export class D1QuizRepository implements IQuizRepository {
   constructor(private readonly db: D1Database) {
-    console.log("D1QuizRepository constructor - db:", !!db);
+    console.log("", !!db);
     if (!db) {
       console.error(
         "FATAL: D1Database is undefined in D1QuizRepository constructor!",
       );
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
