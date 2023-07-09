import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, TouchableOpacity } from 'react-native';

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
  const Y = new Animated.Value(0)
  const moveUp = () => {
    Animated.spring(Y, {
      bounciness: 20,
      toValue: -200,
      useNativeDriver: true
    }).start()
  }
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{
          transform: [{translateY: Y}]
        }} />
      </TouchableOpacity>
    </Container>
  )
}
