import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {navigate} from '../navigationRef';

const DaySelectionButton = ({dayNumber, programName}) => {
    return (
        <View style={styles.containerStyle}>
            <TouchableOpacity style={styles.textStyle} onPress={
                () => navigate('DayView', {dayNumber: dayNumber, program:programName})
            }>
                <Text style={styles.touchableStyle}> 
                    Day 
                    {dayNumber}/7
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 21,
        padding: 10,
        paddingLeft: 15
    },
    touchableStyle: {
        
    },
    containerStyle: {
        borderColor: 'black',
        borderWidth: 1,
        height: 60,
        width: 60,
        borderRadius: 100
    }
});

export default DaySelectionButton;