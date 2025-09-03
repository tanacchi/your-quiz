# Mutant 2be494a8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 295
**Stable ID**: 2be494a8
**Location**: L154:61–L161:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #295
@@ -150,16 +150,9 @@
           }
         }
       });
 
-      it("should apply default limit when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.limit).toBe(10);
-        }
-      });
+      it("should apply default limit when undefined", () => {});
     });
 
     describe("Offset Field Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
