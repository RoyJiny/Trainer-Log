import React from 'react';
import {TouchableOpacity,View , Text ,StyleSheet} from 'react-native';

const ProgramsListButton = ({title, onPress}) => {
    return (
        <View style={styles.containerStyle}>
            <TouchableOpacity style={styles.touchableStyle} onPress={onPress}> 
                <Text style={styles.textStyle}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center'
    },
    touchableStyle: {
        height: 30,
        width: 200,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 10
    }
});

export default ProgramsListButton;