# Mutant 4cdee58e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5381
**Stable ID**: 4cdee58e
**Location**: L407:50–L426:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5381
@@ -403,26 +403,7 @@
         expect(result.data.approvedAt).toBeDefined();
       }
     });
 
-    it("should handle minimal valid quiz", () => {
-      const minimalQuiz = {
-        id: "q",
-        question: "Q?",
-        answerType: "boolean" as const,
-        solutionId: "s",
-        status: "pending_approval" as const,
-        creatorId: "c",
-        createdAt: "2023-12-01 10:00:00",
-      };
-
-      const result = QuizSummarySchema.safeParse(minimalQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.tagIds).toEqual([]);
-        expect(result.data.explanation).toBeUndefined();
-        expect(result.data.approvedAt).toBeUndefined();
-      }
-    });
+    it("should handle minimal valid quiz", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
