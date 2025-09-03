# Mutant e8c58c75 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5896
**Stable ID**: e8c58c75
**Location**: L138:53–L146:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5896
@@ -134,17 +134,9 @@
         ["very long id", `solution-${"a".repeat(100)}`],
         ["mixed case", "Solution-MixedCase-123"],
         ["numbers only", "123456789"],
         ["dots and dashes", "solution.test-case.123"],
-      ])("should handle id with %s", (_desc, id) => {
-        const data = { ...validBooleanSolutionData, id };
-        const result = BooleanSolutionSchema.safeParse(data);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.id).toBe(id);
-        }
-      });
+      ])("should handle id with %s", (_desc, id) => {});
     });
 
     describe("Minimal Valid Data", () => {
       it("should accept minimal valid data with single character id", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
