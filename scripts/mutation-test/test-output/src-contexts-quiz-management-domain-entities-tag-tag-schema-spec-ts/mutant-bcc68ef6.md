# Mutant bcc68ef6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7327
**Stable ID**: bcc68ef6
**Location**: L539:8–L539:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7327
@@ -535,9 +535,9 @@
     });
   });
 
   describe("Integration Scenarios", () => {
-    it("should handle tag with hierarchical relationships", () => {
+    it("", () => {
       const hierarchicalTag = {
         id: "tag-typescript",
         name: "TypeScript",
         createdBy: "user-expert",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
