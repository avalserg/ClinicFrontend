/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { RegisterPatientSchema } from "../../types/registerPatientSchema";
import { ValidateCreatePatientError } from "../../consts/consts";
import { getRegisterPatientLogin } from "../../selectors/getRegisterPatientLogin/getRegisterPatientLogin";
import { getRegisterPatientAddress } from "../../selectors/getRegisterPatientAddress/getRegisterPatientAddress";
import { getRegisterPatientDateBirthday } from "../../selectors/getRegisterPatientDateBirthday/getRegisterPatientDateBirthday";
import { getRegisterPatientFirstName } from "../../selectors/getRegisterPatientFirstName/getRegisterPatientFirstName";
import { getRegisterPatientLastName } from "../../selectors/getRegisterPatientLastName/getRegisterPatientLastName";
import { getRegisterPatientPassword } from "../../selectors/getRegisterPatientPassword/getRegisterPatientPassword";
import { getRegisterPatientPatronymic } from "../../selectors/getRegisterPatientPatronymic/getRegisterPatientPatronymic";
import { getRegisterPatientPhoneNumber } from "../../selectors/getRegisterPatientPhoneNumber/getRegisterPatientPhoneNumber";
import { getRegisterPatientPassport } from "../../selectors/getRegisterPatientPassport/getRegisterPatientPassport";
import { validateCreatePatientDataData } from "../validateCreatePAtientData/validateCreatePatientData";
import { getRegisterPatientValidateErrors } from "../../selectors/getRegisterPatientValidateErrors/getRegisterPatientValidateErrors";

export const createPatient = createAsyncThunk<
  RegisterPatientSchema,
  // args
  void,
  ThunkConfig<ValidateCreatePatientError[]>
>("patient/createPatient", async (profileId, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
 
  const Login = getRegisterPatientLogin(getState());
  const Password = getRegisterPatientPassword(getState());
  const PassportNumber = getRegisterPatientPassport(getState());
  const FirstName = getRegisterPatientFirstName(getState());
  const LastName = getRegisterPatientLastName(getState());
  const Patronymic = getRegisterPatientPatronymic(getState());
  const PhoneNumber = getRegisterPatientPhoneNumber(getState());
  const Address = getRegisterPatientAddress(getState());
  const DateBirthDay = getRegisterPatientDateBirthday(getState());
   
    const errors = validateCreatePatientDataData(getState().registerPatientSchema);
    if (errors.length) {
      const e = getRegisterPatientValidateErrors(getState());
      if (e?.length===0) {
        
        e?.push(...errors);
      }
    return rejectWithValue(errors);
    }
   try {
    const response = await extra.api.post<RegisterPatientSchema>(
      `http://localhost:5015/Patients`,
      {
        Login,
        Password,
        FirstName,
        LastName,
        Patronymic,
        PhoneNumber,
        Address,
        DateBirthDay,
        PassportNumber
}
    );
    
    if (!response.data) {
      throw new Error();
    }
    return response.data;
   } catch (e) {
     // from serber bad result
     if (e instanceof AxiosError && e.code!=="ERR_NETWORK") {
            
       // @ts-ignore
       return rejectWithValue(e.response?.data.detail.toString())
     }
     // if server unavailable
    return rejectWithValue([ValidateCreatePatientError.SERVER_ERROR]);
  }
});


