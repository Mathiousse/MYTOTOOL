import { useState } from "react";

function useReset(initialState) {
    const [state, setState] = useState(initialState);

    const set = (newState) => {
        setState(newState);
    };

    const reset = () => {
        setState(initialState);
    };

    return [state, set, reset];
}

export default useReset;
