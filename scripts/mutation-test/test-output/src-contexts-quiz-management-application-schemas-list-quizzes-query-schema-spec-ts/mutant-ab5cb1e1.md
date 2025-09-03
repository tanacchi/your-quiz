# Mutant ab5cb1e1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 293
**Stable ID**: ab5cb1e1
**Location**: L148:18–L150:12

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #293
@@ -144,11 +144,9 @@
 
         if (isValid && result.success) {
           if (limit !== undefined) {
             expect(result.data.limit).toBe(limit);
-          } else {
-            expect(result.data.limit).toBe(10); // default
-          }
+          } else {}
         }
       });
 
       it("should apply default limit when undefined", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
