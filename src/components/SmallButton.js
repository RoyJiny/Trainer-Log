import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const SmallButton = ({title, onPress}) => {
    return (
        <TouchableOpacity style={styles.touchableStyle} onPress={onPress}>
            <Text style={styles.textStyle}> {title} </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableStyle: {
        height: 40,
        width: 200,
        borderColor: 'gray',//'rgb(10,199,187)',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 20,
        color: 'gray',//'rgb(10,199,187)',
        textAlign: 'center',
        paddingBottom: 5
    }
});

export default SmallButton;