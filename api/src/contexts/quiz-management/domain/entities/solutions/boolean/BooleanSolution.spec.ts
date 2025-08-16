import { beforeEach, describe, expect, it, vi } from "vitest";
import { BooleanSolution, SolutionId } from "./BooleanSolution";

describe("BooleanSolution", () => {
  const validSolutionData = {
    id: SolutionId.parse("solution-1"),
    value: true,
  } as const;

  describe("Brand Types", () => {
    describe("SolutionId validation", () => {
      it.each([
        ["valid alphanumeric", "solution-1", true],
        ["valid with numbers", "solution123", true],
        ["valid with underscore", "solution_test", true],
        ["valid with dash", "solution-test", true],
        ["valid single char", "s", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = SolutionId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });
  });

  describe("Entity Creation", () => {
    it("should create valid boolean solution from complete data", () => {
      const result = BooleanSolution.from(validSolutionData);
      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        const solution = result.value;
        expect(solution.get("id")).toBe("solution-1");
        expect(solution.get("value")).toBe(true);
      }
    });

    it("should create boolean solution with false value", () => {
      const falseData = {
        ...validSolutionData,
        value: false,
      };

      const result = BooleanSolution.from(falseData);
      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        const solution = result.value;
        expect(solution.get("value")).toBe(false);
      }
    });

    it("should reject invalid data types", () => {
      const invalidData = {
        id: SolutionId.parse("solution-1"),
        value: "not-a-boolean",
      };

      const result = BooleanSolution.from(invalidData);
      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const { issues } = result.error;
        expect(issues).toHaveLength(1);
        expect(issues[0]?.path).toEqual(["value"]);
      }
    });

    it("should reject missing required fields", () => {
      const incompleteData = {
        id: SolutionId.parse("solution-1"),
        // value is missing
      };

      const result = BooleanSolution.from(incompleteData);
      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const { issues } = result.error;
        expect(issues.length).toBeGreaterThan(0);
        const valueError = issues.find((issue) => issue.path.includes("value"));
        expect(valueError).toBeDefined();
      }
    });

    it("should reject extra fields (strict mode)", () => {
      const extraFieldData = {
        ...validSolutionData,
        extraField: "should-not-be-allowed",
      };

      const result = BooleanSolution.from(extraFieldData);
      expect(result.isErr()).toBe(true);
    });
  });

  describe("Business Logic", () => {
    let trueSolution: BooleanSolution;
    let falseSolution: BooleanSolution;

    beforeEach(() => {
      const trueResult = BooleanSolution.from(validSolutionData);
      expect(trueResult.isOk()).toBe(true);
      trueSolution = trueResult._unsafeUnwrap();

      const falseResult = BooleanSolution.from({
        ...validSolutionData,
        value: false,
      });
      expect(falseResult.isOk()).toBe(true);
      falseSolution = falseResult._unsafeUnwrap();
    });

    describe("isTrue() method", () => {
      it("should return true for true value", () => {
        expect(trueSolution.isTrue()).toBe(true);
      });

      it("should return false for false value", () => {
        expect(falseSolution.isTrue()).toBe(false);
      });
    });

    describe("isFalse() method", () => {
      it("should return false for true value", () => {
        expect(trueSolution.isFalse()).toBe(false);
      });

      it("should return true for false value", () => {
        expect(falseSolution.isFalse()).toBe(true);
      });
    });

    describe("negate() method", () => {
      it("should negate true to false", () => {
        const result = trueSolution.negate();
        expect(result.isOk()).toBe(true);

        if (result.isOk()) {
          const negated = result.value;
          expect(negated.get("value")).toBe(false);
          expect(negated.isFalse()).toBe(true);
        }
      });

      it("should negate false to true", () => {
        const result = falseSolution.negate();
        expect(result.isOk()).toBe(true);

        if (result.isOk()) {
          const negated = result.value;
          expect(negated.get("value")).toBe(true);
          expect(negated.isTrue()).toBe(true);
        }
      });

      it("should return new instance (immutability)", () => {
        const result = trueSolution.negate();
        expect(result.isOk()).toBe(true);

        if (result.isOk()) {
          const negated = result.value;
          expect(negated).not.toBe(trueSolution);
          expect(trueSolution.get("value")).toBe(true); // original unchanged
          expect(negated.get("value")).toBe(false); // new instance changed
        }
      });
    });
  });

  describe("Attempt Integration", () => {
    let solution: BooleanSolution;

    beforeEach(() => {
      const result = BooleanSolution.from(validSolutionData);
      expect(result.isOk()).toBe(true);
      solution = result._unsafeUnwrap();
    });

    it("should log NotImplemented for checkAnswer", () => {
      const consoleSpy = vi.spyOn(console, "log");

      const result = solution.checkAnswer({ value: true });

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        "BooleanSolution.checkAnswer: NotImplemented",
        expect.objectContaining({
          solutionId: "solution-1",
          expectedValue: true,
          attempt: { value: true },
        }),
      );

      consoleSpy.mockRestore();
    });

    it("should always return false for any attempt (placeholder)", () => {
      const testCases = [
        { value: true },
        { value: false },
        "not-an-object",
        null,
        undefined,
        123,
      ];

      testCases.forEach((attempt) => {
        const result = solution.checkAnswer(attempt);
        expect(result).toBe(false);
      });
    });
  });

  describe("Draft Usage", () => {
    it("should work with Draft pattern", () => {
      const draft = new BooleanSolution.Draft();
      draft.update("value", false);
      draft.with({
        id: SolutionId.parse("solution-draft"),
      });

      const entityResult = draft.commit();
      expect(entityResult.isOk()).toBe(true);

      if (entityResult.isOk()) {
        const solution = entityResult.value;
        expect(solution.get("value")).toBe(false);
        expect(solution.get("id")).toBe("solution-draft");
      }
    });

    it("should handle Draft validation errors", () => {
      const draft = new BooleanSolution.Draft();
      // Test with invalid data by using with() instead of update()
      draft.with({
        id: SolutionId.parse("solution-draft"),
        value: "not-a-boolean" as unknown as boolean, // Type assertion for testing
      });

      const entityResult = draft.commit();
      expect(entityResult.isErr()).toBe(true);

      if (entityResult.isErr()) {
        const { issues } = entityResult.error;
        expect(issues.length).toBeGreaterThan(0);
        const valueError = issues.find((issue) => issue.path.includes("value"));
        expect(valueError).toBeDefined();
      }
    });

    it("should create from draft", () => {
      const draft = new BooleanSolution.Draft();
      draft.with(validSolutionData as Record<string, unknown>);
      const result = BooleanSolution.fromDraft(draft);
      const entity = result._unsafeUnwrap({ withStackTrace: true });
      expect(entity).toBeDefined();
    });
  });

  describe("Immutability", () => {
    it("should return new instance on updates", () => {
      const result = BooleanSolution.from(validSolutionData);
      expect(result.isOk()).toBe(true);
      const originalSolution = result._unsafeUnwrap();

      const updatedResult = originalSolution.update("value", false);
      expect(updatedResult.isOk()).toBe(true);
      const updatedSolution = updatedResult._unsafeUnwrap();

      // Different instances
      expect(originalSolution).not.toBe(updatedSolution);
      // Original unchanged
      expect(originalSolution.get("value")).toBe(true);
      // Updated has new value
      expect(updatedSolution.get("value")).toBe(false);
    });

    it("should freeze the solution instance", () => {
      const result = BooleanSolution.from(validSolutionData);
      const solution = result._unsafeUnwrap({ withStackTrace: true });

      expect(Object.isFrozen(solution)).toBe(true);
    });
  });

  describe("Factory Methods", () => {
    it("should create BooleanSolution from valid data", () => {
      const result = BooleanSolution.from(validSolutionData);

      const solution = result._unsafeUnwrap({ withStackTrace: true });
      expect(solution.get("id")).toBe("solution-1");
      expect(solution.get("value")).toBe(true);
    });

    it("should create from draft", () => {
      const draft = new BooleanSolution.Draft();
      draft.with(validSolutionData as Record<string, unknown>);

      const result = BooleanSolution.fromDraft(draft);
      const entity = result._unsafeUnwrap({ withStackTrace: true });
      expect(entity).toBeDefined();
    });
  });

  describe("Type Safety", () => {
    it("should enforce return type constraints", () => {
      const result = BooleanSolution.from(validSolutionData);
      const solution = result._unsafeUnwrap({ withStackTrace: true });

      // These should compile with correct types
      const id: string = solution.get("id");
      const value: boolean = solution.get("value");

      expect(typeof id).toBe("string");
      expect(typeof value).toBe("boolean");
    });
  });

  describe("Data Transfer", () => {
    it("should convert to Data", () => {
      const result = BooleanSolution.from(validSolutionData);
      const solution = result._unsafeUnwrap({ withStackTrace: true });

      const dto = solution.toData();

      expect(dto.id).toBe("solution-1");
      expect(dto.value).toBe(true);
    });

    it("should deep clone in toData", () => {
      const result = BooleanSolution.from(validSolutionData);
      const solution = result._unsafeUnwrap({ withStackTrace: true });

      const dto1 = solution.toData();
      const dto2 = solution.toData();

      expect(dto1).toEqual(dto2);
      expect(dto1).not.toBe(dto2); // different objects
    });
  });
});
