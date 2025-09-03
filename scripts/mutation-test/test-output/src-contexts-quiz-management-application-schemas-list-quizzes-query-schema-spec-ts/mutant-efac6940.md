# Mutant efac6940 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 506
**Stable ID**: efac6940
**Location**: L334:72–L343:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #506
@@ -330,18 +330,9 @@
           expect(typeof result.data.offset).toBe("number");
         }
       });
 
-      it("should handle mixed valid and invalid data correctly", () => {
-        const mixedInput = {
-          status: ["approved"], // valid
-          creatorId: "", // invalid - empty string
-          limit: "15", // valid
-          offset: "-5", // invalid - negative
-        };
-        const result = listQueryFromReq.safeParse(mixedInput);
-        expect(result.success).toBe(false);
-      });
+      it("should handle mixed valid and invalid data correctly", () => {});
 
       it("should preserve type safety through transformation", () => {
         const typedInput = {
           status: ["approved"] as const,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
