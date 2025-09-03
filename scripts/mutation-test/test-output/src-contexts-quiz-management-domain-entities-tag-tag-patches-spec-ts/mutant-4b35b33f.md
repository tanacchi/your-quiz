# Mutant 4b35b33f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6558
**Stable ID**: 4b35b33f
**Location**: L226:25–L233:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6558
@@ -222,16 +222,9 @@
           expect(patched.createdAt).toBe(input.createdAt);
         });
 
         it("should preserve other fields when applying patches", () => {
-          const input = {
-            id: "tag-typescript",
-            name: "TypeScript Programming",
-            createdBy: "user-expert",
-            createdAt: "2023-12-01T10:00:00.000Z",
-            relatedTags: undefined,
-            extraData: "should be preserved", // This would be removed by strict schema, but patch doesn't affect it
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
