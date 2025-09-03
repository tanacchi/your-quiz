# Mutant 18d395ab Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3228
**Stable ID**: 18d395ab
**Location**: L452:58–L474:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3228
@@ -448,32 +448,10 @@
         expect(result.data.explanation).toBeDefined();
       }
     });
 
-    it("should handle minimal valid boolean quiz", () => {
-      const minimalQuiz = {
-        id: "q",
-        question: "Yes?",
-        answerType: "boolean" as const,
-        solution: {
-          id: "s",
-          value: false,
-        },
-        status: "pending_approval" as const,
-        creatorId: "c",
-        createdAt: "2023-12-01 10:00:00",
-      };
+    it("should handle minimal valid boolean quiz", () => {});
 
-      const result = QuizSchema.safeParse(minimalQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.explanation).toBeUndefined();
-        expect(result.data.approvedAt).toBeUndefined();
-        expect(result.data.solution.value).toBe(false);
-      }
-    });
-
     it("should handle rejected quiz with explanation", () => {
       const rejectedQuiz = {
         ...validQuizData,
         status: "rejected" as const,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
