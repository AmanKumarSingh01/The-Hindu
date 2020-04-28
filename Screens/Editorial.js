import React, { Component } from 'react'
import { Text, View  ,ActivityIndicator, SafeAreaView} from 'react-native'
import { connect } from 'react-redux'
import { init  , details} from "./../Features/Fetch";
import {Card , Button , Icon} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './Details';



export const  Loading = (props) => {
    return (
        <View>
            {props.data.News.isLoded === true ? <News data ={props.data} /> :<ActivityIndicator size="large" color="#0000ff" />}
        </View>
    )
}

export const News = (props) => {
    return(
        <SafeAreaView>
            <ScrollView>
                <View>
                    {props.data.News.Edtiorial.map(d => (
                        <List data = {d} navigation = {props.data.navigation} Func = { props.data.details} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}



export class List extends Component{
    readMore =(link) => {
        this.props.Func(link)
        this.props.navigation.navigate("Detail" , link)
    }
    render(){
        return(
            <View>
                <Card
                    // title="National"
                    image={{uri : this.props.data.image}}
                    // imageStyle={{width : '100%', minWidth : '100%', height : 80}}
                    >
                    <Text style={{marginBottom: 10}}>
                        {this.props.data.headlines}
                    </Text>
                    <Button
                        onPress = {() => this.readMore(this.props.data.link)}
                        icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='READ MORE' 
                    />
                </Card>
            </View>
        )
    }
   
}





const Stack = createStackNavigator();
class Editorial extends Component {
    componentDidMount(){
        
        this.props.init()
    }

    render() {
        console.log(this.props)
        return (
            <Stack.Navigator>
                <Stack.Screen name="Editorial" component={() => <Loading data ={this.props} />} />
                <Stack.Screen name="Detail" component={() => <Details data = {this.props}/>} />
            </Stack.Navigator>
            // <View>
            //     <Loading data ={this.props} />
            // </View>
        )
    }
}
const mapStateToProps = (state) => ({
    News : state.News,
})

export default connect(mapStateToProps , {init ,details}) (Editorial)