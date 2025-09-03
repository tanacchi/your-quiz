# Mutant c69f1d4c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4426
**Stable ID**: c69f1d4c
**Location**: L317:63–L322:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4426
@@ -313,14 +313,9 @@
         [
           "approved status with approvedAt",
           { status: "approved", approvedAt: "2023-12-01T10:00:00.000Z" },
         ],
-      ])("should not suggest patch for %s", (_desc, input) => {
-        const result = suggestApprovedAtPatches(
-          input as Partial<QuizSummaryInput>,
-        );
-        expect(result).toEqual([]);
-      });
+      ])("should not suggest patch for %s", (_desc, input) => {});
 
       describe("Patch Application", () => {
         it("should apply approvedAt patch correctly", () => {
           const mockDate = "2023-12-01T10:00:00.000Z";
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
