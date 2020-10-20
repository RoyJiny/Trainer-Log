import React,{useState,useContext} from 'react';
import {View, Text, TextInput, StyleSheet } from 'react-native';
import {Context as ProgramContext} from '../context/ProgramContext';

const SingleExcerciseForm = ({dayKey, setKey,excercise}) => {
    const {editExcercises} = useContext(ProgramContext); //for updating the data in the application
    const [exc, setExc] = useState(excercise); //for tracking the data inside the input for the form
    const {excerciseName, muscleName, startRep, endRep, sets} = exc;
    var excKey = `excercise${excercise.excerciseNumber}`;

    return (
        <View>
            <View style={styles.firstContainerStyle}>
                <TextInput 
                    value={excerciseName} 
                    style={styles.textInputStyle} 
                    placeholder="Excercise Name"
                    onChangeText={(text) => 
                        {
                            setExc({...exc, excerciseName: text});
                            newExc = {...excercise, excerciseName: text};
                            editExcercises(dayKey, setKey, excKey, newExc);
                        }
                    }
                />
                <Text> Reps:</Text>
                <TextInput 
                    keyboardType="number-pad"
                    value={startRep} 
                    style={styles.boxInputStyle}
                    onChangeText={(text) => 
                        {
                            setExc({...exc, startRep: text});
                            newExc = {...excercise, startRep: text};
                            editExcercises(dayKey, setKey, excKey, newExc);
                        }
                    }
                />
                <Text> to</Text>
                <TextInput 
                    keyboardType="number-pad"
                    value={endRep} 
                    style={styles.boxInputStyle}
                    onChangeText={(text) => 
                        {
                            setExc({...exc, endRep: text});
                            newExc = {...excercise, endRep: text};
                            editExcercises(dayKey, setKey, excKey, newExc);
                        }
                    }
                />
            </View>

            <View style={styles.secondContainerStyle}>
                <TextInput 
                    value={muscleName} 
                    style={styles.textInputStyle} 
                    placeholder="Muscles"
                    onChangeText={(text) => 
                        {
                            setExc({...exc, muscleName: text});
                            newExc = {...excercise, muscleName: text};
                            editExcercises(dayKey, setKey, excKey, newExc);
                        }
                    }
                />
                <Text> Sets:</Text>
                <TextInput 
                    keyboardType="number-pad"
                    value={sets} 
                    style={styles.boxInputStyle}
                    onChangeText={(text) => 
                        {
                            setExc({...exc, sets: text});
                            newExc = {...excercise, sets: text};
                            editExcercises(dayKey, setKey, excKey, newExc);
                        }
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    firstContainerStyle: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    secondContainerStyle: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    textInputStyle: {
        height: 40,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5   
    },
    boxInputStyle: {
        height: 30,
        width: 30,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5
    }
});

export default SingleExcerciseForm;