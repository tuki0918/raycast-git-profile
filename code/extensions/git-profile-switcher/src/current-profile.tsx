import { execPromise } from "@/lib";
import type { Scope } from "@/types";
import { List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import GitProfileListItem, { type Profile } from "@/components/GitProfileListItem";

export default function Command() {
  const { isLoading, data } = usePromise(async () => {
    const profiles = await getProfiles();
    const profile = { scope: "local", name: "---", email: "---" } satisfies Profile;
    return [...profiles, profile];
  });

  return (
    <List isLoading={isLoading} isShowingDetail searchBarPlaceholder="Select Git scope">
      {data && data.map((profile) => <GitProfileListItem profile={profile} />)}
    </List>
  );
}

async function getProfiles(): Promise<Profile[]> {
  const scopes = ["system", "global"] satisfies Scope[];
  return Promise.all(scopes.map((x) => getProfile(x)));
}

async function getProfile(scope: Scope): Promise<Profile> {
  const [name, email] = await Promise.all([
    execPromise(`git config --${scope} --get user.name`),
    execPromise(`git config --${scope} --get user.email`),
  ]);

  return { scope, name, email };
}
