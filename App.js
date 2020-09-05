/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated
} from 'react-native';

import TabBar from './Components/TabBar';

const {width, height} = Dimensions.get("window");

import {SafeAreaView, SafeAreaProvider, initialWindowMetrics} from "react-native-safe-area-context";

const tabs = [
  {icon: "grid"},
  {icon: "list"},
  {icon: "slack"},
  {icon: "layers"},
  {icon: "smile"}
]

const App: () => React$Node = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const AnimationValue = useRef(new Animated.Value(0));

  function setCurrentIndex(i){
    setActiveIndex(i);
  }


  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView edges={["left", "bottom", "right"]} style={{position: "relative", width}}>
        <View style={styles.container}>
          <TabBar AnimationValue={AnimationValue} onPressTab={setCurrentIndex} activeIndex={activeIndex} tabs={tabs} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: "100%",
    position: "relative",
    backgroundColor: "#ff0034",
    justifyContent: "flex-end"
  }
});

export default App;
