let a = 5;
a = 6; // js allows reassignment of value of let declared var
// but doesn't allow redeclaration
// let a = 'blammo'; // => Uncaught SyntaxError: Identifier 'a' has already been declared

// examples from w3-schools:

// --- block scope ---
{
    let x = 2;
    // console.log(x); // => 2

    var b = 'wam';
}

// console.log(x); // => x is not defined
// now x can be declared outside the block-context above w/out conflicts
let x = 21;
// and can again be declared in a new block-context
{
    let x = 'schlambam';
}

// variables defined w/ 'var' are hoisted to the top
carName = 'Volvo';
var carName;
// not allowed w/ let
// vanName = 'Hippie Whip'; // => Cannot access before initialization
let vanName;

//      ----- const keyword -----
// consts vars are read-only and don't allow reassignment
const FAV_PET = 'Cats';
// FAV_PET = 'docs'; // => error: Assignment to constant variable

// values w/in a const array are mutable but the const can not be reassigned to another array, object, string, etc,.
const MY_ARR = [1, 2, 3, 4];
MY_ARR[1] = "mutant!";
// MY_ARR = 'wammo': // => error: Assignment to constant variable

//      ----- record collection -----
// Setup
const recordCollection = {
    2548: {
      albumTitle: 'Slippery When Wet',
      artist: 'Bon Jovi',
      tracks: ['Let It Rock', 'You Give Love a Bad Name']
    },
    2468: {
      albumTitle: '1999',
      artist: 'Prince',
      tracks: ['1999', 'Little Red Corvette']
    },
    1245: {
      artist: 'Robert Palmer',
      tracks: []
    },
    5439: {
      albumTitle: 'ABBA Gold',
      tracks: ['temp track']
    },
    5440: {
      albumTitle: "Ain't Got No Trizacks",
      artist: 'Schmeen Schmay',
    }
  };
  
// Only change code below this line
function updateRecords(records, id, prop, value) {
    // access record
    const record = records[id];
    // booleans
    const isString = val => typeof val === 'string';
    const isEmptyString = str => str.length === 0;
    const isUndefined = val => val === undefined;
    const isPropTracks = val => val === 'tracks';
    // add props.
    const addTracksArr = (track, record) => record.tracks = [track];
    const updStrProps = (prop, val) => record[prop] = val;
    
    switch (true) {
        case isPropTracks(prop) && !(value.length === 0):
          isUndefined(record.tracks) ? 
            addTracksArr(value, record) : 
            record.tracks.push(value);
          break;
        case !(isPropTracks(prop)) && value.length > 0:
          updStrProps(prop, value);
          break;
        case value === '':
          delete record[prop];
          break;
        default:
            console.log('* Invalid operation: recordCollection will NOT be updated');
    }

    return records;
}

// ======================     TESTS     ==================================
console.log(
  "**  If prop is tracks but the album doesn't have a tracks property, create an empty array and add value to it."
)
updateRecords(recordCollection, 5440, 'tracks', 'Just One Track'); 
log(recordCollection['5440'].tracks)
recordCollection[5440].tracks[0] === 'Just One Track' ?
  console.log('\n *** TEST: PASSED ***') :
  console.log('\n *** TEST: FAILED ***');
  

console.log("-------------------------------------------------------------------------", '\n\n\n');
// =================================================================


console.log(
  "**  If prop is tracks and value isn't an empty string, add value to the end of the album's existing tracks array."
)
updateRecords(recordCollection, 5440, 'tracks', 'One More Time'); 
log(recordCollection['5440'].tracks[1]);
log(recordCollection[5440])
recordCollection[5440].tracks[1] === 'One More Time' ?
  console.log('\n *** TEST: PASSED ***') :
  console.log('\n *** TEST: FAILED ***');


console.log("-------------------------------------------------------------------------", '\n\n\n');
// =================================================================


console.log(
  "If prop isn't tracks and value isn't an empty string, update or set that album's prop to value."
)
updateRecords(recordCollection, 1245, 'artist', 'Bjork'); 
// log('RIGHT HERE')
log(recordCollection[1245]);

recordCollection[1245].artist === 'Bjork' ?
  console.log('\n *** TEST: PASSED ***') :
  console.log('\n *** TEST: FAILED ***');


  console.log("-------------------------------------------------------------------------", '\n\n\n');
// =================================================================


console.log(
  'If value is an empty string, delete the given prop property from the album.'
)

  updateRecords(recordCollection, 5440, 'artist', ''); 
  log(recordCollection[5440]);
  let curr = recordCollection[5440];
  curr.artist === undefined ?
    console.log('\n *** TEST: PASSED ***') :
    console.log('\n *** TEST: FAILED ***');


// Dev Funcs.
function log(str) {
  console.log(str)
}
