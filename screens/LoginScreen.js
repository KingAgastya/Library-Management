import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, ToastAndroid, Alert} from 'react-native';
import * as Speech from 'expo-speech';
import * as firebase from 'firebase'
import db from '../config.js'

export default class LoginScreen extends React.Component{

    constructor(){
        super()
        this.state({
            emailId : "",
            password : "",
            thingToSay : ""
        })
    }

    speak=()=> {
        var thingToSay = this.state.thingToSay;
        Speech.speak(thingToSay);
    }

    login =async(emailId, password)=>{
        if(emailId && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(emailId, password)
                if(response){
                    this.props.navigation.navigate("Transaction")
                }
            }
            catch(error){
                switch(error.code){
                    case "auth/user-not-found" : 
                        this.speak("User doesn't exist")
                        console.log("Doesn't exist")
                    break

                    case "auth/invalid-email" : 
                        this.speak("Incorrect email Id or Password")
                        console.log("Wrong email/password")
                    break
                }
            }
        }
        else{
            this.speak("OI DONT PRESS SUBMIT BUTTON WITHOUT ENTERING EMAIL AND PASSWORD")
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems : 'center', marginTop : 20}}>
                <View style = {styles.container}>
                    <View>
                        <Image source = {require("./assets/booklogo.jpg")}
                        style = {{width : 200, height : 200}}/>
                        <Text style = {{textAlign : 'center', fontSize : 25}}>Wily</Text>
                    </View>
                    <View>
                        <TextInput style = {styles.loginBox}
                        placeholder = "Email Id"
                        keyboardType = "email-address"
                        onChangeText = {(text) =>{this.setState({
                            emailId : text
                        })}}/>

                        <TextInput style = {styles.loginBox}
                        secureTextEntry = {true}
                        placeholder = "Password"
                        onChangeText = {(text) =>{this.setState({
                            password : text
                        })}}/>
                    </View>
                    <View>
                        <TouchableOpacity style = {{height : 30, width : 90, borderWidth : 1, backgroundColor : "grey", marginTop : 20, paddingTop : 5, borderRadius : 7}}
                        onPress = {() =>{
                            this.login(this.state.emailId, this.state.password)
                        }}>
                            <Text style = {{textAlign : 'center',}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    loginText : {
        color : "#00ffff", 
        fontWeight : "bold", 
        justifyContent : "center", 
        fontSize : 30, 
    },
    loginBox : {
        padding : 1,
        borderWidth : 3,
        borderHeight : 10,
        width : 50,
        height : 30,
        alignItems : "center",
        marginTop : 200, 
        marginBottom : 200, 
        marginLeft : 50, 
        marginRight : 50, 
    }
})
