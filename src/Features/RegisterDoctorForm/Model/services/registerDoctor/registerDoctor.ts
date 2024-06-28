import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import { RegisterDoctorSchema } from '../../types/registerDoctorSchema';
import { ValidateRegisterDoctorError } from '../../consts/consts';
import { getRegisterDoctorLogin } from '../../selectors/getRegisterDoctorLogin/getRegisterDoctorLogin';
import { getRegisterDoctorPassword } from '../../selectors/getRegisterDoctorPassword/getRegisterDoctorPassword';
import { getRegisterDoctorFirstName } from '../../selectors/getRegisterDoctorFirstName/getRegisterDoctorFirstName';
import { getRegisterDoctorLastName } from '../../selectors/getRegisterDoctorLastName/getRegisterDoctorLastName';
import { getRegisterDoctorPatronymic } from '../../selectors/getRegisterDoctorPatronymic/getRegisterDoctorPatronymic';
import { getRegisterDoctorDateBirthday } from '../../selectors/getRegisterDoctorDateBirthday/getRegisterDoctorDateBirthday';
import { getRegisterDoctorPhoneNumber } from '../../selectors/getRegisterDoctorPhoneNumber/getRegisterDoctorPhoneNumber';
import { getRegisterDoctorExperience } from '../../selectors/getRegisterDoctorExperience/getRegisterDoctorExperience';
import { getRegisterDoctorAddress } from '../../selectors/getRegisterDoctorAddress/getRegisterDoctorAddress';
import { getRegisterDoctorCabinetNumber } from '../../selectors/getRegisterDoctorCabinetNumber/getRegisterDoctorCabinetNumber';
import { getRegisterDoctorCategory } from '../../selectors/getRegisterDoctorCategory/getRegisterDoctorCategory';
import { getRegisterDoctorSpeciality } from '../../selectors/getRegisterDoctorSpeciality/getRegisterDoctorSpeciality';
import { getRegisterDoctorPhoto } from '../../selectors/getRegisterDoctorPhoto/getRegisterDoctorPhoto';

export const registerDoctor = createAsyncThunk<
    RegisterDoctorSchema,
    RegisterDoctorSchema,
    ThunkConfig<ValidateRegisterDoctorError[]>
>('reviewsPage/fetchReviewsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

   
  const Login = getRegisterDoctorLogin(getState());
  const Password = getRegisterDoctorPassword(getState());
  const FirstName = getRegisterDoctorFirstName(getState());
  const LastName = getRegisterDoctorLastName(getState());
  const Patronymic = getRegisterDoctorPatronymic(getState());
  const DateBirthday = getRegisterDoctorDateBirthday(getState());
  const PhoneNumber = getRegisterDoctorPhoneNumber(getState());
  const Experience = getRegisterDoctorExperience(getState());
  const Address = getRegisterDoctorAddress(getState());
  const CabinetNumber = getRegisterDoctorCabinetNumber(getState());
  const Category = getRegisterDoctorCategory(getState());
  const Speciality = getRegisterDoctorSpeciality(getState());
  const Photo = getRegisterDoctorPhoto(getState());
    try {
        const response = await extra.api.post<RegisterDoctorSchema>(
            `http://localhost:5015/Doctors`,
            {
                Login,
                Password,
                FirstName,
                LastName,
                Patronymic,
                DateBirthday,
                Address,
                PhoneNumber,
                Photo,
                Experience,
                CabinetNumber,
                Speciality,
                Category
                
            },
        );
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        return rejectWithValue([ValidateRegisterDoctorError.SERVER_ERROR]);
    }
});
// public string Login { get; init; } = default!;

// public string Password { get; init; } = default!;
// public string FirstName { get; set; }
// public string LastName { get; set; }
// public string Patronymic { get; set; }
// public DateTime DateBirthday { get; set; }
// public string Address { get; set; }
// public string PhoneNumber { get; set; }
// public string? Photo { get; set; }
// public int Experience { get; set; }
// public string CabinetNumber { get; set; }
// public string Speciality { get; set; }
// public string Category { get; set; } = string.Empty;