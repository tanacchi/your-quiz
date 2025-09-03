# Mutant 0d7500ce Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2786
**Stable ID**: 0d7500ce
**Location**: L29:43–L55:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2786
@@ -25,36 +25,10 @@
     creatorId: "creator-789",
     createdAt: "2023-12-01 10:00:00",
   };
 
-  describe("Brand Types Re-export", () => {
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
+  describe("Brand Types Re-export", () => {});
 
-    describe("CreatorIdSchema", () => {
-      it.each([
-        ["valid format", "creator-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = CreatorIdSchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
-  });
-
   describe("QuizSchema Validation", () => {
     describe("Required Fields", () => {
       it("should accept valid complete boolean quiz", () => {
         const result = QuizSchema.safeParse(validQuizData);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
