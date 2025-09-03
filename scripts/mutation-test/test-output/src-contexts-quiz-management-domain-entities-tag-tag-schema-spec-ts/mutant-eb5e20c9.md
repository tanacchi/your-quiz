# Mutant eb5e20c9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7275
**Stable ID**: eb5e20c9
**Location**: L492:10–L492:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7275
@@ -488,9 +488,9 @@
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
 
-      it("should reject 51 character name", () => {
+      it("", () => {
         const data = { ...validTagData, name: "A".repeat(51) };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
