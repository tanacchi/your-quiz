# Mutant d770c331 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5073
**Stable ID**: d770c331
**Location**: L104:10–L104:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5073
@@ -100,9 +100,9 @@
           expect(result.data).toEqual(expected);
         }
       });
 
-      it("should reject invalid tag formats in array", () => {
+      it("", () => {
         const result = TagIds.safeParse(["valid-tag", "", "another-valid"]);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
