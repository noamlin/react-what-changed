export default function reactWhatChanged(
    dependencies: any[] | Record<string, any>,
    verbose: boolean = false,
    id?: string,
) {
    if (Array.isArray(dependencies)) {
        const hash = Boolean(id) ? id : dependencies.length;
        if (!globalThis[`_RWC_${hash}`]) {
            globalThis[`_RWC_${hash}`] = [];
        }
        const oldValues = globalThis[`_RWC_${hash}`];

        const output: any = {};
        dependencies.forEach((dependencyValue, index) => {
            const changedMsg = Object.is(dependencyValue, oldValues[index]) ? 'NO' : 'YES';
            if (!verbose) {
                output[index] = { 'changed?': changedMsg };
            } else {
                output[index] = {
                    'changed?': changedMsg,
                    'old value': oldValues[index],
                    'new value': dependencyValue,
                };
            }
        });

        console.table(output);

        globalThis[`_RWC_${hash}`] = dependencies;

        return dependencies;
    } else { // is object (pojo)
        const keyValues = Object.entries(dependencies);
        const hash = Boolean(id) ? id : keyValues.length;
        if (!globalThis[`_RWC_${hash}`]) {
            globalThis[`_RWC_${hash}`] = [];
        }
        const oldValues = globalThis[`_RWC_${hash}`];

        const output: any = {};
        keyValues.forEach(([dependencyName, dependencyValue]) => {
            const changedMsg = Object.is(dependencyValue, oldValues[dependencyName]) ? 'NO' : 'YES';
            if (!verbose) {
                output[dependencyName] = { 'changed?': changedMsg };
            } else {
                output[dependencyName] = {
                    'changed?': changedMsg,
                    'old value': oldValues[dependencyName],
                    'new value': dependencyValue,
                };
            }
        });

        console.table(output);

        globalThis[`_RWC_${hash}`] = dependencies;

        return keyValues.map(([name, value]) => value);
    }
}
