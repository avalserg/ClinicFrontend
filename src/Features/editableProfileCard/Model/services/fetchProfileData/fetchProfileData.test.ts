import { TestAsyncThunk } from '@/Shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchPatientProfileData } from './fetchProfileData';
import { Currency } from '@/Entities/Currency';
import { Country } from '@/Entities/Country';

const data = {
    first: 'Alex',
    last: 'Avdeyenko',
    age: 26,
    currency: Currency.USD,
    country: Country.Belarus,
    city: 'Orsha',
    username: 'admin',
};
describe('fetchProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchPatientProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk('1');

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchPatientProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
