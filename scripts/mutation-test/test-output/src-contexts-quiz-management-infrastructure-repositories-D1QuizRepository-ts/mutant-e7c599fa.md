# Mutant e7c599fa Report

**File**: src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts
**Mutator**: BooleanLiteral
**Original ID**: 7916
**Stable ID**: e7c599fa
**Location**: L30:55–L30:59

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts	original
+++ src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository.ts	mutated #7916
@@ -26,9 +26,9 @@
  * 型安全なエラーハンドリングを提供します。
  */
 export class D1QuizRepository implements IQuizRepository {
   constructor(private readonly db: D1Database) {
-    console.log("D1QuizRepository constructor - db:", !!db);
+    console.log("D1QuizRepository constructor - db:", !db);
     if (!db) {
       console.error(
         "FATAL: D1Database is undefined in D1QuizRepository constructor!",
       );
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
