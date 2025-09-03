# Mutant f056402a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7776
**Stable ID**: f056402a
**Location**: L475:47–L478:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7776
@@ -471,12 +471,9 @@
       });
     });
 
     describe("getCountValue", () => {
-      test("should return count value", () => {
-        const input: CountResult = { total: 42 };
-        expect(getCountValue(input)).toBe(42);
-      });
+      test("should return count value", () => {});
     });
   });
 
   describe("Performance and Edge Cases", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
