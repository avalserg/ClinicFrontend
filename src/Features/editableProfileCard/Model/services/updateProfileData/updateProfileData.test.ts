import { TestAsyncThunk } from '@/Shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updatePatientProfileData } from './updateProfileData';
import { Currency } from '@/Entities/Currency';
import { Country } from '@/Entities/Country';
import { ValidateProfileError } from '../../consts/consts';

const data = {
    first: 'Alex',
    last: 'Avdeyenko',
    age: 26,
    currency: Currency.USD,
    country: Country.Belarus,
    city: 'Orsha',
    username: 'admin',
    id: '1',
};
describe('updateProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(updatePatientProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk();

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(updatePatientProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updatePatientProfileData, {
            profile: {
                form: { ...data, firstName: '' },
            },
        });
        const result = await thunk.callThunk();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_FIRST_NAME,
        ]);
    });
});
