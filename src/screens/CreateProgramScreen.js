import React,{useState, useContext, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView, 
    AsyncStorage,
    ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import SmallButton from '../components/SmallButton';
import DayCreationForm from '../components/DayCreationForm';
import {Context as ProgramContext} from '../context/ProgramContext';
import Button from '../components/Button';

const CreateProgramScreen = ({navigation}) => {
    const {
        state, 
        addDay, 
        setName, 
        saveProgram, 
        reset, 
        loadProgramToEdit} = useContext(ProgramContext);

    useEffect(() => 
        {
            const program = navigation.getParam('program')
            if (program){
                loadProgramToEdit(program);
            }            
        }
    ,[]);  
    
    if (!state){  //dont have data yet
        return <ActivityIndicator size='large' color='black'/>;
    }

    let flatlist = null;
    function scrollDown (){
        flatlist.scrollToEnd();
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
            <Header title="Custumize Program"/>

            <TouchableOpacity 
                style={styles.clearButtonStyle}
                onPress={() => {
                    reset();
                }}
            >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Clear</Text>
            </TouchableOpacity>
            
            <View style={styles.inputContainerStyle}>
                <Text style={styles.textStyle}>Program Name:</Text>
                <TextInput 
                    style={styles.textInputStyle}
                    value={state.name}
                    onChangeText={(text) => setName(text)}
                />                
            </View>
                    
            <FlatList
                data={
                    Object.values(state.days).sort(
                        (day1,day2) => {
                            return parseInt(day1.dayNumber)-parseInt(day2.dayNumber); //keep days in order
                        }
                    )
                } //lets us render an object insted of array
                renderItem={({item}) => 
                    <DayCreationForm dayData={item}/>
                }
                keyExtractor={(item)=>item.dayId}
                ref = {(FlatList) => {flatlist=FlatList}}
                onContentSizeChange={scrollDown} 
            />         
            
            <SmallButton 
                title="Add Day"
                onPress={() => 
                    {
                        var daysLength = Object.keys(state.days).length+1;
                        var key = `day${daysLength.toString()}`;
                        var day = {
                                dayNumber:daysLength.toString(),
                                dayId: (Math.floor(Math.random() * 10000) + 1).toString(),
                                sets: {}
                        };
                        addDay(day, key);
                    } 
                } 
            />

            <Button title="Save" onPress={() => saveProgram(state)}/>
        </KeyboardAvoidingView>
    );
};

const tryProgramLoad = async (programName) => {
    data = await AsyncStorage.getItem(`program_${programName}`);
    if (data){

    }
}

const styles = StyleSheet.create({
    containerStyle:{
        flex: 1
    },
    textStyle:{
        fontSize: 20,
        paddingHorizontal: 15
    },
    textInputStyle: {
        height: 30,
        width: 170,
        borderColor: 'rgba(0,0,0,0.75)',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4
    },
    inputContainerStyle:{
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 15
    },
    clearButtonStyle: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'rgb(192,192,192)',
        marginHorizontal: 20,
        borderRadius: 5
    }
});

export default CreateProgramScreen;