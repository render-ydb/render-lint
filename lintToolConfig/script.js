const shells = {
    eslint: {
        "lint-staged": ["src/**/*.{js,jsx,ts,tsx}", "eslint"],
        "fix": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --fix",
    },
    stylelint: {
        "lint-staged": ["src/**/*.{css,scss,less}", "stylelint"],
        "fix": "stylelint --fix src**/*.{css,scss,less}",
    },
    prettier: {
        "lint-staged": ["src/**/*{.js,.jsx,.ts,.tsx}", "prettier --check"],
        "fix": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
    }
}

const getScipts = (tools = []) => {
    const scripts = {};
    const lintStagedConfig = {};
    tools.forEach(tool => {
        const script = shells[tool];
        if (script) {
            scripts[`${tool}-fix`] = script.fix;
            const [rule, lintTool] = script["lint-staged"];
            lintStagedConfig[rule] = lintTool;
        }
    });
    const scriptKeys = Object.keys(scripts);
    if (scriptKeys.length) {
        const scriptValue = scriptKeys.map(key => `npm run ${key}`).join(" && ");
        scripts["prepare"] = 'npx render-lint init  --force';
        scripts["render-lint-fix"] = scriptValue;
    }
    return {
        scripts,
        lintStagedConfig
    }
}

module.exports = getScipts;