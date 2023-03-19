"use strict";
exports.__esModule = true;
exports["default"] = {
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleDirectories: ["node_modules", "src"],
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            { tsconfig: 'tsconfig.json' },
        ]
    }
};
