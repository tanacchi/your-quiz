# Mutant 66e1dc37 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5519
**Stable ID**: 66e1dc37
**Location**: L89:30–L92:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5519
@@ -85,12 +85,9 @@
       }
     });
 
     it("should reject extra fields (strict mode)", () => {
-      const extraFieldData = {
-        ...validSolutionData,
-        extraField: "should-not-be-allowed",
-      };
+      const extraFieldData = {};
 
       const result = BooleanSolution.from(extraFieldData);
       expect(result.isErr()).toBe(true);
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
