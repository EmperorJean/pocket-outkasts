import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { fetchInProgressMissions } from '../tools/outkast.api';
import { NordTheme } from '../components/theme';
import { CommonStyles } from '../styles/common.styles';
import { ExpandableText } from '../components/ExpandableText'
const MissionsScreen = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const inProgressMissions = await fetchInProgressMissions();
      setMissions(inProgressMissions.reverse());
    };
    fetchMissions();
  }, []);

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.header}>Active Missions</Text>
      <ScrollView>
        {missions.map((mission, index) => (
          <View key={index} style={styles.missionItem}>
            <Text style={styles.missionName}>{mission.name}</Text>
            <CountdownTimer endTime={mission.end} />
            <ExpandableText
              style={styles.missionDescription}
              numberOfLines={3} // You can adjust this value to show more/less lines
            >
              {mission.description}
            </ExpandableText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = endTime - Math.floor(Date.now() / 1000);
      if (newTimeLeft <= 0) {
        clearInterval(timer);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return <Text style={styles.timer}>Ends in: {formatTime(timeLeft)}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: NordTheme.background,
  },
  missionItem: {
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: NordTheme.container,
    borderRadius: 10,
    backgroundColor: NordTheme.container,
  },
  missionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordTheme.primary,
  },
  missionDescription: {
    fontSize: 14,
    color: NordTheme.text,
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NordTheme.highlight,
  },
});

export default MissionsScreen;
