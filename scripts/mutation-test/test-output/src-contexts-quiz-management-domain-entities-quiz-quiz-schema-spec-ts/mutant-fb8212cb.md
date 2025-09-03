# Mutant fb8212cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2928
**Stable ID**: fb8212cb
**Location**: L130:15–L137:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2928
@@ -126,16 +126,9 @@
           expect(result.data.answerType).toBe("boolean");
         }
       });
 
-      it.each([
-        ["single_choice", "single_choice"],
-        ["multiple_choice", "multiple_choice"],
-        ["free_text", "free_text"],
-        ["invalid_type", "invalid_type"],
-        ["", ""],
-        [null, null],
-      ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
+      it.each([])("should reject non-boolean answerType: %s", (_desc, answerType) => {
         const data = { ...validQuizData, answerType };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
