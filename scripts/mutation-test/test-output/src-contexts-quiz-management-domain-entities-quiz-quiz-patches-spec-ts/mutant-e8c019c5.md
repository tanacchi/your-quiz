# Mutant e8c019c5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2116
**Stable ID**: e8c019c5
**Location**: L421:12–L421:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2116
@@ -417,9 +417,9 @@
 
           expect(patched.answerType).toBe("boolean");
         });
 
-        it("should apply solution consistency patch correctly", () => {
+        it("", () => {
           const mockTimestamp = 1234567890;
           vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
           const input = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
