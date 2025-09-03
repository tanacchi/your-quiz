# Mutant f59e44fb Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6545
**Stable ID**: f59e44fb
**Location**: L197:17–L197:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6545
@@ -193,9 +193,9 @@
 
       describe("Integration with applyEntityPatches", () => {
         it("should apply relatedTags patch correctly", () => {
           const input = {
-            id: "tag-123",
+            id: "",
             name: "TypeScript",
             createdBy: "user-456",
             createdAt: "2023-12-01T10:00:00.000Z",
             relatedTags: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
