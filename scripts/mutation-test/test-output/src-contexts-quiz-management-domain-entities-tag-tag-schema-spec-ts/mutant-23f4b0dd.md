# Mutant 23f4b0dd Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7357
**Stable ID**: 23f4b0dd
**Location**: L583:8–L583:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7357
@@ -579,9 +579,9 @@
         ]);
       }
     });
 
-    it("should handle minimal tag without related tags", () => {
+    it("", () => {
       const minimalTag = {
         id: "t",
         name: "T",
         createdBy: "u",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
