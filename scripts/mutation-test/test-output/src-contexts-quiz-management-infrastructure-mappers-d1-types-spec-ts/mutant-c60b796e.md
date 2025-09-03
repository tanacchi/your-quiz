# Mutant c60b796e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7719
**Stable ID**: c60b796e
**Location**: L391:40–L391:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7719
@@ -387,9 +387,9 @@
       });
 
       test("should validate matching strategies", () => {
         expect(isValidMatchingStrategy("exact")).toBe(true);
-        expect(isValidMatchingStrategy("invalid")).toBe(false);
+        expect(isValidMatchingStrategy("")).toBe(false);
       });
     });
   });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
