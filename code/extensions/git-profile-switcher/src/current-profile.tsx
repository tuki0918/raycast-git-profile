import type { GitProfile } from "@/types";
import { List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import GitProfileListItem from "@/components/GitProfileListItem";
import { getProfiles } from "@/utils";

export default function Command() {
  const { isLoading, data } = usePromise(async () => {
    const profiles = await getProfiles();
    const profile = { scope: "local", name: "---", email: "---" } satisfies GitProfile;
    return [...profiles, profile];
  });

  return (
    <List isLoading={isLoading} isShowingDetail searchBarPlaceholder="Select Git scope">
      {data && data.map((profile) => <GitProfileListItem profile={profile} />)}
    </List>
  );
}
