# Mutant 632ef964 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6719
**Stable ID**: 632ef964
**Location**: L471:12–L471:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6719
@@ -467,9 +467,9 @@
       expect(fixedInput.name).toBe("Imported Tag");
     });
   });
 
-  describe("Consistency and Reliability", () => {
+  describe("", () => {
     it("should be idempotent - applying patches multiple times should give same result", () => {
       const input = {
         id: "tag-consistency",
         name: "Consistency Test",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
