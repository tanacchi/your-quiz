# Mutant a8c6c00d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6559
**Stable ID**: a8c6c00d
**Location**: L227:17–L227:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6559
@@ -223,9 +223,9 @@
         });
 
         it("should preserve other fields when applying patches", () => {
           const input = {
-            id: "tag-typescript",
+            id: "",
             name: "TypeScript Programming",
             createdBy: "user-expert",
             createdAt: "2023-12-01T10:00:00.000Z",
             relatedTags: undefined,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
