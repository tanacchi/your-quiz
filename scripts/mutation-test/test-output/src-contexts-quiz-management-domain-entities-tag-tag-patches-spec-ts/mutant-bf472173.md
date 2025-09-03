# Mutant bf472173 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6721
**Stable ID**: bf472173
**Location**: L472:8–L472:88

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6721
@@ -468,9 +468,9 @@
     });
   });
 
   describe("Consistency and Reliability", () => {
-    it("should be idempotent - applying patches multiple times should give same result", () => {
+    it("", () => {
       const input = {
         id: "tag-consistency",
         name: "Consistency Test",
         createdBy: "user-tester",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
