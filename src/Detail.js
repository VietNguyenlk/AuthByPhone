import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firestore from "@react-native-firebase/firestore"
import { TextInput } from "react-native-gesture-handler";

export default function Detail({route,navigation}){
    const {uid} =route.params;
    const [name,setName] =useState('')
    const [dob,setDob] =useState('')
    const [gender,setGender] =useState('')

    const saveDetail =async()=>{
        try{
            await firestore().collection("users").doc(uid).set({
                name,
                dob,
                gender
            });
            // after saving details, navigate to dashboard
            navigation.navigate('Dashboard')
        }catch(err){
            console.log("error saving detail",err)
        }
    }
    return(
        <View style={{flex:1,padding:10,backgroundColor:"#BEBDB8"}}> 
        <Text style={{fontSize:32,fontWeight:"bold",marginBottom:40,marginTop:150}}>
                enter your detail
        </Text>

        <TextInput style={{height:50,width:"100%",borderColor:"black",
        borderWidth:1,marginBottom:30,paddingHorizontal:30}} placeholder="name" 
        value={name}
        onChangeText={setName} />

<TextInput style={{height:50,width:"100%",borderColor:"black",
        borderWidth:1,marginBottom:30,paddingHorizontal:30}} placeholder="dob" 
        value={dob}
        onChangeText={setDob} />
            

            <TextInput style={{height:50,width:"100%",borderColor:"black",
        borderWidth:1,marginBottom:30,paddingHorizontal:30}} placeholder="gender" 
        value={gender}
        onChangeText={setGender} />

        <TouchableOpacity onPress={saveDetail} style={{backgroundColor:"#841584",
    padding:10,borderRadius:5,marginBottom:20,alignItems:"center"}} >

                <Text style={{color:"white",fontSize:22,fontWeight:"bold"}}>  save detail</Text>
        </TouchableOpacity>
            
            

        </View>
    )
}