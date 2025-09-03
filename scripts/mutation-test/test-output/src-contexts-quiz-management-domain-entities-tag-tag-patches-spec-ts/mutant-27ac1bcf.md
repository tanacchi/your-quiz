# Mutant 27ac1bcf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6724
**Stable ID**: 27ac1bcf
**Location**: L474:13–L474:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6724
@@ -470,9 +470,9 @@
 
   describe("Consistency and Reliability", () => {
     it("should be idempotent - applying patches multiple times should give same result", () => {
       const input = {
-        id: "tag-consistency",
+        id: "",
         name: "Consistency Test",
         createdBy: "user-tester",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
