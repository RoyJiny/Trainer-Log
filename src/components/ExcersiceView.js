import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

class ExcerciseView extends Component {
    render () {
        const {excerciseName, muscleName,startRep,endRep,sets} = this.props.data;

        return (
            <View style={styles.containerStyle}>
                <Text style={styles.titleStyle}>{excerciseName}</Text>
                <Text style={styles.smallTitleStyle}>{muscleName}</Text>
                <View style={styles.horizontalContainerStyle}>
                    <Text style={styles.textStyle}>{sets} Sets</Text>
                    <Text style={styles.textStyle}>{startRep} to {endRep} Reps</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    smallTitleStyle: {
        textAlign: 'center',
        fontSize: 17
    },
    textStyle: {
        padding: 5
    },
    horizontalContainerStyle: {
        flexDirection: 'row',
        justifyContent:'space-between'
    }
});

export default ExcerciseView;