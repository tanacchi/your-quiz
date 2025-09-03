# Mutant 40a99df1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6544
**Stable ID**: 40a99df1
**Location**: L196:25–L202:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6544
@@ -192,15 +192,9 @@
       });
 
       describe("Integration with applyEntityPatches", () => {
         it("should apply relatedTags patch correctly", () => {
-          const input = {
-            id: "tag-123",
-            name: "TypeScript",
-            createdBy: "user-456",
-            createdAt: "2023-12-01T10:00:00.000Z",
-            relatedTags: null,
-          };
+          const input = {};
 
           const issues: Issue[] = [
             {
               path: ["relatedTags"],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
