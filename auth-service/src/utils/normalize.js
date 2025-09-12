import validator from "validator";

/**
 * Chuẩn hóa số điện thoại về định dạng E.164 (bắt đầu bằng +84 cho VN)
 * @param {string} phone
 * @returns {string} phone đã chuẩn hóa
 */
export function normalizePhone(phone) {
  if (!phone) return null;

  let cleaned = phone.replace(/[\s\-.]/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "+84" + cleaned.slice(1);
  }

  if (cleaned.startsWith("84") && !cleaned.startsWith("+84")) {
    cleaned = "+" + cleaned;
  }

  return cleaned;
}

/**
 * Xác định xem identifier là email hay phone
 * Chuẩn hóa lại giá trị trả về
 * @param {string} identifier
 * @returns {{ isEmail: boolean, value: string }}
 */
export function normalizeIdentifier(identifier) {
  if (!identifier) return { isEmail: false, value: "" };

  const trimmed = identifier.trim();

  if (validator.isEmail(trimmed)) {
    return { isEmail: true, value: trimmed.toLowerCase() };
  }

  return { isEmail: false, value: normalizePhone(trimmed) };
}
