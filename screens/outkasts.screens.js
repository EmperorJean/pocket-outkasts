import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NordTheme } from '../components/theme';
import { useFocusEffect } from '@react-navigation/native';
import { CommonStyles } from '../styles/common.styles';

const OutkastsScreen = ({ navigation }) => {
  const [outkastsData, setOutkastsData] = useState(null);

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

  if (!outkastsData) {
    return (
      <View style={[CommonStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={[styles.infoText, { marginBottom: 15 }]}>No Outkast data found. Please go to the Login screen to fetch your Outkasts.</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')} // Make sure the route name matches your Login screen route
          color={NordTheme.primary}
        />
      </View>
    );
  }

  if (outkastsData.length === 0) {
    return (
      <View style={[CommonStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={[styles.infoText, { marginBottom: 15 }]}>No Outkasts found. Please use a wallet that holds at least one outkast.</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')} // Make sure the route name matches your Login screen route
          color={NordTheme.primary}
        />
      </View>
    );
  }

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.header}>My Outkasts</Text>
      <ScrollView>
        {outkastsData && outkastsData.map((item, index) => (
          <View key={index} style={styles.outkastItem}>
            <Image source={{ uri: `https://mnnt.io/collections/outkasts/low_res/${item.token_id}` }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.infoText}>Name: {item.name}</Text>
              <Text style={styles.infoText}>Level: {item.level}</Text>
              <Text style={item.deployed_to ? styles.infoTextD : styles.infoTextND}>Status: {item.deployed_to ? `Deployed` : 'Not Deployed'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outkastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: NordTheme.container,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  infoText: {
    color: NordTheme.text,
  },
  infoTextD: {
    color: 'cyan',
  },
  infoTextND: {
    color: NordTheme.highlight,
  }
});

export default OutkastsScreen;
