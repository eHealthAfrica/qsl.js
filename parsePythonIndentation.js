function parsePython(rawPythonFileContents) {
    var rawLines = rawPythonFileContents.split('\n'),
        cleanedLines = [],
        pythonOutput = [],
        indentationLength = 0,
        error = false,
        i = 0;

    // Remove comments and empty lines
    rawLines.forEach(function(rawLine) {
        var lineWoComment = rawLine.split('#')[0].trimRight();
        if (lineWoComment.trim().length > 0) {
            cleanedLines.push(lineWoComment);
        }
    });

    // Find indentation length
    while (indentationLength === 0 && i < cleanedLines.length) {
        if (cleanedLines[i].length - cleanedLines[i].trimLeft().length > 0) {
            indentationLength = cleanedLines[i].length - cleanedLines[i].trimLeft().length;
        }
        i++;
    }

    // Don't allow indentations of zero
    if (indentationLength === 0) {
        indentationLength = 1;
    }

    // Turn Python into a construct of Arrays and Objects
    cleanedLines.forEach(function(cleanedLine) {
        var indentations = (cleanedLine.length - cleanedLine.trimLeft().length) / indentationLength,
            currentArray = pythonOutput,
            j;


        if (indentations % 1 != 0) {
            // indentation characters do not correspond to a known indentation level.
            error = true;
        }

        for (j = 0; j < indentations; j++) {
            if (currentArray.length === 0) {
                // The indentations tell us to go a place that it's not possible to go.
                error = true;
            } else {
                currentArray = currentArray[currentArray.length - 1]['children'];
            }
        }
        currentArray.push({
            key: cleanedLine.trimLeft(),
            children: []
        });
    });

    if (error) {
        console.warn('Python formatting with errors!');
    }

    return pythonOutput;
}
