import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const Button = ({title, onPress}) => {
    return (
        <TouchableOpacity style={styles.touchableStyle} onPress={onPress}>
            <Text style={styles.textStyle}> {title} </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableStyle: {
        height: 40,
        width: 350,
        borderColor: 'black',//'rgb(10,199,187)',
        borderWidth: 3,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 5
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',//'rgb(10,199,187)',
        textAlign: 'center'
    }
});

export default Button;