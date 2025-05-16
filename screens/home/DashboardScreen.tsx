import React, {useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../../constants/constants";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';

// Define the props type for the component
type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface DashboardProps {
  navigation: DashboardScreenNavigationProp;
}

const Dashboard: React.FC<DashboardProps> = async ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [user_name, setUserName] = useState<string>('');
    
    const getValues = async () =>{
        const emailStored =  await AsyncStorage.getItem('email') || '';
        const userNameStored = await AsyncStorage.getItem('user_name') || '';
        setEmail(emailStored);
        setUserName(userNameStored);
    }
    useEffect(() => {
        getValues();
    },[]);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${API_URL}user/logout`);
            if (response?.data?.success) {
                await AsyncStorage.clear();
                navigation.navigate("Login");
            }
        } catch (error: any) {
            Alert.alert(
                  "Logout Failed",
                  error.response?.data?.message || "An error occurred during login"
                );
            throw error;
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>My Dashboard</Text>
                    <View style={styles.userMenu}>
                        <Text style={styles.welcomeText}>Welcome, {user_name}</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                <View style={styles.contentWrapper}>
                    <View style={styles.leftSection}>
                        <Text style={styles.sectionTitle}>Welcome Back!</Text>
                        <Text style={styles.userEmail}>{email}</Text>
                        <Text style={styles.description}>We're glad to see you again. Here's your personalized dashboard.</Text>
                    </View>

                    <View style={styles.verticalDivider} />

                    <View style={styles.rightSection}>
                        <Text style={styles.sectionTitle}>Your Unique QR Code</Text>
                        <View style={styles.qrCodeContainer} >
                            {email ? <QRCode value={email} size={160} /> : null}
                        </View>
                        <Text style={styles.qrHint}>Scan this code for quick access</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#4267b2',
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1200,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    userMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    welcomeText: {
        color: 'white',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    logoutButtonText: {
        color: 'white',
    },
    mainContent: {
        flex: 1,
        padding: 20,
    },
    contentWrapper: {
        flexDirection: 'row',
        gap: 20,
    },
    leftSection: {
        flex: 1,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userEmail: {
        color: '#4267b2',
        fontWeight: '500',
        marginVertical: 5,
    },
    description: {
        color: '#333',
    },
    rightSection: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    verticalDivider: {
        width: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    qrCodeContainer: {
        width: 180,
        height: 180,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    qrHint: {
        color: '#666',
        fontSize: 14,
    },
});

export default Dashboard;