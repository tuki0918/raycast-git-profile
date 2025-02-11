import type { GitProfile } from "@/types";
import { Icon, List } from "@raycast/api";

type GitProfileListItemProps = {
  profile: GitProfile;
};

export default function GitProfileListItem({ profile }: GitProfileListItemProps) {
  return (
    <List.Item
      accessories={[{ text: "scope" }]}
      key={profile.scope}
      title={profile.scope}
      icon={Icon.Bird}
      detail={
        <List.Item.Detail
          metadata={
            <List.Item.Detail.Metadata>
              <List.Item.Detail.Metadata.Label title="user.name" text={profile.name || ""} />
              <List.Item.Detail.Metadata.Label title="user.email" text={profile.email || ""} />
              <List.Item.Detail.Metadata.TagList title="scope">
                <List.Item.Detail.Metadata.TagList.Item text={profile.scope} />
              </List.Item.Detail.Metadata.TagList>
            </List.Item.Detail.Metadata>
          }
        />
      }
    />
  );
}
