# Mutant 52f9c5fd Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6751
**Stable ID**: 52f9c5fd
**Location**: L542:21–L548:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6751
@@ -538,15 +538,9 @@
       expect(patchedInput.relatedTags).not.toBe(originalInput.relatedTags);
     });
 
     it("should handle concurrent issue types gracefully", () => {
-      const input = {
-        id: "tag-concurrent",
-        name: "Concurrent Test",
-        createdBy: "user-concurrent",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null,
-      };
+      const input = {};
 
       const mixedIssues: Issue[] = [
         {
           path: ["relatedTags"],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
