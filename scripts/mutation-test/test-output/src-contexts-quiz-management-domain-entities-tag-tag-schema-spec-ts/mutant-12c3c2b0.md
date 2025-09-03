# Mutant 12c3c2b0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7125
**Stable ID**: 12c3c2b0
**Location**: L249:80–L253:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7125
@@ -245,13 +245,9 @@
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
-        const data = { ...validTagData, createdAt };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {});
     });
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
