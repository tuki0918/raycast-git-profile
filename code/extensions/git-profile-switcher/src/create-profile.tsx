import { uniqueKey } from "@/utils";
import ProfileForm from "@/components/ProfileForm";

export default function Command() {
  return <ProfileForm id={uniqueKey()} />;
}
