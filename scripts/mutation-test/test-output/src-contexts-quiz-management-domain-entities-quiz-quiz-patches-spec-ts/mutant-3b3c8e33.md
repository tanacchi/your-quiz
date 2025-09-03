# Mutant 3b3c8e33 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2354
**Stable ID**: 3b3c8e33
**Location**: L634:12–L634:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2354
@@ -630,9 +630,9 @@
           expect(patched.solution).toBeDefined();
           expect(patched.solution?.value).toBe(false);
         });
 
-        it("should handle consistency patches correctly", () => {
+        it("", () => {
           const mockTimestamp = 1234567890;
           vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
           const input = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
