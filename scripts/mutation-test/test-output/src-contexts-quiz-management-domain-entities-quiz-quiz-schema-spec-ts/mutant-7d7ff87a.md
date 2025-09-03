# Mutant 7d7ff87a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3056
**Stable ID**: 7d7ff87a
**Location**: L234:15–L240:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3056
@@ -230,15 +230,9 @@
       });
     });
 
     describe("Date Fields", () => {
-      it.each([
-        ["SQLite string", "2023-12-01 10:00:00", true],
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
+      it.each([])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validQuizData, createdAt };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
