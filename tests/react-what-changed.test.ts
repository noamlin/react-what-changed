import { RWC } from '..';

const arr1old = [0, 1, 2];
const arr1new = [0, 'a', 2];
const arr2old = [0, 1, 2, 3];
const arr2new = [0, 1, 'b', 3];

const obj1old = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
const obj1new = { a: 'a', b: 'b', c: 3, d: 'd', e: 'e' };
const obj2old = { a: 'a', b: 'b', c: 'c' };
const obj2new = { a: 0, b: 'b', c: 'c' };

test('1. Trace array', () => {
    const arr1 = RWC(arr1old);
    const arr2 = RWC(arr1new);
	expect(arr1).toBe(arr1old);
	expect(arr2).toBe(arr1new);
});

test('2. Trace array (verbose)', () => {
    const arr1 = RWC(arr2old, true);
    const arr2 = RWC(arr2new, true);
	expect(arr1).toBe(arr2old);
	expect(arr2).toBe(arr2new);
});

test('3. Trace object', () => {
    const arr1 = RWC(obj1old);
    const arr2 = RWC(obj1new);
	expect(arr1).toEqual(['a', 'b', 'c', 'd', 'e']);
	expect(arr2).toEqual(['a', 'b', 3, 'd', 'e']);
});

test('4. Trace object (verbose)', () => {
    const id = 3; // same length of keys as the first test
    const hash = `_ReactWhatChanged_${id}`;
    let oldValues = globalThis[hash];
	expect(oldValues).toBe(arr1new);

    const arr1 = RWC(obj2old, true);
    oldValues = globalThis[hash];
	expect(oldValues).toBe(obj2old);

    const arr2 = RWC(obj2new, true);
    oldValues = globalThis[hash];
	expect(oldValues).toBe(obj2new);

	expect(arr1).toEqual(['a', 'b', 'c']);
	expect(arr2).toEqual([0, 'b', 'c']);
});

test('5. Trace with ID', () => {
    const id = 'some_id';
    const hash = `_ReactWhatChanged_${id}`;
    let oldValues = globalThis[hash];
	expect(oldValues).toBe(undefined);

    const arr1 = RWC(obj2old, true, id);
    oldValues = globalThis[hash];
	expect(oldValues).toBe(obj2old);

	expect(arr1).toEqual(['a', 'b', 'c']);
});