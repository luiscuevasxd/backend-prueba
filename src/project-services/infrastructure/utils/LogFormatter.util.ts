export const logger = {
  info: (message: string, values?: unknown) =>
    values ? console.log(message, JSON.stringify(values)) : console.log(message),
  error: (message: string, values?: unknown) =>
    values ? console.error(message, JSON.stringify(values)) : console.log(message)
};
