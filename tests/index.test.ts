import RWC from '..';

const simpleArray1 = [0, 1, 2];
const simpleArray2 = [0, 'a', 2];
const simpleArray3 = [0, 1, 2, 3];
const simpleArray4 = [0, 1, 'b', 3];

const simpleObject1 = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
const simpleObject2 = { a: 'a', b: 'b', c: 3, d: 'd', e: 'e' };
const simpleObject3 = { a: 'a', b: 'b', c: 'c' };
const simpleObject4 = { a: 0, b: 'b', c: 'c' };

test('1. Trace array', () => {
    const arr1 = RWC(simpleArray1);
    const arr2 = RWC(simpleArray2);
	expect(arr1).toBe(simpleArray1);
	expect(arr2).toBe(simpleArray2);
});

test('2. Trace array (verbose)', () => {
    const arr1 = RWC(simpleArray3, true);
    const arr2 = RWC(simpleArray4, true);
	expect(arr1).toBe(simpleArray3);
	expect(arr2).toBe(simpleArray4);
});

test('3. Trace object', () => {
    const arr1 = RWC(simpleObject1);
    const arr2 = RWC(simpleObject2);
	expect(arr1).toEqual(['a', 'b', 'c', 'd', 'e']);
	expect(arr2).toEqual(['a', 'b', 3, 'd', 'e']);
});

test('4. Trace object (verbose)', () => {
    const hash = 3; // same keys length as first test
    let oldValues = globalThis[`_RWC_${hash}`];
	expect(oldValues).toBe(simpleArray2);

    const arr1 = RWC(simpleObject3, true);
    oldValues = globalThis[`_RWC_${hash}`];
	expect(oldValues).toBe(simpleObject3);

    const arr2 = RWC(simpleObject4, true);
    oldValues = globalThis[`_RWC_${hash}`];
	expect(oldValues).toBe(simpleObject4);

	expect(arr1).toEqual(['a', 'b', 'c']);
	expect(arr2).toEqual([0, 'b', 'c']);
});

test('5. Trace with ID', () => {
    const id = 'some_id'; // same keys length as first test
    let oldValues = globalThis[`_RWC_${id}`];
	expect(oldValues).toBe(undefined);

    const arr1 = RWC(simpleObject3, true, id);
    oldValues = globalThis[`_RWC_${id}`];
	expect(oldValues).toBe(simpleObject3);

	expect(arr1).toEqual(['a', 'b', 'c']);
});