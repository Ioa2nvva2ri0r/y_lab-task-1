export function checkJson(data: any) {
  try {
    return JSON.parse(data ?? "''");
  } catch (_) {
    return data ?? "";
  }
}
