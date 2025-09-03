# Mutant b854b23d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1237
**Stable ID**: b854b23d
**Location**: L420:31–L424:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1237
@@ -416,13 +416,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
 
-          if (result.isErr()) {
-            expect(result.error.issues).toHaveLength(1);
-            expect(result.error.issues[0]?.path[0]).toBe("question");
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
+          if (result.isErr()) {}
         });
 
         it("should handle missing required fields", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
