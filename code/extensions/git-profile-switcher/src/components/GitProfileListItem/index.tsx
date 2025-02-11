import type { GitProfile } from "@/types";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import GitProfileForm from "@/components/GitProfileForm";

type GitProfileListItemProps = {
  profile: GitProfile;
  revalidate?: () => Promise<GitProfile[]>;
};

export default function GitProfileListItem({ profile, revalidate }: GitProfileListItemProps) {
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
      actions={
        <ActionPanel>
          <Action.Push
            icon={Icon.Bird}
            title="Edit Profile"
            target={<GitProfileForm scope={profile.scope} profile={profile} revalidate={revalidate} />}
          />
        </ActionPanel>
      }
    />
  );
}
