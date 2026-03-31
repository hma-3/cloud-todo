type LogLevel = "info" | "error";

type LogFields = Record<string, string | number | boolean | undefined | null>;

const stringifyFields = (fields: LogFields) =>
  Object.entries(fields)
    .filter((entry) => entry[1] !== undefined)
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join(" ");

export const log = (
  level: LogLevel,
  message: string,
  fields: LogFields = {},
) => {
  const line =
    `level=${level} message=${JSON.stringify(message)} ${stringifyFields(fields)}`.trim();
  if (level === "error") {
    console.error(line);
    return;
  }
  console.log(line);
};
