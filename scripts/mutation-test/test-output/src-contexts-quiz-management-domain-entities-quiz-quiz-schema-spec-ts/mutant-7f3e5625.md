# Mutant 7f3e5625 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3200
**Stable ID**: 7f3e5625
**Location**: L409:51–L418:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3200
@@ -405,18 +405,9 @@
             id: "solution-uuid-550e8400-e29b-41d4-a716-446655440000",
             value: true,
           },
         ],
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
+      ])("should accept %s", (_desc, solution) => {});
     });
   });
 
   describe("Integration Scenarios", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
