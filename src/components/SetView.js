import React,{Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ExcerciseView from './ExcersiceView';

class SetView extends Component{
    render () {
        return (
            <View>
                <FlatList
                    style = {styles.listStyle}
                    data = {this.props.data.sort(
                        (exc1,exc2) => parseInt(exc1.excerciseNumber)-parseInt(exc2.excerciseNumber)
                    )}
                    renderItem = { ({item}) => 
                        <ExcerciseView data={item}/>
                    }
                    keyExtractor = {() => (Math.floor(Math.random() * 10000) + 1).toString()}
                />
            </View>  
        );
    }
}

const styles = StyleSheet.create({
    listStyle: {
        marginBottom: 20
    }
});

export default SetView;