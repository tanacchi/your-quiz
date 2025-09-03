# Mutant a81ee09b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7111
**Stable ID**: a81ee09b
**Location**: L245:30–L245:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7111
@@ -241,9 +241,9 @@
 
     describe("Date Validation", () => {
       it.each([
         ["SQLite format", "2023-12-01 10:00:00", true],
-        ["SQLite date only", "2023-12-01", false],
+        ["SQLite date only", "", false],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
