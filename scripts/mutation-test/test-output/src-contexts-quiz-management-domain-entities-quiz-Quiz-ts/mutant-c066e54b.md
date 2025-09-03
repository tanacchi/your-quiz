# Mutant c066e54b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1615
**Stable ID**: c066e54b
**Location**: L145:18–L145:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1615
@@ -141,9 +141,9 @@
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
