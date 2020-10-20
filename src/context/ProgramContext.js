import {AsyncStorage} from 'react-native';
import CreateDataContext from './createDataContext';
import {navigate} from '../navigationRef';

const programReducer = (state, action) => {
    switch (action.type){
        case 'reset':
            return {name: '', days: {}};
        case 'load':
            return action.payload;
        case 'addDay':
            return {...state, 
                days: {...state.days, [action.payload.key]:action.payload.day }
            };
        case 'setName':
            return {...state, name: action.payload};
        case 'editDaySets':
            const {dayKey, setKey, set} = action.payload;

            return {...state,
                    days: {...state.days, 
                        [dayKey]: {...state.days[dayKey],
                            sets: {...state.days[dayKey].sets, 
                                [setKey]: set}
                    }}
        };
        case 'editExcercises':
            const {dayNumber, setNumber, excKey,excercise} = action.payload;

            return {...state,
                days: {...state.days, 
                    [dayNumber]: {...state.days[dayNumber],
                        sets: {...state.days[dayNumber].sets, 
                            [setNumber]: {...state.days[dayNumber].sets[setNumber],
                                excercises: {...state.days[dayNumber].sets[setNumber].excercises,
                                    [excKey]: excercise
                    }}}
                }}
    };

        default:
            return state;
    }
}

const reset = (dispatch) => 
    () => {
        dispatch({type: 'reset', payload: {}})
    };

const loadProgramToEdit = (dispatch) => 
    async (programName) => {
        const value = await AsyncStorage.getItem(`program_${programName}`);
        dispatch({type: 'load', payload: JSON.parse(value)})
    };

const addDay = (dispatch) =>
    (dayObj, dayKey) => {
        dispatch({type: 'addDay', payload: { key: dayKey, day: dayObj } } );
    };

const setName = (dispatch) => 
    (name) => {
        dispatch({type: 'setName', payload: name});
    };

const editSets = (dispatch) => 
    (dayKey, setKey, setObj) => {
        dispatch({type: 'editDaySets', payload: {dayKey,setKey, set: setObj}})
    };

const editExcercises = (dispatch) =>
//used dayNumber and setNumber because dayKey and setKey were allready decleared but the meanning is with key 
    (dayNumber, setNumber, excKey, excObj) => { 
        dispatch({type: 'editExcercises', payload: {dayNumber,setNumber,excKey,excercise: excObj}})
    };

const saveProgram = () => 
    async (program) => {
        try{
            var editted = false;
            const excistingPrograms = await AsyncStorage.getItem('programNames');
            
            if (excistingPrograms){
                if (excistingPrograms.includes(program.name)){
                    editted = true;
                }}
            
            if (excistingPrograms == null){ //no programs are saved
                await AsyncStorage.setItem('programNames', `${program.name}`);
            } 
            else {
                if (!excistingPrograms.includes(program.name)){
                    AsyncStorage.getItem('programNames')
                        .then(async (data) => {
                            if (data){
                                data = data.split(',');
                            } else{
                                data = [];
                            }
                            data = [...data, program.name];
                            await AsyncStorage.setItem('programNames', data.join(','));
                        })
                }
            }
            if (editted){
                await AsyncStorage.removeItem(`program_${program.name}`);
            }
            await AsyncStorage.setItem(`program_${program.name}`, JSON.stringify(program));
            navigate('Home');
        } catch(err){
            console.log(err);
        }
    };

const deleteProgram = () =>
    async (programName) => {
        var excistingPrograms = await AsyncStorage.getItem('programNames');
        excistingPrograms = excistingPrograms.split(',');
        var index = excistingPrograms.indexOf(programName);
        excistingPrograms.splice(index,1);
        
        await AsyncStorage.setItem('programNames', excistingPrograms.join(','));
        
        navigate('Home');
    }

export const {Provider, Context} = CreateDataContext(
    programReducer,
    {addDay, setName, editSets, editExcercises, saveProgram, reset, loadProgramToEdit, deleteProgram}, //all the functions we created
    {name: '', days: {}} //initial state
)