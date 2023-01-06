# React What Changed

An efficient and simple library to show which dependency changed in a hook between react cycles.

## Installation

```
npm install react-what-changed --save-dev
```

## Usage

### Import

```
import RWC from 'react-what-changed';
```

### Examples

#### Let's say we have the following component
```
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

#### Example #1: simplest log as array
```
useEffect(() => {
    someLogic();
}, RWC([somePrimitive, someArray, someObject]));
```

#### Example #2: verbose log as array
```
useEffect(() => {
    someLogic();
}, RWC([somePrimitive, someArray, someObject], true));
```

#### Example #3: use ID for several logs
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

#### Example #4: log with dependencies names
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

### License
Proxserve is [APACHE-2.0 licensed](https://www.apache.org/licenses/LICENSE-2.0).