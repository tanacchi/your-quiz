# Mutant d266b11a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3991
**Stable ID**: d266b11a
**Location**: L203:18–L203:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3991
@@ -199,9 +199,9 @@
             code: "custom",
             message: `Tag ${tagId} already exists`,
           },
         ],
-        patches: [],
+        patches: ["Stryker was here"],
       };
       return err(error);
     }
     return this.update("tagIds", [...currentTagIds, tagId]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
