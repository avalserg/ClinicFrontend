import { Currency } from '@/Entities/Currency';
import { profileActions, profileReducer } from './profileSlice';
import { Country } from '@/Entities/Country';
import { updatePatientProfileData } from '../services/updateProfileData/updateProfileData';
import { ValidateProfileError } from '../consts/consts';
import { ProfileSchema } from '../types/editableProfileCardSchema';

const data = {
    first: 'Alex',
    last: 'Avdeyenko',
    age: 26,
    currency: Currency.USD,
    country: Country.Belarus,
    city: 'Orsha',
    username: 'admin',
};
describe('profileSliceTest', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(true),
            ),
        ).toEqual({ readonly: true });
    });
    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data,
            form: { username: '' },
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });
    // test("test update profile", () => {
    //   const state: DeepPartial<ProfileSchema> = {
    //     form: { username: "123" },
    //   };
    //   expect(
    //     profileReducer(
    //       state as ProfileSchema,
    //       profileActions.updateProfile({
    //         username: "123456",
    //       }),
    //     ),
    //   ).toEqual({
    //     form: { username: "123456" },
    //   });
    // });
    // extra reducers
    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                updatePatientProfileData.pending,
            ),
        ).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });
    // test("test update profile service fullfiled", () => {
    //   const state: DeepPartial<ProfileSchema> = {
    //     isLoading: true,
    //   };
    //   expect(
    //     profileReducer(
    //       state as ProfileSchema,
    //       updateProfileData.fulfilled(data, ""),
    //     ),
    //   ).toEqual({
    //     isLoading: false,
    //     validateErrors: undefined,
    //     readonly: true,
    //     validateError: undefined,
    //     form: data,
    //     data,
    //   });
    // });
});
