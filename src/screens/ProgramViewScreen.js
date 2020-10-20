import React,{Component} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    AsyncStorage, 
    FlatList, 
    ActivityIndicator,
    Alert} from 'react-native';
import Header from '../components/Header';
import DaySelectionRow from '../components/DaySelectionRow';
import Button from '../components/Button';

class ProgramViewScreen extends Component {
    async componentWillMount() { //get the data when component first renders
        const {navigation} = this.props;
        const program = navigation.getParam('program'); 
        await getProgramData(program).then(data => this.setState(JSON.parse(data).days));
    }

    render (){
        if (!this.state){  //dont have data yet
            return <ActivityIndicator size='large' color='black'/>;
        }

        const {navigation} = this.props;
        const program = navigation.getParam('program');        

        //create days array for display:
        const days = [];
        var counter = 1;
        for (var key in this.state){
            days.push({dayNumber: counter, id: `${counter}`});
            counter ++;
        }

        //create an arrays of days trios - cause the display is in rows of three:
        const splittedDays = [];
        for (i=0; i<days.length; i +=3){
            trio = days.slice(i,i+3);
            splittedDays.push(trio);
        }

        return (
            <View style={styles.containerStyle}>
                <Header title={program}/>
                <Text style={styles.textStyle}>Select A Day:</Text>
                <FlatList                
                    data={splittedDays}
                    renderItem={({item}) => 
                        <DaySelectionRow programName={program} days={item}/>
                    }
                    keyExtractor={() => (Math.floor(Math.random() * 10000) + 1).toString()}
                />
                <Button
                    title='Edit Program'
                    onPress={() => navigation.navigate('CreateProgram', {program: program})}
                />
                <Button
                    title='Delete Program'
                    onPress={() => {
                        Alert.alert(
                            'Sure??',
                            `Are You Sure You Want To Delete ${program}?`,
                            [
                                {text: 'Cancel', onPress: () => {}},
                                {text: 'Delete', onPress: () => {
                                        deleteProgram(program, navigation.navigate)
                                    }
                                }
                            ]
                        )
                    }}
                />
            </View>
        );
    }
};

const getProgramData = async (programName) => {
    data = await AsyncStorage.getItem(`program_${programName}`);
    return data;
};

const deleteProgram = async (programName, navigate) => {
        var excistingPrograms = await AsyncStorage.getItem('programNames');
        excistingPrograms = excistingPrograms.split(',');
        var index = excistingPrograms.indexOf(programName);
        excistingPrograms.splice(index,1);
        
        await AsyncStorage.setItem('programNames', excistingPrograms.join(','));
        await AsyncStorage.removeItem(`program_${programName}`);
        
        navigate('Home');
    }

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 22
    },
    containerStyle: {
        flex: 1
    }
});

export default ProgramViewScreen;