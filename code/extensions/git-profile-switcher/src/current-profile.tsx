import { execPromise } from "@/lib";
import type { Scope } from "@/types";
import { Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";

type Profile = { scope: Scope; name?: string | null; email?: string | null };

export default function Command() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProfiles().then((profiles) => {
      setProfiles([...profiles, { scope: "local", name: "---", email: "---" }]);
      setLoading(false);
    });
  }, []);

  return (
    <List
      isLoading={loading}
      isShowingDetail
      searchBarPlaceholder="Select Git scope"
    >
      {profiles.map((profile) => (
        <List.Item
          accessories={[{ text: "scope" }]}
          key={profile.scope}
          title={profile.scope}
          icon={Icon.Bird}
          detail={
            <List.Item.Detail
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label
                    title="user.name"
                    text={profile.name || ""}
                  />
                  <List.Item.Detail.Metadata.Label
                    title="user.email"
                    text={profile.email || ""}
                  />
                  <List.Item.Detail.Metadata.TagList title="scope">
                    <List.Item.Detail.Metadata.TagList.Item
                      text={profile.scope}
                    />
                  </List.Item.Detail.Metadata.TagList>
                </List.Item.Detail.Metadata>
              }
            />
          }
        />
      ))}
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
