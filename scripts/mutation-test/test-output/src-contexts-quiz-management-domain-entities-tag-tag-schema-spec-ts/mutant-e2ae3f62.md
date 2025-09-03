# Mutant e2ae3f62 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7308
**Stable ID**: e2ae3f62
**Location**: L509:57–L513:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7308
@@ -505,13 +505,9 @@
         ["numbers", "TypeScript 4.9"],
         ["hyphens", "Front-End"],
         ["underscores", "Snake_Case"],
         ["dots", "Node.js"],
-      ])("should accept name with %s", (_desc, name) => {
-        const data = { ...validTagData, name };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+      ])("should accept name with %s", (_desc, name) => {});
     });
 
     describe("Large Related Tags Arrays", () => {
       it("should handle many related tags", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
