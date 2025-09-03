# Mutant 6d5380c6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7128
**Stable ID**: 6d5380c6
**Location**: L256:35–L265:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7128
@@ -252,18 +252,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validTagData,
-          extraField: "not allowed",
-        };
-        const result = TagSchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
-    });
+    describe("Strict Mode", () => {});
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Duplicate Related Tag IDs", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
