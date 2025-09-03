# Mutant baa70fd5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7130
**Stable ID**: baa70fd5
**Location**: L257:56–L264:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7130
@@ -253,16 +253,9 @@
       });
     });
 
     describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validTagData,
-          extraField: "not allowed",
-        };
-        const result = TagSchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
+      it("should reject data with extra fields", () => {});
     });
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
