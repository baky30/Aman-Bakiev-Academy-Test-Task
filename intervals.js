const notesArr = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    semitonesArr = ['C', '-', '-', 'D', '-', '-', 'E', '-', 'F', '-', '-', 'G', '-', '-', 'A', '-', '-', 'B' ,'-'],
    intervalsObj = [
    {
        name: 'm2',
        semitone: 1,
        degrees: 2
    },
    {
        name: 'M2',
        semitone: 2,
        degrees: 2
    },
    {
        name: 'm3',
        semitone: 3,
        degrees: 3
    },
    {
        name: 'M3',
        semitone: 4,
        degrees: 3
    },
    {
        name: 'P4',
        semitone: 5,
        degrees: 4
    },
    {
        name: 'P5',
        semitone: 7,
        degrees: 5
    },
    {
        name: 'm6',
        semitone: 8,
        degrees: 6
    },
    {
        name: 'M6',
        semitone: 9,
        degrees: 6
    },
    {
        name: 'm7',
        semitone: 10,
        degrees: 7
    },
    {
        name: 'M7',
        semitone: 11,
        degrees: 7
    },
    {
        name: 'P8',
        semitone: 12,
        degrees: 8
    }
];

function intervalConstruction(arr) {
    if (arr.length > 3 || arr.length < 2) {
        return 'Illegal number of elements in input array';
    }


    let semitone, degree, endNoteFull, endNote, dashArr;
    let intervalName = arr[0],
        startNoteFull= arr[1],
        isOrder = arr[2];

    let startNote = startNoteFull.slice(0,1),
        accidentals = startNoteFull.slice(1);
    
    intervalsObj.forEach(obj => {
        if (intervalName == obj.name) {
            degree = obj.degrees;
            semitone = obj.semitone;
        }
    });

    if (isOrder == 'dsc') {

        if ( degree > (notesArr.indexOf(startNote)+1) ) {
            endNote = notesArr[notesArr.length - degree + notesArr.indexOf(startNote) + 1]
            dashArr = (semitonesArr.slice(0, semitonesArr.indexOf(startNote)).concat(semitonesArr.slice(semitonesArr.indexOf(endNote)+1))).filter(dash => dash == '-');// semitones count
            
        } else {
            endNote = notesArr[notesArr.indexOf(startNote) - degree + 1];
            dashArr = semitonesArr.slice(semitonesArr.indexOf(endNote) + 1, semitonesArr.indexOf(startNote)).filter(dash => dash == '-'); // semitones count
            
        }

        if (accidentals == 'b') dashArr.pop();
        else if (accidentals == '#') dashArr.push('-');

    } else {

        if ( degree > (notesArr.length - notesArr.indexOf(startNote)) ) {
            endNote = notesArr[degree - (notesArr.length - notesArr.indexOf(startNote)) - 1];
            dashArr = (semitonesArr.slice(semitonesArr.indexOf(startNote) + 1).concat(semitonesArr.slice(0, semitonesArr.indexOf(endNote)))).filter(dash => dash == '-'); // semitones count
        } else {
            endNote = notesArr[notesArr.indexOf(startNote) + degree - 1];
            dashArr = semitonesArr.slice(semitonesArr.indexOf(startNote) + 1, semitonesArr.indexOf(endNote)).filter(dash => dash == '-'); // semitones count
            
        }

        if (accidentals == 'b') dashArr.push('-');
        else if (accidentals == '#') dashArr.pop();
    }
    
    
    
    switch (dashArr.length) {
        case semitone:
            endNoteFull = endNote;
            break;

        case semitone + 1:
            isOrder == 'dsc' ? endNoteFull = endNote + '#': endNoteFull = endNote + 'b';
            break;

        case semitone + 2:
            isOrder == 'dsc' ? endNoteFull = endNote + '##': endNoteFull = endNote + 'bb';
            break;

        case semitone - 1:
            isOrder == 'dsc' ? endNoteFull = endNote + 'b': endNoteFull = endNote + '#';
            break;

        case semitone - 2:
            isOrder == 'dsc' ? endNoteFull = endNote + 'bb': endNoteFull = endNote + '##';
            break;
    
        default:
            break;
    }

    return endNoteFull;
}

function intervalIdentification(arr) {
    if (arr.length > 3 || arr.length < 2) {
        return 'Illegal number of elements in input array';
    }

    let firstNoteFull = arr[0],
        lastNoteFull = arr[1],
        isOrder = arr[2];
        
    if (isOrder == 'dsc') {
        let temp = firstNoteFull;

        firstNoteFull = lastNoteFull;
        lastNoteFull = temp;
    }

    let firstNote = firstNoteFull.slice(0,1),
        lastNote = lastNoteFull.slice(0,1),
        firstNoteAccidentals = firstNoteFull.slice(1),
        lastNoteAccidentals = lastNoteFull.slice(1);

    let degree, dashArr = [];
    let intervalName;


    if(notesArr.indexOf(lastNote) < notesArr.indexOf(firstNote)) {
        degree = notesArr.length - notesArr.indexOf(firstNote) + notesArr.indexOf(lastNote) + 1;
        dashArr = (semitonesArr.slice(semitonesArr.indexOf(firstNote) + 1).concat(semitonesArr.slice(0, semitonesArr.indexOf(lastNote)))).filter(dash => dash == '-');
        
        
    } else {
        degree = notesArr.indexOf(lastNote) - notesArr.indexOf(firstNote) + 1;
        dashArr = semitonesArr.slice(semitonesArr.indexOf(firstNote) + 1, semitonesArr.indexOf(lastNote)).filter(dash => dash == '-');
    }

    switch (firstNoteAccidentals) {
        case 'b':
            dashArr.push('-');            
            break;

        case 'bb':
            dashArr.push('-','-');            
            break;

        case '#':
            dashArr.pop();            
            break;

        case '##':
            dashArr.pop();            
            dashArr.pop();            
            break;
        default:
            break;
    }
    
    switch (lastNoteAccidentals) {
        case '#':
            dashArr.push('-');            
            break;

        case '##':
            dashArr.push('-','-');            
            break;

        case 'b':
            dashArr.pop();            
            break;

        case 'bb':
            dashArr.pop();            
            dashArr.pop();            
            break;
        default:
            break;
    }

    intervalsObj.forEach(obj => {
        if(degree == obj.degrees && dashArr.length == obj.semitone) intervalName = obj.name;
    });

    if (!intervalName) return 'Cannot identify the interval';

    return intervalName;

}