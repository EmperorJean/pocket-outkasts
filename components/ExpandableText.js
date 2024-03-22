import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NordTheme } from './theme';

export const ExpandableText = ({ style, children, numberOfLines }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpanded}>
      <Text
        style={style}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        ellipsizeMode='tail'
      >
        {children}
      </Text>
      <Text style={styles.readMoreText}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  readMoreText: {
    color: NordTheme.primary,
    marginTop: 5,
  },
});
