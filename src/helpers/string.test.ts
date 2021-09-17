import { sentenceCase } from "./string";

it("convert to sentence case", () => {
  const randomCase = "thIs iS a rANdOm CAsE senteNCe.";
  expect(sentenceCase(randomCase)).toBe("This is a random case sentence.");
});
