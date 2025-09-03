# Mutant d54a7b37 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6651
**Stable ID**: d54a7b37
**Location**: L356:8–L356:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6651
@@ -352,9 +352,9 @@
       expect(result).toHaveLength(1);
       expect(result[0]).toEqual({ relatedTags: [] });
     });
 
-    it("should handle repeated patch applications", () => {
+    it("", () => {
       let currentInput = {
         id: "tag-123",
         name: "Test Tag",
         createdBy: "user-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
