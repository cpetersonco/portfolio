/** @type {import("prettier").Config} */
export default {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    printWidth: 80,
    proseWrap: 'always',
    bracketSameLine: true,
    bracketSpacing: true,
    singleAttributePerLine: true,
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
}
