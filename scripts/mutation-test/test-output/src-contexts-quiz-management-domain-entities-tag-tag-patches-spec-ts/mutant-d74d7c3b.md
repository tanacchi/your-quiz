# Mutant d74d7c3b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6737
**Stable ID**: d74d7c3b
**Location**: L508:29–L514:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6737
@@ -504,15 +504,9 @@
       expect(firstApplication.relatedTags).toEqual([]);
     });
 
     it("should maintain referential integrity of non-patched fields", () => {
-      const originalInput = {
-        id: "tag-integrity",
-        name: "Integrity Test",
-        createdBy: "user-integrity",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null,
-      };
+      const originalInput = {};
 
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
