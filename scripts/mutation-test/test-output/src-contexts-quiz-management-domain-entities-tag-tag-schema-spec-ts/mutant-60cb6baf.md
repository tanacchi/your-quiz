# Mutant 60cb6baf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7325
**Stable ID**: 60cb6baf
**Location**: L538:12–L538:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7325
@@ -534,9 +534,9 @@
       });
     });
   });
 
-  describe("Integration Scenarios", () => {
+  describe("", () => {
     it("should handle tag with hierarchical relationships", () => {
       const hierarchicalTag = {
         id: "tag-typescript",
         name: "TypeScript",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
