import React,{useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import SmallButton from './SmallButton';
import SingleSetForm from '../components/SingeSetForm';
import SingleExcerciseForm from './SingleExcerciseForm';
import {Context as ProgramContext} from '../context/ProgramContext';

const DayCreationForm = ({dayData}) => {
    const {state, editSets} = useContext(ProgramContext);    
    var dayKey = `day${dayData.dayNumber}`;

    return (
        <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>Day {dayData.dayNumber}</Text>

            <FlatList
                data={Object.values(state.days[dayKey].sets).sort(
                    (set1,set2) => {
                        return parseInt(set1.setNumber)-parseInt(set2.setNumber); //keep sets in order
                    }
                )}
                renderItem={({item}) =>
                    <SingleSetForm dayKey={dayKey} setData={item}/>
                }
                keyExtractor={(item)=>item.setId}
            />
            
            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={() => 
                    {
                        var setsCounter = Object.keys(state.days[dayKey].sets).length +1;
                        var setKey = `set${setsCounter.toString()}`;
                        var set = {
                                setNumber:setsCounter.toString(),
                                setId: (Math.floor(Math.random() * 10000) + 1).toString(),
                                excercises: {}
                        };
                        editSets(dayKey, setKey, set);
                    } 
                } 
            >
                <Text style={styles.buttonTextStyle}>Add Set to Day</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle:{
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        margin: 15 
    },
    titleStyle: {
        fontSize: 20,
        paddingLeft: 5
    },    
    buttonStyle: {
        height: 30,
        width: 220,
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

export default DayCreationForm;