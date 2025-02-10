import { LocalStorage } from "@raycast/api";
import type { Profile } from "@/types";

type Values = {
  [key: string]: string;
};

export async function setData(value: Profile) {
  const data = JSON.stringify(value);
  await LocalStorage.setItem(value.email, data);
}

export async function getData(): Promise<Profile[]> {
  const data = await LocalStorage.allItems<Values>();
  return Object.values(data).map((v) => JSON.parse(v) as Profile);
}

export async function deleteData(value: Profile) {
  await LocalStorage.removeItem(value.email);
}
