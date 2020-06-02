import firebase from 'firebase'
import { ThemeColors } from 'react-navigation'

class Fire{
    constructor(){
        this.init()
        this.checkAuth()
    }

    init = ()=> {
        if(!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDisp8O9f_NWL4kY7ZRBHWRezPoL2J0uQU",
                authDomain: "chata-d500f.firebaseapp.com",
                databaseURL: "https://chata-d500f.firebaseio.com",
                projectId: "chata-d500f",
                storageBucket: "chata-d500f.appspot.com",
                messagingSenderId: "667143099634",
                appId: "1:667143099634:web:2086a7e3c3e9c04f5cac6b"
            })
        }
    }

    checkAuth = ()=> {
        firebase.auth().onAuthStateChanged(user => {
            if (!user){
                firebase.auth().signInAnonymously()
            }
        })
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message)
        })
    }

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return{
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    off(){
        this.db.off()
    }

    get db(){
        return firebase.database.ref("messages")
    }

    get uid(){
        return(firebase.auth().currentUser || {}).uid
    }
}

export default new Fire()