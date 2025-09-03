# Mutant fe1d1702 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7264
**Stable ID**: fe1d1702
**Location**: L479:46–L497:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7264
@@ -475,28 +475,10 @@
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
-    describe("Name Length Boundaries", () => {
-      it("should accept exactly 1 character name", () => {
-        const data = { ...validTagData, name: "A" };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+    describe("Name Length Boundaries", () => {});
 
-      it("should accept exactly 50 character name", () => {
-        const data = { ...validTagData, name: "A".repeat(50) };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-
-      it("should reject 51 character name", () => {
-        const data = { ...validTagData, name: "A".repeat(51) };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
-    });
-
     describe("Special Characters in Names", () => {
       it.each([
         ["special characters", "C++"],
         ["emoji", "TypeScript 🚀"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
