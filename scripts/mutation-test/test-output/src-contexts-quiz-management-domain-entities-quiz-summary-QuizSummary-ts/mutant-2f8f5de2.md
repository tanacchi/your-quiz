# Mutant 2f8f5de2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4033
**Stable ID**: 2f8f5de2
**Location**: L255:18–L255:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4033
@@ -251,9 +251,9 @@
             code: "custom",
             message: `Tags already exist: ${duplicates.join(", ")}`,
           },
         ],
-        patches: [],
+        patches: ["Stryker was here"],
       };
       return err(error);
     }
     return this.update("tagIds", [...currentTagIds, ...tagIds]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
