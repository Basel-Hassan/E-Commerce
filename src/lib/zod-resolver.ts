import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

type ErrorItem = {
  type: string;
  message: string;
};

type ErrorTree = Record<string, unknown>;

function setNestedError(
  errors: ErrorTree,
  path: PropertyKey[],
  error: ErrorItem,
): void {
  if (path.length === 0) {
    errors.root = error;
    return;
  }

  let current = errors;

  for (let index = 0; index < path.length - 1; index += 1) {
    const key = String(path[index]);
    const next = current[key];

    if (!next || typeof next !== "object") current[key] = {};
    current = current[key] as ErrorTree;
  }

  current[String(path[path.length - 1])] = error;
}

export function zodResolver<
  TOutput extends FieldValues,
  TInput extends FieldValues = TOutput,
>(schema: z.ZodType<TOutput, TInput>): Resolver<TInput, unknown, TOutput> {
  return async (values) => {
    const result = await schema.safeParseAsync(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: ErrorTree = {};

    for (const issue of result.error.issues) {
      setNestedError(errors, issue.path, {
        type: issue.code,
        message: issue.message,
      });
    }

    return {
      values: {},
      errors: errors as FieldErrors<TInput>,
    };
  };
}
