# Mutant 137c2b6d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7102
**Stable ID**: 137c2b6d
**Location**: L242:14–L242:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7102
@@ -238,9 +238,9 @@
         });
       });
     });
 
-    describe("Date Validation", () => {
+    describe("", () => {
       it.each([
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
