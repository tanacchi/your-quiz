# Mutant 255c7bf7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2788
**Stable ID**: 255c7bf7
**Location**: L30:36–L41:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2788
@@ -26,20 +26,9 @@
     createdAt: "2023-12-01 10:00:00",
   };
 
   describe("Brand Types Re-export", () => {
-    describe("QuizIdSchema", () => {
-      it.each([
-        ["valid format", "quiz-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = QuizIdSchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("QuizIdSchema", () => {});
 
     describe("CreatorIdSchema", () => {
       it.each([
         ["valid format", "creator-123", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
