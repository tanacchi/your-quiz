# Mutant 18488eba Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 769
**Stable ID**: 18488eba
**Location**: L622:46–L652:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #769
@@ -618,37 +618,7 @@
         }
       });
     });
 
-    describe("Performance and Memory", () => {
-      it("should handle validation performance within reasonable time", () => {
-        const startTime = performance.now();
-
-        const largeInput = {
-          status: ["approved"],
-          creatorId: "creator-performance-test",
-          quizId: Array(100)
-            .fill(0)
-            .map((_, i) => `quiz-${i}`),
-          limit: 100,
-          offset: 0,
-        };
-
-        const result = listQuizzesQuerySchema.safeParse(largeInput);
-        const endTime = performance.now();
-
-        expect(result.success).toBe(true);
-        expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
-      });
-
-      it("should maintain memory efficiency with repeated validations", () => {
-        const input = { status: ["approved"], limit: 10, offset: 0 };
-
-        // Validate the same input multiple times
-        for (let i = 0; i < 100; i++) {
-          const result = listQuizzesQuerySchema.safeParse(input);
-          expect(result.success).toBe(true);
-        }
-      });
-    });
+    describe("Performance and Memory", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
