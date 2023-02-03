# React What Changed

An efficient and simple library to show which dependency changed in a hook between react cycles.

## Installation
```
npm install react-what-changed --save-dev
```

## API
* [reactWhatChanged](#reactWhatChanged)
* [reactWhatDiff](#reactWhatDiff)
* [whatDiff](#whatDiff)

## reactWhatChanged

### Description
invoke this function again and again on each react's cycle to print which dependency has changed

### Import
```
import { reactWhatChanged } from 'react-what-changed';
```

### Examples
Let's say we have the following component
```
import { reactWhatChanged as RWC } from 'react-what-changed';
function MyComponent(props) {
    const [somePrimitive, setSomePrimitive] = useState(123);
    const someArray = useSomeArray();
    const someObject = useMemo(() => {
        return { person: { name: 'John', age: 99 } };
    }, [someArray]);
    ...
    ...
    return <div></div>;
}
```

Example #1: simplest log as array
```
useEffect(() => {
    someLogic();
}, RWC([somePrimitive, someArray, someObject]));
```

Example #2: verbose log as array
```
useEffect(() => {
    someLogic();
}, RWC([somePrimitive, someArray, someObject], true));
```

Example #3: use ID for several logs
```
useEffect(() => {
    someLogic();
}, RWC([somePrimitive], false, 'id_1'));

useMemo(() => {
    someLogic();
}, RWC([someArray], false, 'id_2'));

useCallback(() => {
    someLogic();
}, RWC([someObject], false, 'id_3'));
```

Example #4: log with dependencies names
```
// Instead of:
useEffect(() => {
    someLogic();
}, RWC([
    somePrimitive,
    someArray,
    someObject.person.name,
    someObject.person.age,
]);

// Do this:
useEffect(() => {
    someLogic();
}, RWC({
    primitive: somePrimitive,
    arr: someArray,
    name: someObject.person.name,
    age: someObject.person.age,
});
```

## reactWhatDiff

### Description
invoke this function again and again on an object (or array) to print all changes (deep comparison)

### Import
```
import { reactWhatDiff } from 'react-what-changed';
```

### Examples
Let's use the same component from reactWhatChanged example.

Example #1: simple log
```
import { reactWhatDiff as RWD } from 'react-what-changed';
useEffect(() => {
    someLogic();
}, [somePrimitive, someArray, RWD(someObject)]);
```

Example #2: use ID for several logs
```
useEffect(() => {
    someLogic();
}, [somePrimitive, RWD(someArray, 'id_1'), RWD(someObject, 'id_2')]);
```

## whatDiff

### Description
print all changes (deep comparison) between 2 objects (or arrays)

### Import
```
import { whatDiff } from 'react-what-changed';
```

### Examples

Example #1: log the diffs between 2 objects
```
import { whatDiff as WD } from 'react-what-changed';
const obj1 = { name: 'John', address: { city: 'New York' } };
const obj2 = { name: 'John', address: { city: 'Paris' } };
WD(obj1, obj2);
```

Let's use the same component from reactWhatChanged example.

Example #2: simple log in a react component
```
const originalObject = useRef(someObject);
someLogic();
WD(someObject, originalObject.current);
```

### License
React What Changed is [APACHE-2.0 licensed](https://www.apache.org/licenses/LICENSE-2.0).