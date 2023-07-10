import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, PanResponder, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`

export default function App() {
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx}) => {
      position.setValue(dx)
    },
    onPanResponderGrant: () => onPressIn(),
    onPanResponderRelease: () => {
      Animated.parallel([
        onPressOut, 
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
      ])
    }

  })).current;
  const onPressIn = () => Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true
  }).start()
  const onPressOut = Animated.spring(scale, {toValue: 1, useNativeDriver: true})  
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  return (
    <Container>
      <Card 
      {...panResponder.panHandlers}
      style={{
        ...Platform.select({
          ios: { 
            shadowColor: '#00000033',
           shadowOffset: { width: 10, height: 10, },
            shadowOpacity: 0.5,
           shadowRadius: 10,
        },
          android: {
              elevation: 20,
          },
      }),
      transform: [{scale}, {translateX: position}]
      }}>
        <Ionicons name="pizza" color="#192a56" size={98} />
      </Card>
    </Container>
  )
}
