import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SplashScreen extends Component<any> {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Onboarding');
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Smart Education App</Text>
                <Text style={styles.subtitle}>
                    Learn • Practice • Succeed
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F6D7A',
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#e0e0e0',
        marginTop: 8,
    },
});
