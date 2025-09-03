# Mutant 5f771fda Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6526
**Stable ID**: 5f771fda
**Location**: L171:22–L171:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6526
@@ -167,9 +167,9 @@
         const input = {
           id: "tag-123",
           name: "Valid Tag",
           createdBy: "user-456",
-          createdAt: "2023-12-01T10:00:00.000Z",
+          createdAt: "",
           relatedTags: undefined,
         };
 
         const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
