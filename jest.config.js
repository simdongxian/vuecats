module.exports = {
    preset: "@vue/cli-plugin-unit-jest",
    moduleDirectories: ["node_modules", __dirname],
    transformIgnorePatterns: ["node_modules/(?!axios)/"],
}
