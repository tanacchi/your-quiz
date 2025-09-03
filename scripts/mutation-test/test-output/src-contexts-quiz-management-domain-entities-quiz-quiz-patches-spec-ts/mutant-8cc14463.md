# Mutant 8cc14463 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 2352
**Stable ID**: 8cc14463
**Location**: L631:18–L631:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2352
@@ -627,9 +627,9 @@
           expect(patched.question).toBe("Sample boolean question?");
           expect(patched.answerType).toBe("boolean");
           expect(patched.status).toBe("pending_approval");
           expect(patched.solution).toBeDefined();
-          expect(patched.solution?.value).toBe(false);
+          expect(patched.solution.value).toBe(false);
         });
 
         it("should handle consistency patches correctly", () => {
           const mockTimestamp = 1234567890;
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
