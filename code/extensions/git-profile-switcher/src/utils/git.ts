import { execPromise } from "@/lib";
import type { Scope, Profile, GitProfile } from "@/types";

export async function getGitProfiles(): Promise<GitProfile[]> {
  const scopes = ["system", "global"] satisfies Scope[];
  return Promise.all(scopes.map((x) => getGitProfile(x)));
}

export async function getGitProfile(scope: Scope): Promise<GitProfile> {
  const [name, email] = await Promise.all([
    execPromise(`git config --${scope} --get user.name`),
    execPromise(`git config --${scope} --get user.email`),
  ]);

  return { scope, name, email };
}

export async function setGitProfile(scope: Scope, value: Profile): Promise<void> {
  // Note: Don't use Promise.all here, because file locks can cause conflicts.
  await execPromise(`git config --${scope} user.name "${value.name}"`);
  await execPromise(`git config --${scope} user.email "${value.email}"`);
}
