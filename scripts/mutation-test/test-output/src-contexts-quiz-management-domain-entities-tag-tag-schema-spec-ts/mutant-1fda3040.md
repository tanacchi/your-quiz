# Mutant 1fda3040 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7282
**Stable ID**: 1fda3040
**Location**: L500:15–L509:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7282
@@ -496,18 +496,9 @@
       });
     });
 
     describe("Special Characters in Names", () => {
-      it.each([
-        ["special characters", "C++"],
-        ["emoji", "TypeScript 🚀"],
-        ["unicode", "プログラミング言語"],
-        ["spaces", "Programming Language"],
-        ["numbers", "TypeScript 4.9"],
-        ["hyphens", "Front-End"],
-        ["underscores", "Snake_Case"],
-        ["dots", "Node.js"],
-      ])("should accept name with %s", (_desc, name) => {
+      it.each([])("should accept name with %s", (_desc, name) => {
         const data = { ...validTagData, name };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
