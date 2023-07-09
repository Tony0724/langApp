import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`

export default function App() {
  const [y, setY] = useState(0);
  const [intervalID, setIntervalID] = useState(null)
  const moveUp = () => {
    const id = setInterval(() => setY(prev => prev + 1), 1)
    setIntervalID(id)
  }
  useEffect(() => {
    if(y === 200) {
      clearInterval(intervalID)
    }
  }, [y, intervalID])
  return (
    <Container>
      <Box onPress={moveUp} style={{
        transform: [{translateY: y}]
      }} />
    </Container>
  )
}
