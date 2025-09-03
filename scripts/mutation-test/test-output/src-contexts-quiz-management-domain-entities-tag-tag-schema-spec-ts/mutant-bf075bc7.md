# Mutant bf075bc7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7122
**Stable ID**: bf075bc7
**Location**: L248:10–L248:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7122
@@ -244,9 +244,9 @@
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
-        ["null", null, false],
+        ["", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validTagData, createdAt };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
