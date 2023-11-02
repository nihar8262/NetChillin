import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import {firebaseConfig} from '../config/firebase';
import firebase from 'firebase/compat/app';
import tw from 'twrnc'

 const otpScreen=()=> {
  
   
    const [phoneNumber,setPhoneNumber] = useState('');
    const [code,setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification=()=>{
         const phoneProvider = new firebase.auth.PhoneAuthProvider;
         phoneProvider 
               .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
               .then(setVerificationId);
               setPhoneNumber('');
    };

    const  confirmCode =()=>{
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code 
        );
        firebase.auth().signInWithCredential(credential)
        .then(()=>{
            setCode('');
        })
        .catch((error)=>{
            // show error
            alert(error);
        })
        Alert.alert(
            'Login Successful.Welcome to Dashboard',
        );
    }

    return(
        <View style={tw`flex-1  items-center justify-center bg-neutral-700`}>
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={firebaseConfig}
            />
            <Text style={tw`text-center text-white font-bold text-lg`}>
                Login using OTP</Text>
            <TextInput 
               placeholder='Phone number with contry code'
               onChangeText={setPhoneNumber}
               keyboardType='phone-pad'
               autoComplete='tel'
               style={tw` mt-5 p-5 text-xl border-black border-2 mb-10 text-center text-[#fff] rounded-md`}
            />
            <TouchableOpacity  style={tw` mt-5 p-5 bg-[#3498db] rounded-md`}
               onPress={sendVerification}
            >
               <Text style={tw`text-center text-white font-bold`}> Send Verification</Text>
            </TouchableOpacity>

            <TextInput style={tw`m-4 border-b-2 `}
               placeholder='Confirm code'
               onChangeText={setCode}
               keyboardType='number-pad'
               
            />
             <TouchableOpacity style={tw`p-5 bg-[#9b59b6] rounded-md`}
               onPress={confirmCode}
            >
               <Text style={tw`text-center text-white font-bold`}> 
                Confirm  Verification</Text>
            </TouchableOpacity>
        </View>
    )

  
}

export default otpScreen;