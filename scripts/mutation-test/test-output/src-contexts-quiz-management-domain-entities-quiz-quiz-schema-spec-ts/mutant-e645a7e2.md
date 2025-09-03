# Mutant e645a7e2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3062
**Stable ID**: e645a7e2
**Location**: L236:10–L236:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3062
@@ -232,9 +232,9 @@
 
     describe("Date Fields", () => {
       it.each([
         ["SQLite string", "2023-12-01 10:00:00", true],
-        ["SQLite format", "2023-12-01 10:00:00", true],
+        ["", "2023-12-01 10:00:00", true],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
