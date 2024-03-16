import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchDataForAddress } from '../tools/outkast.api'; // Adjust the import path as needed
import { NordTheme } from '../components/theme';

const HomeScreen = ({ navigation}) => {
  const [ethAddress, setEthAddress] = useState('');
  const [outkastsData, setOutkastsData] = useState([]);

  const handleSubmit = async () => {
    const data = await fetchDataForAddress(ethAddress);
    setOutkastsData(data);
    await AsyncStorage.setItem('outkastsData', JSON.stringify(data));
    navigation.navigate('My Outkasts');
  };
  
  // Load the stored data when the component mounts
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const storedData = await AsyncStorage.getItem('outkastsData');
        if (storedData) {
          setOutkastsData(JSON.parse(storedData));
        }
      };
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={{color: NordTheme.text}}>Enter your Ethereum wallet address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEthAddress}
        value={ethAddress}
        placeholder="0x..."
        placeholderTextColor={NordTheme.secondary}
      />
      <Button  color={NordTheme.primary} title="Fetch Outkasts" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: NordTheme.background,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: NordTheme.secondary,
    color: NordTheme.text,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: NordTheme.text
  }
});

export default HomeScreen;
