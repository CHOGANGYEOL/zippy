import { randomBytes } from "crypto";

export function generateShortCode(length = 8): string {
  return randomBytes(length).toString("base64url").slice(0, length);
}
export async function copyToClipboard(
  text: string,
  props?: { onSuccess?: () => void; onError?: (err: Error) => void }
): Promise<void> {
  const { onSuccess, onError } = props ?? {};
  try {
    // clipboard api 지원여부 확인
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      try {
        await navigator.clipboard.writeText(text);
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error("Failed to copy using clipboard API:", err);
        throw new Error("Clipboard API failed");
      }
    } else {
      // clipboard api 미지원시: execCommand 사용
      await new Promise((resolve, reject) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;

        // element hidden
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";

        document.body.appendChild(textarea);
        textarea.select();

        try {
          if (document.execCommand("copy")) {
            resolve("SUCCESS");
            if (onSuccess) onSuccess();
          } else {
            reject(new Error("execCommand failed"));
          }
        } catch (err) {
          console.error("Failed to copy using execCommand:", err);
          reject(err);
        } finally {
          document.body.removeChild(textarea);
        }
      });
    }
  } catch (err) {
    if (err instanceof Error && onError) onError(err);
  }
}
