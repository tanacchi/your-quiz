# Mutant 813a06e6 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5946
**Stable ID**: 813a06e6
**Location**: L194:76–L210:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5946
@@ -190,25 +190,9 @@
           ).toBe(true);
         }
       });
 
-      it("should preserve boolean type across multiple validations", () => {
-        const trueData = { id: "test-true", value: true };
-        const falseData = { id: "test-false", value: false };
-
-        const trueResult = BooleanSolutionSchema.safeParse(trueData);
-        const falseResult = BooleanSolutionSchema.safeParse(falseData);
-
-        expect(trueResult.success).toBe(true);
-        expect(falseResult.success).toBe(true);
-
-        if (trueResult.success && falseResult.success) {
-          expect(trueResult.data.value).toBe(true);
-          expect(falseResult.data.value).toBe(false);
-          expect(typeof trueResult.data.value).toBe("boolean");
-          expect(typeof falseResult.data.value).toBe("boolean");
-        }
-      });
+      it("should preserve boolean type across multiple validations", () => {});
     });
   });
 
   describe("Integration Scenarios", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
