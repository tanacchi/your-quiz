# Mutant 41790ac8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 782
**Stable ID**: 41790ac8
**Location**: L643:79–L651:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #782
@@ -639,16 +639,8 @@
         expect(result.success).toBe(true);
         expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
       });
 
-      it("should maintain memory efficiency with repeated validations", () => {
-        const input = { status: ["approved"], limit: 10, offset: 0 };
-
-        // Validate the same input multiple times
-        for (let i = 0; i < 100; i++) {
-          const result = listQuizzesQuerySchema.safeParse(input);
-          expect(result.success).toBe(true);
-        }
-      });
+      it("should maintain memory efficiency with repeated validations", () => {});
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
