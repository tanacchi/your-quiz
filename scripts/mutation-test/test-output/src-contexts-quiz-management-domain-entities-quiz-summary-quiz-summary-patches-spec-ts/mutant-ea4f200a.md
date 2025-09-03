# Mutant ea4f200a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 4369
**Stable ID**: ea4f200a
**Location**: L254:25–L254:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4369
@@ -250,9 +250,9 @@
       });
 
       describe("Patch Application", () => {
         it("should apply null tagIds patch correctly", () => {
-          const input = { ...validQuizSummaryInput, tagIds: null };
+          const input = {};
           const patches = suggestTagIdsPatches(input.tagIds);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
           if (!patch) throw new Error("Expected patch to exist");
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
