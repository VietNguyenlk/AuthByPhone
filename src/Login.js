import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { useNavigation } from "@react-navigation/native";

export default function Login(){
    const [phoneNumber,setPhoneNumber] = useState('')
    const [code,setCode] = useState('')
    const [confirm,setConfirm] = useState('')
    const navigation = useNavigation();

    const signInWithPhoneNumber = async()=>{
        try{
            const confirmmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmmation);
        }catch(error){
            console.log("Error sending code",error)
        }
    };
    const confirmcode = async()=>{
        try{
            const userCredential = await confirm.confirm(code);
            alert(userCredential)
            const user = userCredential.user;
            // check if user is new or existing
            const userDocument = await firestore()

            .collection("users")
            .doc(user.uid)
            .get();
            console.log(userDocument)
            console.log(userCredential)
            console.log(userCredential.user.phoneNumber)
          
          
            if(userDocument.exists){
                // if(!userCredential){
                // user is existing, navigate to dashboard
                navigation.navigate("Dashboard")
            }else{
                // user is new , navigate to detail
                navigation.navigate("Detail",{uid: user.uid})
            }
        }catch(error){
            console.log("invalid code",error)
        }
        
    }
    return(
        <View style={{flex:1,padding:10,backgroundColor:"#BEBDB8"}}>
            <Text style={{fontSize:32,
            fontWeight:'bold',
            marginBottom:40,
            marginTop:150
            
            }}>
                phone number authencation using firebase
            </Text>

            {!confirm?(
                    <>
                    <Text style={{marginBottom:20,fontSize:18}}>
                        enter your code
                    </Text>
                    <TextInput style={{height:50,width:'100%',borderColor:"black",
                        borderWidth:1,marginBottom:30, paddingHorizontal:10,
                }} placeholder="e.g.,+ 03465798"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                />

                <TouchableOpacity onPress={signInWithPhoneNumber} style={{backgroundColor:"#841584",
                padding:10,borderRadius:5,marginBottom:20,alignItems:"cener"

            }}>
                <Text style={{color:'white',fontSize:22,fontWeight:"bold"}}>send code</Text>


                </TouchableOpacity>
                </>

            ):(
                <>
                    <Text style={{marginBottom:20,fontSize:18
                    }}>
                        enter the code sent to your phone

                    </Text>

                    <TextInput style={{height:50,width:"100%",borderColor:"black",borderWidth:1,marginBottom:30
                    ,paddingHorizontal:10
                    }} placeholder="enter code" value={code} onChangeText={setCode}/>

                    <TouchableOpacity onPress={confirmcode} style={{
                        backgroundColor:"#841584",
                        padding:10,
                        borderRadius:5,
                        marginBottom:20,
                        alignItems:"center"

                    }}>
                        <Text style={{color:"white",fontSize:22,fontWeight:"bold"}}>confim code</Text>

                    </TouchableOpacity>
                </>
            )
            
            }
           
        
           
        </View>
    )
}