# Mutant 4dd8c46d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7276
**Stable ID**: 4dd8c46d
**Location**: L492:51–L496:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7276
@@ -488,13 +488,9 @@
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
 
-      it("should reject 51 character name", () => {
-        const data = { ...validTagData, name: "A".repeat(51) };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
+      it("should reject 51 character name", () => {});
     });
 
     describe("Special Characters in Names", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
