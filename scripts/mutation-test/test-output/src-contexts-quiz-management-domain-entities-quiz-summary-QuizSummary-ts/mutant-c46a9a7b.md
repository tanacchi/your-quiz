# Mutant c46a9a7b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3975
**Stable ID**: c46a9a7b
**Location**: L172:18–L172:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3975
@@ -168,9 +168,9 @@
             code: "custom",
             message: `Quiz with status ${this.get("status")} cannot be approved`,
           },
         ],
-        patches: [],
+        patches: ["Stryker was here"],
       };
       return err(error);
     }
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
