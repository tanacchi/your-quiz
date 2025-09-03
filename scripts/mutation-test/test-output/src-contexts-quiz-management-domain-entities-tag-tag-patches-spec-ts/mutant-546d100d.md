# Mutant 546d100d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6725
**Stable ID**: 546d100d
**Location**: L475:15–L475:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6725
@@ -471,9 +471,9 @@
   describe("Consistency and Reliability", () => {
     it("should be idempotent - applying patches multiple times should give same result", () => {
       const input = {
         id: "tag-consistency",
-        name: "Consistency Test",
+        name: "",
         createdBy: "user-tester",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
