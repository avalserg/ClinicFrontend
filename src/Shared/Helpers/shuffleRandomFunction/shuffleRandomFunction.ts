
export const shuffle = <T>(arr:  Array<T>, n: number): T[] => {
    const result = new Array(n);
    let len = arr?.length;
    const taken = new Array(len);
    if (n > len)
        throw new RangeError('getRandom: more elements taken than available');
    // eslint-disable-next-line no-plusplus
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        // eslint-disable-next-line no-plusplus
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};
