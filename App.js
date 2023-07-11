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
  position: absolute;
`

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`

const ButtonContainer = styled.View`
  flex-direction: row;
  flex: 1;
`

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp"
  })
  const onPressIn = Animated.spring(scale, { toValue: 0.95, useNativeDriver: true });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
  })
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
  })
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx}) => {
      position.setValue(dx)
    },
    onPanResponderGrant: () => {
      Animated.parallel([
        onPressIn
      ]).start()
    },
    onPanResponderRelease: (_, {dx}) => {
      if(dx < -250) {
        goLeft.start()
      } else if(dx > 250) {
        goRight.start()
      } else {
        Animated.parallel([
          onPressOut,
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }

  })).current;
  const closePress = () => {
    goLeft.start()
  }
  const checkPress = () => {
    goRight.start()
  }
  return (
    <Container>
      <CardContainer>
      <Card 
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
      transform: [{scale: secondScale}]
      }}>
        <Ionicons name="beer" color="#192a56" size={98} />
      </Card>
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
      transform: [{scale}, {translateX: position}, {rotateZ: rotation}]
      }}>
        <Ionicons name="pizza" color="#192a56" size={98} />
      </Card>
      </CardContainer>
      <ButtonContainer>
        <Btn onPress={closePress}>
        <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
        <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>      
        </ButtonContainer>
    </Container>
  )
}
