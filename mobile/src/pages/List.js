import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client'
import { SafeAreaView, Alert, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage, Image, Text } from 'react-native'
import api from '../services/api'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'


export default function List({ navigation }) {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.6:3333', {
                query: { user_id }
            })
        
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada '}`)
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    async function handleLogout() {
        await AsyncStorage.removeItem('user');
        
        navigation.navigate('Login');

        
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}/>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>
                Logout
                </Text>
            
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',

    }
})