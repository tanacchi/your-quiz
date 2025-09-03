# Mutant 7f19fb39 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 515
**Stable ID**: 7f19fb39
**Location**: L345:70–L359:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #515
@@ -341,23 +341,9 @@
         const result = listQueryFromReq.safeParse(mixedInput);
         expect(result.success).toBe(false);
       });
 
-      it("should preserve type safety through transformation", () => {
-        const typedInput = {
-          status: ["approved"] as const,
-          limit: "50",
-          offset: "0",
-        };
-        const result = listQueryFromReq.safeParse(typedInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(Array.isArray(result.data.status)).toBe(true);
-          expect(typeof result.data.limit).toBe("number");
-          expect(typeof result.data.offset).toBe("number");
-        }
-      });
+      it("should preserve type safety through transformation", () => {});
     });
   });
 
   describe("Boundary Values and Edge Cases", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
