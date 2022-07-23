import { useState } from 'react';

export const useArray = (initialState = []) => {
    const [arr, setArr] = useState(initialState);

    const set = (newArr) => setArr(newArr);

    const push = (...items) => setArr((prevState) => prevState.concat(items));

    const updateAt = (index, item) =>
        setArr((prevState) => {
            const arr = prevState.slice();
            arr[index] = item;
            return arr;
        });

    const insertAt = (index, item) =>
        setArr((prevState) => {
            const arr = prevState.slice();
            index > arr.length
                ? (arr[index] = item)
                : arr.splice(index, 0, item);

            return arr;
        });

    const removeAt = (index) =>
        setArr((prevState) => {
            const arr = prevState.slice();
            arr.splice(index, 1);
            return arr;
        });

    const clear = () => setArr([]);

    const reset = () => setArr(initialState);

    return [
        arr,
        {
            set,
            push,
            updateAt,
            insertAt,
            removeAt,
            clear,
            reset,
        },
    ];
};
