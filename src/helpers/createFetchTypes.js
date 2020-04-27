const createFetchTypes = (name) => ({
    REQUEST: `${name}_REQUEST`,
    SUCCESS: `${name}_SUCCESS`,
    FAILURE: `${name}_FAILURE`,
});

export default createFetchTypes;
