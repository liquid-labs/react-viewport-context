'use strict';

module.exports = {
    plugins: ['plugins/markdown'],
    recurseDepth: 10,
    source: {
        include: ['src/'],
        includePattern: ".+\\.(c|m)?js(doc|x)?$",
        excludePattern: "((^|\\/|\\\\)_|.+\\.test\\.(c|m)?jsx?$)"
    },
    sourceType: "module",
    tags: {
        allowUnknownTags: true,
        dictionaries: ["jsdoc","closure"]
    },
    templates: {
        cleverLinks: true,
        monospaceLinks: false
    }
};