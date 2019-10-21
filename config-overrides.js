const { override, fixBabelImports } = require("customize-cra");
// do stuff with the webpack config...
module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
    })
);
