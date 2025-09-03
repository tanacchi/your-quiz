# Mutant e9a9185e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3249
**Stable ID**: e9a9185e
**Location**: L486:27–L490:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3249
@@ -482,12 +482,8 @@
 
       const result = QuizSchema.safeParse(rejectedQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.status).toBe("rejected");
-        expect(result.data.approvedAt).toBeUndefined();
-        expect(result.data.explanation).toContain("rejected");
-      }
+      if (result.success) {}
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
