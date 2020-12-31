import { Environment, getEnvOrThrow } from "./environment";

describe("Environment", () => {
  const errorMsg = (txt: string): string => `Environment variable ${txt} not set`;
  beforeEach(() => {
    process.env.LOG_LEVEL = "debug";
    process.env.A = "a";
    process.env.B = "b";
  });

  afterEach(() => {
    process.env = {};
  });

  it("getEnvOrThrow",() => {
    expect(getEnvOrThrow("LOG_LEVEL")).toBe("debug");
    expect(getEnvOrThrow("A")).toBe("a");
    expect(getEnvOrThrow("B")).toBe("b");
  });

  it("getEnvOrThrow - error thrown", () => {
    const variable = "ERROR";
    expect(() => {
      getEnvOrThrow(variable);
    }).toThrowError(new Error(errorMsg(variable)));
  });

  it("Environment", () => {
    expect(Environment.getLogLevel()).toBe("debug");
  });
});
