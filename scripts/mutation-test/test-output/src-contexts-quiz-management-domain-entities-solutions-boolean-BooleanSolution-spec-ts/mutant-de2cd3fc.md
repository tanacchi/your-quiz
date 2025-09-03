# Mutant de2cd3fc Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5681
**Stable ID**: de2cd3fc
**Location**: L333:45–L342:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5681
@@ -329,16 +329,7 @@
       expect(dto.id).toBe("solution-1");
       expect(dto.value).toBe(true);
     });
 
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
+    it("should deep clone in toData", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
