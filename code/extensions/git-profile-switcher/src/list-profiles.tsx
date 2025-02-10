import { execPromise } from "@/lib";
import { Alert, Action, ActionPanel, Icon, List, confirmAlert, showToast, Toast } from "@raycast/api";
import { getAllItems, deleteData } from "@/utils";
import { usePromise } from "@raycast/utils";
import type { Scope, Profile } from "@/types";
import ProfileForm from "@/components/ProfileForm";
import { uniqueKey } from "@/utils";

export default function Command() {
  const { isLoading, data, revalidate } = usePromise(async () => {
    return await getAllItems();
  });

  const handleSetProfile = async (profile: Profile) => {
    // Note: other scopes are not supported in this extension.
    await setProfile("global", profile);
    await showToast({
      style: Toast.Style.Success,
      title: "Success!",
      message: `${profile.name} profile applied.`,
    });
  };

  const handleDeleteProfile = async (profile: Profile) => {
    const options: Alert.Options = {
      title: "Are you sure?",
      primaryAction: {
        title: "Delete",
        style: Alert.ActionStyle.Destructive,
        onAction: async () => {
          await deleteData(profile.id);
          await revalidate();
          await showToast({
            style: Toast.Style.Success,
            title: "Success!",
            message: `${profile.name} profile deleted.`,
          });
        },
      },
    };
    await confirmAlert(options);
  };

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Show the list of profiles">
      <List.Item
        title={"Create New Profile"}
        icon={Icon.PlusSquare}
        actions={
          <ActionPanel>
            <Action.Push title="Create Profile" target={<ProfileForm id={uniqueKey()} revalidate={revalidate} />} />
          </ActionPanel>
        }
      />
      {
        data &&
          data.map((profile) => (
            <List.Item
              accessories={[{ text: profile.email }]}
              key={profile.email}
              title={profile.name}
              icon={Icon.Bird}
              actions={
                <ActionPanel>
                  <Action.Push
                    title="Edit Profile"
                    target={<ProfileForm id={profile.id} profile={profile} revalidate={revalidate} />}
                  />
                  <Action title="Apply Profile" onAction={() => handleSetProfile(profile)} />
                  <Action title="Delete Profile" onAction={() => handleDeleteProfile(profile)} />
                </ActionPanel>
              }
            />
          ))
      }
    </List>
  );
}

async function setProfile(scope: Scope, value: Profile): Promise<void> {
  // Note: Don't use Promise.all here, because file locks can cause conflicts.
  await execPromise(`git config --${scope} user.name "${value.name}"`);
  await execPromise(`git config --${scope} user.email "${value.email}"`);
}
