# Mutant ac39129a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3027
**Stable ID**: ac39129a
**Location**: L219:15–L226:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3027
@@ -215,16 +215,9 @@
       );
     });
 
     describe("Status Field", () => {
-      it.each([
-        ["pending_approval", "pending_approval", true],
-        ["approved without approvedAt", "approved", false],
-        ["rejected", "rejected", true],
-        ["invalid status", "invalid_status", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
+      it.each([])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const data = { ...validQuizData, status };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
