# Mutant 4ee32771 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6553
**Stable ID**: 4ee32771
**Location**: L207:21–L207:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6553
@@ -203,9 +203,9 @@
 
           const issues: Issue[] = [
             {
               path: ["relatedTags"],
-              code: "invalid",
+              code: "",
               message: "Invalid relatedTags",
             },
           ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
