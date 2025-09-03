# Mutant d43b8d3a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7124
**Stable ID**: d43b8d3a
**Location**: L249:10–L249:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7124
@@ -245,9 +245,9 @@
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
+      ])("", (_desc, createdAt, isValid) => {
         const data = { ...validTagData, createdAt };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
