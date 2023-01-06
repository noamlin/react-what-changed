import { reactWhatDiff } from '..';

const RWD = reactWhatDiff.bind({ debug: true }) as typeof reactWhatDiff;

const simpleArrayOld = [0, 1, 2, 3, 4];
const simpleArrayNew = [0, 'a', 2, 3, ['b']];

const complexArrayOld = ['a', 'b', [0, {key: 'z'}, 1], 'c', 'd', {key1: 0, key2: ['y'], key3: 1}, 'e'];
const complexArrayNew = [7, 'b', [6, {key: 'x'}, 1], 'c', 'd', {key1: 0, key2: ['w'], key3: 5}, 'e'];

const simpleObjectOld = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
const simpleObjectNew = { a: 'a', b: 2, c: 'c', d: 4, e: 'e' };

const complexObjectOld = { a: {i: [0, {key: [{p: 'p'}]}], j: 9, k: {z: 'z'}}, b: ['x','y','z'], c: {key: 'c'} };
const complexObjectNew = { a: {i: [0, {key: [{p: -2}]}], j: 8, k: {z: 'z'}}, b: ['x','v','z'], c: 'c' };

test('1. Simple array diffs', () => {
    let diffs = RWD(simpleArrayOld);
	expect(diffs).toEqual([]);
    diffs = RWD(simpleArrayNew);
	expect(diffs).toEqual([
        { path: '[1]', oldValue: 1, newValue: 'a' },
        { path: '[4]', oldValue: 4, newValue: '["b"]' },
    ]);
});

test('2. Complex array diffs', () => {
    let diffs = RWD(complexArrayOld);
	expect(diffs).toEqual([]);
    diffs = RWD(complexArrayNew);
	expect(diffs).toEqual([
        { path: '[0]', oldValue: 'a', newValue: 7 },
        { path: '[2][0]', oldValue: 0, newValue: 6 },
        { path: '[2][1].key', oldValue: 'z', newValue: 'x' },
        { path: '[5].key2[0]', oldValue: 'y', newValue: 'w' },
        { path: '[5].key3', oldValue: 1, newValue: 5 },
    ]);
});

test('3. Simple object diffs', () => {
    let diffs = RWD(simpleObjectOld);
	expect(diffs).toEqual([]);
    diffs = RWD(simpleObjectNew);
	expect(diffs).toEqual([
        { path: '.b', oldValue: 'b', newValue: 2 },
        { path: '.d', oldValue: 'd', newValue: 4 },
    ]);
});

test('4. Complex object diffs', () => {
    let diffs = RWD(complexObjectOld);
	expect(diffs).toEqual([]);
    diffs = RWD(complexObjectNew);
	expect(diffs).toEqual([
        { path: '.a.i[1].key[0].p', oldValue: 'p', newValue: -2 },
        { path: '.a.j', oldValue: 9, newValue: 8 },
        { path: '.b[1]', oldValue: 'y', newValue: 'v' },
        { path: '.c', oldValue: '{"key":"c"}', newValue: 'c' },
    ]);
});

test('5. several diffs with an ID', () => {
    let diffs = RWD(simpleArrayOld, 'some_id');
	expect(diffs).toEqual([]);

    diffs = RWD(simpleArrayNew); // no ID so will compare to an undefined old object
	expect(diffs).toEqual([]);

    diffs = RWD(simpleArrayNew, 'some_id');
	expect(diffs).toEqual([
        { path: '[1]', oldValue: 1, newValue: 'a' },
        { path: '[4]', oldValue: 4, newValue: '["b"]' },
    ]);
});