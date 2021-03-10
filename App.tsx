/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

const App = () => {
  let videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const onSeek = (seek: number) => {
    videoPlayer.current?.seek(seek);
  };

  const onPaused = (state: PLAYER_STATES) => {
    setPaused(!paused);
    setPlayerState(state);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(0);
  };

  const onSeeking = (time: number) => setCurrentTime(time);

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType === 'content') {
      setScreenType('cover');
    } else {
      setScreenType('content');
    }
  };

  const onProgress = (data: {currentTime: number}) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onLoad = (data: {duration: number}) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  return (
    <View style={styles.container}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        }}
        style={styles.mediaPlayer}
        volume={100}
      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        containerStyle={styles.mediaControls}
        mainColor="red"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        children={<Text />} //tbd how to pass empty value
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 500,
    right: 0,
    justifyContent: 'center',
  },
  mediaControls: {
    marginBottom: 100,
  },
});
