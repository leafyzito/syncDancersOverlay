import styled from 'styled-components';
import { StreamOverlay } from './components/StreamOverlay';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
`;

function App() {
  return (
    <AppContainer>
      <Content>
        {/* <h1>Stream Overlay Demo</h1>
        <p>Watch the avatars move around!</p> */}
      </Content>
      <StreamOverlay />
    </AppContainer>
  );
}

export default App;
