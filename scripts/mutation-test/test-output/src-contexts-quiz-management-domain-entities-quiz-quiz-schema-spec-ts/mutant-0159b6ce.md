# Mutant 0159b6ce Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3086
**Stable ID**: 0159b6ce
**Location**: L255:50–L262:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3086
@@ -251,16 +251,9 @@
           expect(result.data.approvedAt).toBeUndefined();
         }
       });
 
-      it("should accept valid approvedAt", () => {
-        const dataWithApprovedAt = {
-          ...validQuizData,
-          approvedAt: "2023-12-02 15:00:00",
-        };
-        const result = QuizSchema.safeParse(dataWithApprovedAt);
-        expect(result.success).toBe(true);
-      });
+      it("should accept valid approvedAt", () => {});
     });
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
