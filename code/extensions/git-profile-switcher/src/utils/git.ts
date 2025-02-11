import { execPromise } from "@/lib";
import type { Scope, Profile, GitProfile } from "@/types";

export async function getProfiles(): Promise<GitProfile[]> {
  const scopes = ["system", "global"] satisfies Scope[];
  return Promise.all(scopes.map((x) => getProfile(x)));
}

export async function getProfile(scope: Scope): Promise<GitProfile> {
  const [name, email] = await Promise.all([
    execPromise(`git config --${scope} --get user.name`),
    execPromise(`git config --${scope} --get user.email`),
  ]);

  return { scope, name, email };
}

export async function setProfile(scope: Scope, value: Profile): Promise<void> {
  // Note: Don't use Promise.all here, because file locks can cause conflicts.
  await execPromise(`git config --${scope} user.name "${value.name}"`);
  await execPromise(`git config --${scope} user.email "${value.email}"`);
}
