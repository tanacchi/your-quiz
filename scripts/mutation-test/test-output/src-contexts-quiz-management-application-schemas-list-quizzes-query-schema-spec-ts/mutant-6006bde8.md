# Mutant 6006bde8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 348
**Stable ID**: 6006bde8
**Location**: L189:62–L196:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #348
@@ -185,16 +185,9 @@
           }
         }
       });
 
-      it("should apply default offset when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.offset).toBe(0);
-        }
-      });
+      it("should apply default offset when undefined", () => {});
     });
 
     describe("Complex Validation Scenarios", () => {
       it("should accept valid complete query", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
