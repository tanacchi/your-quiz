# Mutant 64d41f01 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2811
**Stable ID**: 64d41f01
**Location**: L43:39–L54:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2811
@@ -39,20 +39,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
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
+    describe("CreatorIdSchema", () => {});
   });
 
   describe("QuizSchema Validation", () => {
     describe("Required Fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
