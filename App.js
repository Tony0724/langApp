import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Pressable } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`
const AnimatedBox = Animated.createAnimatedComponent(Box)

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp(prev => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      duration: 1000,
      useNativeDriver: true,
    }).start(toggleUp)
  }
  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1]
  })
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0]
  })
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox style={{
          borderRadius,
          opacity,
          transform: [{translateY: Y_POSITION}]
        }} />
      </Pressable>
    </Container>
  )
}
