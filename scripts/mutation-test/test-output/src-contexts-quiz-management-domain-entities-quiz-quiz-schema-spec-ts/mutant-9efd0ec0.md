# Mutant 9efd0ec0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3243
**Stable ID**: 9efd0ec0
**Location**: L476:62–L491:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3243
@@ -472,22 +472,7 @@
         expect(result.data.solution.value).toBe(false);
       }
     });
 
-    it("should handle rejected quiz with explanation", () => {
-      const rejectedQuiz = {
-        ...validQuizData,
-        status: "rejected" as const,
-        explanation: "This quiz was rejected due to unclear wording.",
-      };
-
-      const result = QuizSchema.safeParse(rejectedQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.status).toBe("rejected");
-        expect(result.data.approvedAt).toBeUndefined();
-        expect(result.data.explanation).toContain("rejected");
-      }
-    });
+    it("should handle rejected quiz with explanation", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
