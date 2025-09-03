# Mutant 1e7f5478 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5182
**Stable ID**: 1e7f5478
**Location**: L179:36–L192:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5182
@@ -175,22 +175,9 @@
         },
       );
     });
 
-    describe("Status Field", () => {
-      it.each([
-        ["pending_approval", "pending_approval", true],
-        ["approved without approvedAt", "approved", false],
-        ["rejected", "rejected", true],
-        ["invalid status", "invalid_status", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
-        const data = { ...validQuizSummaryData, status };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("Status Field", () => {});
 
     describe("Optional Fields", () => {
       it("should accept data without explanation", () => {
         const { explanation: _explanation, ...dataWithoutExplanation } =
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
