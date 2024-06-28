import { rtkApi } from "@/Shared/API/rtkApi";
import { ApplicationUser} from "../Model/types/applicationUser";
import { JsonSettings } from "../Model/types/jsonSettings";

interface SetJsonSettings {
  userId: string;
  jsonSettings: JsonSettings;
}
export const getTokenFromLocalStorage = ():string|null => {
  const token = localStorage.getItem("token");
    return token;
};


const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<ApplicationUser, SetJsonSettings>({
      query: ({ userId, jsonSettings }) => ({
        // url backend db.json
        url: `/users/${userId}`,
        method: "PATCH",
        body: {
          jsonSettings,
        },
      }),
    }),
    getUserDataById: build.query<ApplicationUser, string>({
      query: (userId) => ({
        url: `https://localhost:7223/Users/CurrentUser`,
        method: "GET",
        headers: {
          Authorization : `Bearer ${getTokenFromLocalStorage}`
        }
      }),
    }),
  }),
});
// rtk without hook without use in the beginning name
export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
