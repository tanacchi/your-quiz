# Mutant 1abf9f9b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7270
**Stable ID**: 1abf9f9b
**Location**: L486:10–L486:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7270
@@ -482,9 +482,9 @@
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
 
-      it("should accept exactly 50 character name", () => {
+      it("", () => {
         const data = { ...validTagData, name: "A".repeat(50) };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
