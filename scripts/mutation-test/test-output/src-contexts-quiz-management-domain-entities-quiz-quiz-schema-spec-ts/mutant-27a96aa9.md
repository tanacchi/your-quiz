# Mutant 27a96aa9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3182
**Stable ID**: 27a96aa9
**Location**: L398:49–L419:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3182
@@ -394,30 +394,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Complex Boolean Solutions", () => {
-      it.each([
-        ["true value", { id: "sol-1", value: true }],
-        ["false value", { id: "sol-2", value: false }],
-        [
-          "complex id format",
-          {
-            id: "solution-uuid-550e8400-e29b-41d4-a716-446655440000",
-            value: true,
-          },
-        ],
-      ])("should accept %s", (_desc, solution) => {
-        const data = { ...validQuizData, solution };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.solution.value).toBe(solution.value);
-          expect(result.data.solution.id).toBe(solution.id);
-        }
-      });
-    });
+    describe("Complex Boolean Solutions", () => {});
   });
 
   describe("Integration Scenarios", () => {
     it("should handle complete approved boolean quiz", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
