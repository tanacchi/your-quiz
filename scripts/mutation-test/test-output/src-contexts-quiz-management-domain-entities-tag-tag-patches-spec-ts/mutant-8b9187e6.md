# Mutant 8b9187e6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6723
**Stable ID**: 8b9187e6
**Location**: L473:21–L479:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6723
@@ -469,15 +469,9 @@
   });
 
   describe("Consistency and Reliability", () => {
     it("should be idempotent - applying patches multiple times should give same result", () => {
-      const input = {
-        id: "tag-consistency",
-        name: "Consistency Test",
-        createdBy: "user-tester",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null,
-      };
+      const input = {};
 
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
