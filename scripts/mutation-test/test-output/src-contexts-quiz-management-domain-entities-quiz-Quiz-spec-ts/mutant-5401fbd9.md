# Mutant 5401fbd9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1216
**Stable ID**: 5401fbd9
**Location**: L395:40–L399:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1216
@@ -391,13 +391,9 @@
             // Test approval workflow
             const approvedResult = quiz.approve("2023-12-02 10:00:00");
             expect(approvedResult.isOk()).toBe(true);
 
-            if (approvedResult.isOk()) {
-              const approvedQuiz = approvedResult.value;
-              expect(approvedQuiz.get("status")).toBe("approved");
-              expect(approvedQuiz.canBeUpdated()).toBe(false);
-            }
+            if (approvedResult.isOk()) {}
           }
         });
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
