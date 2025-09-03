# Mutant a4b48d78 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6071
**Stable ID**: a4b48d78
**Location**: L319:62–L334:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6071
@@ -315,22 +315,7 @@
         }
       });
     });
 
-    it("should handle completely invalid input types", () => {
-      const invalidInputs = [
-        null,
-        undefined,
-        "string",
-        123,
-        true,
-        [],
-        () => {},
-      ];
-
-      invalidInputs.forEach((input) => {
-        const result = BooleanSolutionSchema.safeParse(input);
-        expect(result.success).toBe(false);
-      });
-    });
+    it("should handle completely invalid input types", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
