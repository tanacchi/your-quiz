# Mutant e5a0d738 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1779
**Stable ID**: e5a0d738
**Location**: L130:10–L130:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1779
@@ -126,9 +126,9 @@
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
         ["creatorId field", "creatorId"],
-      ])("should handle %s", (_desc, fieldName) => {
+      ])("", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(fieldName as keyof QuizInput);
 
         const testCases = [
           ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
