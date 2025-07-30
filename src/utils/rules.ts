export const PATTERNS = {
  URL: /^(https?:\/\/)([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%가-힣]*)?$/iu,
};

export const RULES = {
  required: (v: string) => !!v || "This is a required field.",
  url: (v: string) =>
    PATTERNS.URL.test(v.trim()) || "Please enter a valid URL.",
};

export function validateRules(
  value: string,
  rules: Array<(value: string) => true | string>
): true | string {
  for (const rule of rules) {
    const result = rule(value);
    if (typeof result === "string") return result;
  }
  return true;
}
