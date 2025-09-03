# Mutant 69b2fb4f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 417
**Stable ID**: 69b2fb4f
**Location**: L270:60–L284:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #417
@@ -266,24 +266,10 @@
           expect(result.data.quizId).toEqual(["quiz-1"]);
         }
       });
 
-      it("should coerce string numbers to integers", () => {
-        const rawInput = {
-          limit: "25",
-          offset: "100",
-        };
-        const result = listQueryFromReq.safeParse(rawInput);
-        expect(result.success).toBe(true);
+      it("should coerce string numbers to integers", () => {});
 
-        if (result.success) {
-          expect(result.data.limit).toBe(25);
-          expect(result.data.offset).toBe(100);
-          expect(typeof result.data.limit).toBe("number");
-          expect(typeof result.data.offset).toBe("number");
-        }
-      });
-
       it.each([
         ["valid limit string", { limit: "50" }, 50, true],
         ["valid offset string", { offset: "25" }, 25, true],
         ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
