# Mutant 734bdf00 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7119
**Stable ID**: 734bdf00
**Location**: L247:26–L247:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7119
@@ -243,9 +243,9 @@
       it.each([
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
+        ["empty string", "Stryker was here!", false],
         ["null", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validTagData, createdAt };
         const result = TagSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
