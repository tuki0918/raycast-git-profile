import { Action, ActionPanel, Form, showToast, Toast, LocalStorage } from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";
import { setData } from "@/utils";

interface FormValues {
  name: string;
  email: string;
}

export default function ProfileForm() {
  const { handleSubmit, itemProps } = useForm<FormValues>({
    async onSubmit(values) {
      const data = await LocalStorage.getItem(values.email);
      if (data !== undefined) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Error!",
          message: "The email is already in use.",
        });
        return;
      }
      await setData(values);
      await showToast({
        style: Toast.Style.Success,
        title: "Success!",
        message: `${values.name} profile created.`,
      });
    },
    validation: {
      name: FormValidation.Required,
      email: FormValidation.Required,
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Profile" />
      <Form.TextField title="user.name" placeholder="Your name" {...itemProps.name} />
      <Form.TextField title="user.email" placeholder="test@example.com" {...itemProps.email} />
    </Form>
  );
}
