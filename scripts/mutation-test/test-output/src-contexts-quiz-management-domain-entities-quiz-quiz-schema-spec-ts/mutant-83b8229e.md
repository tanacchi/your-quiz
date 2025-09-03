# Mutant 83b8229e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3054
**Stable ID**: 83b8229e
**Location**: L233:14–L233:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3054
@@ -229,9 +229,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Date Fields", () => {
+    describe("", () => {
       it.each([
         ["SQLite string", "2023-12-01 10:00:00", true],
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["invalid date", "invalid-date", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
