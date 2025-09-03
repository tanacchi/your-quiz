# Mutant 7aa87ecc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1349
**Stable ID**: 7aa87ecc
**Location**: L584:31–L588:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1349
@@ -580,13 +580,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
 
-          if (result.isErr()) {
-            // Should have multiple validation errors for missing required fields
-            expect(result.error.issues.length).toBeGreaterThan(0);
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
+          if (result.isErr()) {}
         });
 
         it("should handle partially filled draft", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
