# Mutant dd197cca Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6310
**Stable ID**: dd197cca
**Location**: L265:33–L270:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6310
@@ -261,14 +261,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
 
-      if (entityResult.isErr()) {
-        const { issues } = entityResult.error;
-        expect(issues.length).toBeGreaterThan(0);
-        const nameError = issues.find((issue) => issue.path.includes("name"));
-        expect(nameError).toBeDefined();
-      }
+      if (entityResult.isErr()) {}
     });
 
     it("should create from draft", () => {
       const draft = new Tag.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
