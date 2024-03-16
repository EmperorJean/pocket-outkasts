import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NordTheme } from '../components/theme';
import { useFocusEffect } from '@react-navigation/native';

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
      <View style={styles.containerNo}>
        <Text style={[styles.infoText, { marginBottom: 15 }]}>No Outkast data found. Please go to the Login screen to fetch your Outkasts.</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')} // Make sure the route name matches your Login screen route
          color={NordTheme.primary}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordTheme.background,
  },
  containerNo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: NordTheme.background,
  },
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
