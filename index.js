//
// Run this script from the root of your application directory.
// It's purposely quiet unless something is wrong.
// It's purposely simple code, in plain old JavaScript, so that it hopefully
// runs as ubiquitously as possible.
//
const fs = require("fs");
const semver = require("semver");
const path = require("path");

const cwd = process.cwd();

try {
    const nvmrcPath = path.resolve(path.join(cwd, ".nvmrc"));
    if (!fs.existsSync(nvmrcPath)) {
        throw new Error(
            "The .nvmrc file is missing from your calling location.",
        );
    }
    // We presume other tools will check for validity. We're only checking for
    // equality of values.
    const nvmrcVersion = semver.clean(
        fs.readFileSync(nvmrcPath).toString().trim(),
    );

    const packageJsonPath = path.resolve(path.join(cwd, "package.json"));
    if (!fs.existsSync(packageJsonPath)) {
        throw new Error(
            "The package.json file is missing from your calling location.",
        );
    }
    const packageJsonVersion = require(packageJsonPath).engines.node;

    if (!semver.satisfies(nvmrcVersion, packageJsonVersion)) {
        throw new Error(
            "nvmrc version " +
                nvmrcVersion +
                " does not satisify package.json engines declaration " +
                packageJsonVersion,
        );
    }
} catch (error) {
    console.error("check-engines failure, error:");
    console.error(error);
}

// Exit quietly, everything passes.
