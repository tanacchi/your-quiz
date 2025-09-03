# Mutant 6bd0aeda Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7103
**Stable ID**: 6bd0aeda
**Location**: L242:39–L254:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7103
@@ -238,21 +238,9 @@
         });
       });
     });
 
-    describe("Date Validation", () => {
-      it.each([
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["SQLite date only", "2023-12-01", false],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
-        const data = { ...validTagData, createdAt };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("Date Validation", () => {});
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
