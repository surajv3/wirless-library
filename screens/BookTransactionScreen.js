import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permission from 'expo-permission'
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scanData:"",
            buttonState:'normal'
        }
    }

    getCameraPermission=async()=>{
        const {status}=await Permission.askAsync(Permission,CAMERA);

        this.setState({
            hasCameraPermission:status==='granted'

        })
    }
    handleBarCodeScan=async({type,data})=>{
        this.setState({
            scanned:true,
            scanData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==='clicked'&& hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned? undefined:this.handleBarCodeScan}
                />
            )
        }
        else if(buttonState==='normal'){


        
        return(
            <View style={styles.container}>
                <Text style={styles.displayText}>
                    hasCameraPermission===true?this.state.scanData:"requestCameraPermission"
                    
                </Text>
                <TouchableOpacity 
                onPress={this.getCameraPermission}
                style={styles.scanButton}>
                    <Text style={styles.displayText}>

                        Scan QR Code
                    </Text>

                </TouchableOpacity>

            </View>
        )
    }
}
}

const styles=StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',

    },
    scanButton:{
        backgroundColor:'red',
        padding:10,
        margin:10
    }
})