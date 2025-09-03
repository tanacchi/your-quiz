# Mutant 5a97abcc Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6027
**Stable ID**: 5a97abcc
**Location**: L294:36–L335:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6027
@@ -290,47 +290,6 @@
       }
     });
   });
 
-  describe("Error Handling", () => {
-    it("should provide clear error messages for invalid data", () => {
-      const invalidCases = [
-        { data: { id: "", value: true }, expectedPath: ["id"] },
-        { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
-        { data: { id: "valid" }, expectedPath: ["value"] },
-        { data: { value: true }, expectedPath: ["id"] },
-        { data: {}, expectedPath: ["id"] },
-      ];
-
-      invalidCases.forEach(({ data, expectedPath }) => {
-        const result = BooleanSolutionSchema.safeParse(data);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const hasExpectedError = result.error.issues.some((issue) =>
-            expectedPath.every(
-              (pathPart, index) => issue.path[index] === pathPart,
-            ),
-          );
-          expect(hasExpectedError).toBe(true);
-        }
-      });
-    });
-
-    it("should handle completely invalid input types", () => {
-      const invalidInputs = [
-        null,
-        undefined,
-        "string",
-        123,
-        true,
-        [],
-        () => {},
-      ];
-
-      invalidInputs.forEach((input) => {
-        const result = BooleanSolutionSchema.safeParse(input);
-        expect(result.success).toBe(false);
-      });
-    });
-  });
+  describe("Error Handling", () => {});
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
