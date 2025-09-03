# Mutant 08afe0e5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6642
**Stable ID**: 08afe0e5
**Location**: L338:15–L338:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6642
@@ -334,9 +334,9 @@
   describe("Performance and Large Data Handling", () => {
     it("should handle large number of issues efficiently", () => {
       const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
         path: ["relatedTags"],
-        code: `error-${i}`,
+        code: ``,
         message: `Error ${i}`,
       }));
 
       const input = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
