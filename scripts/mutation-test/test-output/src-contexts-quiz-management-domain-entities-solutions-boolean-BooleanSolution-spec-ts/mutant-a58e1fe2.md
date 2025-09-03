# Mutant a58e1fe2 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5673
**Stable ID**: a58e1fe2
**Location**: L322:35–L343:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5673
@@ -318,27 +318,6 @@
       expect(typeof value).toBe("boolean");
     });
   });
 
-  describe("Data Transfer", () => {
-    it("should convert to Data", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
-
-      const dto = solution.toData();
-
-      expect(dto.id).toBe("solution-1");
-      expect(dto.value).toBe(true);
-    });
-
-    it("should deep clone in toData", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
-
-      const dto1 = solution.toData();
-      const dto2 = solution.toData();
-
-      expect(dto1).toEqual(dto2);
-      expect(dto1).not.toBe(dto2); // different objects
-    });
-  });
+  describe("Data Transfer", () => {});
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
