# Mutant 55fd1708 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5434
**Stable ID**: 55fd1708
**Location**: L4:10–L4:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5434
@@ -1,8 +1,8 @@
 import { beforeEach, describe, expect, it, vi } from "vitest";
 import { BooleanSolution, SolutionId } from "./BooleanSolution";
 
-describe("BooleanSolution", () => {
+describe("", () => {
   const validSolutionData = {
     id: SolutionId.parse("solution-1"),
     value: true,
   } as const;
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
