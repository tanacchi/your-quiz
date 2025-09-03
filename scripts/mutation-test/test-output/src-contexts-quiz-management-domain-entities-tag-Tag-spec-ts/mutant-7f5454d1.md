# Mutant 7f5454d1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6160
**Stable ID**: 7f5454d1
**Location**: L49:61–L52:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6160
@@ -45,12 +45,9 @@
         ["related", "related", true],
         ["invalid type", "invalid", false],
         ["empty string", "", false],
         ["null value", null, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = RelationType.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should handle %s: %s", (_desc, input, isValid) => {});
     });
   });
 
   describe("Entity Creation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
