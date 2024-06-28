import { buildSelector } from "@/Shared/lib/store";
import { JsonSettings } from "../types/jsonSettings";
// для статичности ссылки выносим константу из селектора
const defaultJsonSettings: JsonSettings = {};
export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.applicationUser?.authData?.jsonSettings ?? defaultJsonSettings,
);
// export const [useJsonSettingsByKey, getJsonSettingsByKey] = buildSelector(
//   (state, key: keyof JsonSettings) => {
//     return state.user?.authData?.jsonSettings?.[key];
//   },
// );
