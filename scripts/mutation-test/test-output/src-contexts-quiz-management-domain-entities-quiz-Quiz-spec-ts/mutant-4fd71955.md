# Mutant 4fd71955 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1551
**Stable ID**: 4fd71955
**Location**: L835:11–L837:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1551
@@ -831,11 +831,9 @@
         if (
           answerTypePatch &&
           typeof answerTypePatch === "object" &&
           "answerType" in answerTypePatch
-        ) {
-          expect(answerTypePatch.answerType).toBe("boolean");
-        }
+        ) {}
       }
     });
 
     it("should suggest status fixes", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
