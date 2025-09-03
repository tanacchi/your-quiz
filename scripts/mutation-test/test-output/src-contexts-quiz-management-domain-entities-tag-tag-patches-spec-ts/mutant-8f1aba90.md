# Mutant 8f1aba90 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6646
**Stable ID**: 8f1aba90
**Location**: L344:15–L344:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6646
@@ -340,9 +340,9 @@
       }));
 
       const input = {
         id: "tag-123",
-        name: "Test Tag",
+        name: "",
         createdBy: "user-456",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
