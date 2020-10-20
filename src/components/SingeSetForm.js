import React,{useState,useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import SingleExcerciseForm from '../components/SingleExcerciseForm';
import {Context as ProgramContext} from '../context/ProgramContext';

const SingleSetForm = ({dayKey, setData}) => {
    const {state, editExcercises} = useContext(ProgramContext);
    var setKey = `set${setData.setNumber}`;

    return (
        <View style={styles.containerStyle}>
            <FlatList
                data={Object.values(state.days[dayKey].sets[setKey].excercises).sort(
                    (exc1,exc2) => {
                        return parseInt(exc1.excerciseNumber)-parseInt(exc2.excerciseNumber); //keep sets in order
                    }
                )}
                renderItem={({item}) => 
                    <SingleExcerciseForm dayKey={dayKey} setKey={setKey} excercise={item}/>
                }
                keyExtractor={(item) => item.excerciseId}
            />
            
            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={() => 
                    {
                        var excCounter = 
                            Object.keys(state.days[dayKey].sets[setKey].excercises).length + 1;
                        
                            var excKey = `excercise${excCounter.toString()}`;
                        var excercise = {
                                excerciseNumber:excCounter.toString(),
                                excerciseId: (Math.floor(Math.random() * 10000) + 1).toString(),
                                excerciseName: '',
                                muscleName: '',
                                startRep: '',
                                endRep: '',
                                sets: ''
                        };
                        editExcercises(dayKey,setKey,excKey, excercise);
                    } 
                } 
            >
                <Text style={styles.buttonTextStyle}>Add Excercise to Set</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles= StyleSheet.create({
    containerStyle:{
        marginBottom: 5
    },    
    buttonStyle: {
        height: 30,
        width: 200,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonTextStyle:{
        fontSize: 16,
        color: 'gray',
        textAlign: 'center'
    }    
});

export default SingleSetForm;