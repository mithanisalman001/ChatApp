import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../Fire'

export default class ChatScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Chat Screen</Text>
            </View>
        )
    }
}

