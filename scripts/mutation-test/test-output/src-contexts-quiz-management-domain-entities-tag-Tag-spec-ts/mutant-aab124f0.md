# Mutant aab124f0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6213
**Stable ID**: aab124f0
**Location**: L125:27–L128:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6213
@@ -121,12 +121,9 @@
       }
     });
 
     it("should reject empty name", () => {
-      const invalidData = {
-        ...validTagData,
-        name: "",
-      };
+      const invalidData = {};
 
       const result = Tag.from(invalidData);
       expect(result.isErr()).toBe(true);
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
