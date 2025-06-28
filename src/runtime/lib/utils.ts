import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FeedbackData } from "../../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logger = {
  error: (...args: unknown[]) =>
    console.error("[feedback-widget:email]", ...args),
  info: (...args: unknown[]) =>
    console.info("[feedback-widget:email]", ...args),
  warn: (...args: unknown[]) =>
    console.warn("[feedback-widget:email]", ...args),
  log: (...args: unknown[]) => console.log("[feedback-widget:email]", ...args),
};

export function generateFeedbackEmailHtml(
  data: FeedbackData,
  options?: { showRawJson?: boolean },
): string {
  const { topic, option, message, metadata } = data;
  const { route, time } = metadata;

  const rawJson = JSON.stringify(data, null, 2);
  const showRaw = options?.showRawJson;

  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>New Feedback Received</h2>
      <table style="border: 1px solid #bbb; border-radius: 8px; border-collapse: separate; border-spacing: 0; margin-bottom: 1em; box-shadow: 0 2px 8px #0001;">
        <tbody>
          <tr>
            <td style="font-weight: bold; padding: 8px 12px; border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #f8fafc;">Topic:</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${topic || "N/A"}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 12px; border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #f8fafc;">Option:</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${option}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 12px; border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #f8fafc;">Message:</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; white-space: pre-line;">${message || "N/A"}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 12px; border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #f8fafc;">Route:</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">
              <div><b>Path:</b> ${route.path}</div>
              <div><b>Full Path:</b> ${route.fullPath}</div>
              <div><b>Name:</b> ${route.name?.toString() ?? ""}</div>
              <div><b>Hash:</b> ${route.hash || "N/A"}</div>
              <div><b>Redirected From:</b> ${route.redirectedFrom ? JSON.stringify(route.redirectedFrom) : "N/A"}</div>
              <div><b>Query:</b> <code>${JSON.stringify(route.query)}</code></div>
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 12px; background: #f8fafc; border-right: 1px solid #eee;">Timestamp:</td>
            <td style="padding: 8px 12px;">${time.timestamp} (${time.timezone})</td>
          </tr>
        </tbody>
      </table>
      ${
        showRaw
          ? `<div style="margin-top:1em;">
              <div style="font-weight:bold; margin-bottom:0.5em;">Raw JSON</div>
              <pre style="background:#f4f4f4;padding:1em;border-radius:4px;overflow-x:auto;font-size:0.875rem">${rawJson}</pre>
            </div>`
          : ""
      }
    </div>
  `;
}
