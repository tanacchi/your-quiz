# Mutant 9d7c1846 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6919
**Stable ID**: 9d7c1846
**Location**: L73:69–L76:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6919
@@ -69,12 +69,9 @@
         ["related", "related", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
         ["null value", null, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = RelationType.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {});
     });
   });
 
   describe("TagSchema Validation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
