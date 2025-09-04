export function normalizePhone(phone = "") {
  let p = phone.replace(/\D/g, "");
  if (p.startsWith("0")) p = p.substring(1);
  return `+84${p}`;
}

export function normalizeIdentifier(identifier = "") {
  const isEmail = identifier.includes("@");
  return { isEmail, value: identifier.trim() };
}
