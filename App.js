import React, { useRef, useState } from "react";
import { Animated, PanResponder, Text, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

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
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

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
    extrapolate: "clamp",
  });
  // Animations
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  // State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    setIndex((prev) => prev + 1)
    position.setValue(0);
  }
  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };
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
        <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
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
        <Ionicons name={icons[index]} color="#192a56" size={98} />
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
