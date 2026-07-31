import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * Best-effort local git commit, used to keep an auditable trail of
 * andamento updates made through the admin panel. Only meaningful when
 * the app is running against a real git working tree on disk (local dev
 * or a self-hosted server) - it is a silent no-op anywhere the filesystem
 * isn't a git repo (e.g. serverless hosting), so it must never throw and
 * block the actual database update.
 */
export async function autoCommit(message: string, cwd: string = process.cwd()) {
  if (process.env.ENABLE_AUTO_GIT_COMMIT === "false") {
    return { committed: false, reason: "disabled" as const };
  }

  try {
    await execFileAsync("git", ["add", "-A"], { cwd });
    await execFileAsync("git", ["commit", "-m", message], { cwd });
    return { committed: true as const };
  } catch (error) {
    console.warn("[auto-commit] git commit não realizado:", (error as Error).message);
    return { committed: false, reason: "error" as const };
  }
}
