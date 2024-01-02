# lint-nvmrc-with-engines

Test that the contents of `.nvmrc` satisfies the `engines.node` field found in your `package.json`.

## Usage

`npm install --save-dev lint-nvmrc-with-engines`

From the root of your application:

`npx lint-nvmrc-with-engines`

Move on with life if this passes, fix the problem if this fails.

Meant to be used during an automated test process.

### with lint-staged

Merge with existing:

```json
{
    "lint-staged": {
        "{.nvmrc,package.json}": [
            "lint-nvmrc-with-engines"
        ]
    }
}
```