# Mutant ea684e33 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7104
**Stable ID**: ea684e33
**Location**: L243:15–L249:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7104
@@ -239,15 +239,9 @@
       });
     });
 
     describe("Date Validation", () => {
-      it.each([
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["SQLite date only", "2023-12-01", false],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
+      it.each([])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validTagData, createdAt };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
