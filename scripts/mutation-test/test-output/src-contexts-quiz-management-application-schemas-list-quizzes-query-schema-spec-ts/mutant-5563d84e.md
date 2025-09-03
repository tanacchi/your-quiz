# Mutant 5563d84e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 572
**Stable ID**: 5563d84e
**Location**: L386:75–L390:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #572
@@ -382,13 +382,9 @@
         ["just below minimum", -1, false],
         ["small positive", 1, true],
         ["large positive", 999999, true],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, true],
-      ])("should handle offset boundary: %s", (_desc, offset, isValid) => {
-        const input = { offset };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should handle offset boundary: %s", (_desc, offset, isValid) => {});
     });
 
     describe("Array Edge Cases", () => {
       it("should handle empty arrays correctly", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
