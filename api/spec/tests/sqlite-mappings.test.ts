/**
 * @file sqlite-mappings.test.ts
 * @description SQLite型マッピング機能のユニットテスト
 */

import { describe, expect, it } from "vitest";
import {
  convertCustomType,
  convertFunction,
  type EnumMapping,
  enumMappings,
  type FunctionMapping,
  functionMappings,
  generateCheckConstraint,
  type TypeMapping,
  typeMappings,
} from "../scripts/sqlite-mappings.js";

describe("SQLite Mappings", () => {
  describe("enumMappings", () => {
    it("should contain all expected ENUM definitions", () => {
      expect(enumMappings).toBeDefined();
      expect(enumMappings.length).toBeGreaterThan(0);

      // 必須のENUM型が存在することを確認
      const enumNames = enumMappings.map((e) => e.name);
      expect(enumNames).toContain("AnswerType");
      expect(enumNames).toContain("QuizStatus");
      expect(enumNames).toContain("TagType");
      expect(enumNames).toContain("RelationType");
      expect(enumNames).toContain("MatchingStrategy");
    });

    it("should have valid enum values for each mapping", () => {
      enumMappings.forEach((enumMapping: EnumMapping) => {
        expect(enumMapping.name).toBeTruthy();
        expect(enumMapping.values).toBeDefined();
        expect(enumMapping.values.length).toBeGreaterThan(0);

        // 各値が文字列であることを確認
        enumMapping.values.forEach((value) => {
          expect(typeof value).toBe("string");
          expect(value.length).toBeGreaterThan(0);
        });
      });
    });

    it("should have specific values for AnswerType", () => {
      const answerType = enumMappings.find((e) => e.name === "AnswerType");
      expect(answerType).toBeDefined();
      expect(answerType?.values).toEqual([
        "boolean",
        "free_text",
        "single_choice",
        "multiple_choice",
      ]);
    });

    it("should have specific values for QuizStatus", () => {
      const quizStatus = enumMappings.find((e) => e.name === "QuizStatus");
      expect(quizStatus).toBeDefined();
      expect(quizStatus?.values).toEqual([
        "pending_approval",
        "approved",
        "rejected",
      ]);
    });
  });

  describe("typeMappings", () => {
    it("should contain all expected type mappings", () => {
      expect(typeMappings).toBeDefined();
      expect(typeMappings.length).toBeGreaterThan(0);

      // 重要なカスタム型のマッピングが存在することを確認
      const dbmlTypes = typeMappings.map((t) => t.dbmlType);
      expect(dbmlTypes).toContain("UserAccountId");
      expect(dbmlTypes).toContain("UserId");
      expect(dbmlTypes).toContain("QuizId");
      expect(dbmlTypes).toContain("SolutionId");
    });

    it("should have valid type mappings", () => {
      typeMappings.forEach((typeMapping: TypeMapping) => {
        expect(typeMapping.dbmlType).toBeTruthy();
        expect(typeMapping.sqliteType).toBeTruthy();
        expect(typeof typeMapping.dbmlType).toBe("string");
        expect(typeof typeMapping.sqliteType).toBe("string");
      });
    });

    it("should map custom ID types to INTEGER", () => {
      const idTypes = typeMappings.filter(
        (t) => t.dbmlType.endsWith("Id") || t.dbmlType.endsWith("ID"),
      );

      idTypes.forEach((mapping) => {
        expect(mapping.sqliteType).toBe("INTEGER");
      });
    });

    it("should map PostgreSQL types correctly", () => {
      const timestampMapping = typeMappings.find(
        (t) => t.dbmlType === "timestamp",
      );
      expect(timestampMapping?.sqliteType).toBe("DATETIME");

      const booleanMapping = typeMappings.find((t) => t.dbmlType === "boolean");
      expect(booleanMapping?.sqliteType).toBe("INTEGER");

      const intMapping = typeMappings.find((t) => t.dbmlType === "int");
      expect(intMapping?.sqliteType).toBe("INTEGER");
    });
  });

  describe("functionMappings", () => {
    it("should contain expected function mappings", () => {
      expect(functionMappings).toBeDefined();
      expect(functionMappings.length).toBeGreaterThan(0);

      // now()関数のマッピングが存在することを確認
      const pgFunctions = functionMappings.map((f) => f.postgresFunction);
      expect(pgFunctions).toContain("now()");
      expect(pgFunctions).toContain("(now())");
    });

    it("should have valid function mappings", () => {
      functionMappings.forEach((funcMapping: FunctionMapping) => {
        expect(funcMapping.postgresFunction).toBeTruthy();
        expect(funcMapping.sqliteFunction).toBeTruthy();
        expect(typeof funcMapping.postgresFunction).toBe("string");
        expect(typeof funcMapping.sqliteFunction).toBe("string");
      });
    });

    it("should map now() functions to CURRENT_TIMESTAMP", () => {
      const nowMappings = functionMappings.filter((f) =>
        f.postgresFunction.toLowerCase().includes("now"),
      );

      nowMappings.forEach((mapping) => {
        expect(mapping.sqliteFunction).toBe("CURRENT_TIMESTAMP");
      });
    });
  });

  describe("generateCheckConstraint", () => {
    it("should generate valid CHECK constraint for existing ENUM", () => {
      const result = generateCheckConstraint("answer_type", "AnswerType");

      expect(result).toBeTruthy();
      expect(result).toContain("CHECK");
      expect(result).toContain('"answer_type"');
      expect(result).toContain("IN (");
      expect(result).toContain("'boolean'");
      expect(result).toContain("'free_text'");
      expect(result).toContain("'single_choice'");
      expect(result).toContain("'multiple_choice'");
    });

    it("should generate correct format for QuizStatus", () => {
      const result = generateCheckConstraint("status", "QuizStatus");

      expect(result).toEqual(
        "CHECK (\"status\" IN ('pending_approval', 'approved', 'rejected'))",
      );
    });

    it("should throw error for unknown ENUM type", () => {
      expect(() => {
        generateCheckConstraint("unknown_field", "UnknownEnum");
      }).toThrow("Unknown enum type: UnknownEnum");
    });

    it("should handle column names with special characters", () => {
      const result = generateCheckConstraint("field_name", "TagType");

      expect(result).toContain('"field_name"');
      expect(result).toContain("'official'");
      expect(result).toContain("'user'");
    });
  });

  describe("convertCustomType", () => {
    it("should convert known custom types", () => {
      expect(convertCustomType("UserAccountId")).toBe("INTEGER");
      expect(convertCustomType("UserId")).toBe("INTEGER");
      expect(convertCustomType("QuizId")).toBe("INTEGER");
      expect(convertCustomType("timestamp")).toBe("DATETIME");
      expect(convertCustomType("boolean")).toBe("INTEGER");
    });

    it("should return original type for unknown types", () => {
      expect(convertCustomType("UnknownType")).toBe("UnknownType");
      expect(convertCustomType("varchar")).toBe("varchar");
      expect(convertCustomType("text")).toBe("text");
    });

    it("should be case sensitive", () => {
      expect(convertCustomType("userid")).toBe("userid"); // lowercase
      expect(convertCustomType("UserId")).toBe("INTEGER"); // correct case
    });
  });

  describe("convertFunction", () => {
    it("should convert known PostgreSQL functions", () => {
      expect(convertFunction("now()")).toBe("CURRENT_TIMESTAMP");
      expect(convertFunction("(now())")).toBe("CURRENT_TIMESTAMP");
      expect(convertFunction("NOW()")).toBe("CURRENT_TIMESTAMP");
      expect(convertFunction("(NOW())")).toBe("CURRENT_TIMESTAMP");
    });

    it("should return original function for unknown functions", () => {
      expect(convertFunction("unknown_func()")).toBe("unknown_func()");
      expect(convertFunction("SUBSTRING(field, 1, 10)")).toBe(
        "SUBSTRING(field, 1, 10)",
      );
    });

    it("should handle exact matches only", () => {
      expect(convertFunction("now() + INTERVAL 1 DAY")).toBe(
        "now() + INTERVAL 1 DAY",
      );
      expect(convertFunction("NOW")).toBe("NOW"); // without parentheses
    });
  });
});
