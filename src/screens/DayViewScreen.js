import React,{Component} from 'react';
import {View, FlatList, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import Header from '../components/Header';
import SetView from '../components/SetView';

class DayViewScreen extends Component {
    async componentDidMount() {
        const {dayNumber, program} = this.props.navigation.state.params;
        await getDaySets(program, dayNumber).then(data => this.setState(data));
    }

    render() {
        if (!this.state){  //dont have data yet
            return <ActivityIndicator size='large' color='black'/>;
        }

        var sets =[]
        
        for (var key in this.state){  //get only the excercises part
            sets.push(Object.values(this.state[key]));
        }

        //sort for the sets order
        sets = sets.sort((set1, set2) => parseInt(set1[0])-parseInt(set2[0]))
        
        const modifiedSets =[];
        //turn the sets array to the required structure for render
        for (var i=0; i<sets.length; i++){ 
            var filtered = sets[i].filter(variable => typeof variable === typeof {});
            modifiedSets.push(filtered.map(set => Object.values(set)))
        }

        const {dayNumber} = this.props.navigation.state.params;
        
        return (
            <View>
                <Header title={`Day ${dayNumber}`}/>
                <FlatList
                    style={styles.listStyle}
                    data={modifiedSets}
                    renderItem = { ({item}) => 
                        <SetView data={item[0]}/> //[0] because we got a double array
                    }
                    keyExtractor = {() => (Math.floor(Math.random() * 10000) + 1).toString()}
                />
            </View>
        );
    }

}

const getDaySets = async (programName, dayNumber) => {
    data = await AsyncStorage.getItem(`program_${programName}`);
    return JSON.parse(data).days[`day${dayNumber}`].sets;
};

const styles = StyleSheet.create({
    listStyle: {
        marginTop: 25
    }
});

export default DayViewScreen;