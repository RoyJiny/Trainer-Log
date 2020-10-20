import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}> {title} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        height: 40,
        alignSelf: 'stretch'
    },
    titleStyle: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom:5,
        fontWeight: 'bold'
    }
});

export default Header;