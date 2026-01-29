export const steps = [
  "/",
  "/user-info",
  "/payment",
  "/upload-link-sent",
  "/upload-photos/:token",
  "/analysis",
  "/final-approval",
];

/**
 * Get the current step index for a pathname.
 * Handles dynamic segments (e.g. /upload-photos/:token matches /upload-photos/abc123).
 */
export function getStepIndex(pathname) {
  const exact = steps.indexOf(pathname);
  if (exact !== -1) return exact;
  for (let i = 0; i < steps.length; i++) {
    const pattern = steps[i];
    if (!pattern.includes(":")) continue;
    const patternParts = pattern.split("/");
    const pathParts = pathname.split("/");
    if (patternParts.length !== pathParts.length) continue;
    const match = patternParts.every(
      (part, j) => part.startsWith(":") || part === pathParts[j]
    );
    if (match) return i;
  }
  return -1;
}
