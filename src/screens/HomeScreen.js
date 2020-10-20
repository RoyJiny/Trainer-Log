import React,{ Component} from 'react';
import {View, Text, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import ProgramsListButton from '../components/ProgramsListButton';
import Button from '../components/Button';

class HomeScreen extends Component {
    async componentDidMount() {
        await getProgramNames().then(data => this.setState(data));
    }

    render () {
        const navigation = this.props.navigation;  

        if (!this.state){  //dont have data yet
            return <ActivityIndicator size='large' color='black'/>;
        }

        return (
            <View style={styles.containerStyle}>
                <Header title="Trainer Log - by Roy Jiny"/>
                <Text style={styles.titleStyle}>Select A Training Program</Text>
                <FlatList
                    data={Object.values(this.state)}
                    renderItem={({item}) => 
                        <ProgramsListButton 
                            title={item}
                            onPress={() => navigation.navigate('ProgramView', {program: item})}
                        />
                    }
                    keyExtractor={() => (Math.floor(Math.random() * 10000) + 1).toString()}
                    style={styles.listStyle}
                />

                <Button 
                    title="Create A New Program"
                    onPress={() => navigation.navigate('CreateProgram')}
                />

                <TouchableOpacity onPress={async () => {
                        await getProgramNames().then(data => this.setState(data));}
                    }
                >
                    <Text>Refresh</Text>
                </TouchableOpacity>

            </View>
        );
    }
};

const getProgramNames = async () => {
    data = await AsyncStorage.getItem('programNames');
    if (data == null){
        return [];
    }
    return(data.split(','));
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 25,
        textAlign: 'center'
    },
    listStyle: {
        marginTop: 40
    },
    containerStyle: {
        flex: 1,
        alignItems: 'center'
    }
});

export default HomeScreen;