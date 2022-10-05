const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    //https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    "rules": {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
        "@typescript-eslint/ban-ts-comment": "off",
    }
};
