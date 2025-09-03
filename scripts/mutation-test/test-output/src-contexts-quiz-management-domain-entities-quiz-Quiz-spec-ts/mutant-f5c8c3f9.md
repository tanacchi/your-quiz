# Mutant f5c8c3f9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 1238
**Stable ID**: f5c8c3f9
**Location**: L422:20–L422:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1238
@@ -418,9 +418,9 @@
           expect(result.isErr()).toBe(true);
 
           if (result.isErr()) {
             expect(result.error.issues).toHaveLength(1);
-            expect(result.error.issues[0]?.path[0]).toBe("question");
+            expect(result.error.issues[0].path[0]).toBe("question");
             expect(result.error.patches.length).toBeGreaterThan(0);
           }
         });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
