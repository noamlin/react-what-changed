type AnyObject = Array<any> | Record<string, any>;
/**
 * compares a react dependencies list with its previous values (from previous cycle)
 * and prints which dependency is the one that changed
 */
export declare const reactWhatChanged: (dependencies: AnyObject, verbose?: boolean, id?: string | number) => any[];
export declare const RWC: (dependencies: AnyObject, verbose?: boolean, id?: string | number) => any[];
/**
 * compare (deep comparison) an object/array with its previous value from react's last cycle
 * and print a detailed list of all property changes
 */
export declare const reactWhatDiff: (obj: AnyObject, id?: string | number) => AnyObject;
export declare const RWD: (obj: AnyObject, id?: string | number) => AnyObject;
/**
 * compare (deep comparison) two objects/arrays
 * and print a detailed list of all property changes
 */
export declare const whatDiff: (newObj: AnyObject, prevObj: AnyObject) => AnyObject;
export declare const WD: (newObj: AnyObject, prevObj: AnyObject) => AnyObject;
export {};
