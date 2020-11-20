/**
 * Util function to concat class names as a single string
 * Note: there is nice 3rb lib like https://www.npmjs.com/package/classnames
 * But just for the purpose of this home code test, I'm using a simple solution
 *
 */
const classNames = (...rest) => {
    // filter out non-empty value
    const arr = [...rest].filter((val) => !!val);
    return arr.join(' ');
};

export default classNames;
