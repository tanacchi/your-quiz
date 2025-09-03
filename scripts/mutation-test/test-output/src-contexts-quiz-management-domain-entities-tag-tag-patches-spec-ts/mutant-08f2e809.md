# Mutant 08f2e809 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6568
**Stable ID**: 08f2e809
**Location**: L238:21–L238:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6568
@@ -234,9 +234,9 @@
 
           const issues: Issue[] = [
             {
               path: ["relatedTags"],
-              code: "required",
+              code: "",
               message: "RelatedTags is required",
             },
           ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
