# Mutant cecbe018 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7106
**Stable ID**: cecbe018
**Location**: L244:10–L244:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7106
@@ -240,9 +240,9 @@
     });
 
     describe("Date Validation", () => {
       it.each([
-        ["SQLite format", "2023-12-01 10:00:00", true],
+        ["", "2023-12-01 10:00:00", true],
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
