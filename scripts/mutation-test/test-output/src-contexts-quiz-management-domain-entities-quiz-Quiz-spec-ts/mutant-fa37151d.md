# Mutant fa37151d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 917
**Stable ID**: fa37151d
**Location**: L29:61–L32:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #917
@@ -25,12 +25,9 @@
         ["valid with numbers", "quiz123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = QuizId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should handle %s: %s", (_desc, input, isValid) => {});
     });
 
     describe("CreatorId validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
