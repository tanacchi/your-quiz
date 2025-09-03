# Mutant cfb6e2ad Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2027
**Stable ID**: cfb6e2ad
**Location**: L280:10–L280:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2027
@@ -276,9 +276,9 @@
 
         vi.restoreAllMocks();
       });
 
-      it("should handle solution with invalid id", () => {
+      it("", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
         const solutionWithInvalidId = { id: 123, value: true };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
