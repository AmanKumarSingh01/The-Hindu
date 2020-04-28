import React, { Component } from 'react'
import { Text, View ,ActivityIndicator, SafeAreaView  ,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


export const  Loading = (props) => {
    console.log(props)
    return (
        <SafeAreaView>
            <ScrollView>
                {props.data.data.News.isLodingNews === true ? <Text style={styles.titleText}>{props.data.data.News.News}</Text>  :<View style = {{justifyContent:'center' , flex : 1 ,alignItems:'center' , flexDirection:'row'}}><ActivityIndicator size="large" color="#0000ff" /></View>}
            </ScrollView>
        </SafeAreaView>
    )
}


export default class Details extends Component {
    render() {
        console.log(this.props)
        return (
            <View>
                <Loading data = {this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Cochin"
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      padding: 10
    }
  });
  
