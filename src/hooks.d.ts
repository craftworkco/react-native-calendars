import React, { DependencyList } from 'react';
/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */
export declare const useDidUpdate: (callback: () => void, dep: DependencyList) => void;
export declare const useCombinedRefs: (...refs: React.Ref<any>[]) => React.MutableRefObject<undefined>;
