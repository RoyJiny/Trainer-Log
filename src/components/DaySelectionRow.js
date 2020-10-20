import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import DaySelectionButton from './DaySelectionButton';

const DaySelectionRow = ({days, programName}) => {
    return (
        <View style={styles.containerStyle}>
            <FlatList
                horizontal = {true}
                contentContainerStyle={styles.listStyle}
                data={days}
                renderItem={({item}) => 
                    <DaySelectionButton programName={programName} dayNumber={item.dayNumber}/>
                }
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listStyle: {
        justifyContent: 'space-around',
        flex: 1,
        paddingVertical: 15
    },
    containerStyle: {
        
    }
});

export default DaySelectionRow;