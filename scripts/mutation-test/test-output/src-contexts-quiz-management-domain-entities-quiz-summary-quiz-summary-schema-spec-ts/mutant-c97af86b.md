# Mutant c97af86b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5074
**Stable ID**: c97af86b
**Location**: L104:62–L107:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5074
@@ -100,12 +100,9 @@
           expect(result.data).toEqual(expected);
         }
       });
 
-      it("should reject invalid tag formats in array", () => {
-        const result = TagIds.safeParse(["valid-tag", "", "another-valid"]);
-        expect(result.success).toBe(false);
-      });
+      it("should reject invalid tag formats in array", () => {});
     });
   });
 
   describe("QuizSummarySchema Validation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
