import React, { Component, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableOpacity, Easing } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import {Svg, Path} from "react-native-svg"


const {width, height} = Dimensions.get("window");

const TabHeight = 60;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const ActiveIcon = ({icon, width, activeIndex:i, translateX}) => {
    const yInputRange = [(i - 1) * width, i * width, (i + 1) * width];

    const yOutputRange = [width/4, -width/4, width/4];
    const opacityOutputRange = [0, 1, 0];

    const translateY = translateX.interpolate({inputRange: yInputRange, outputRange: yOutputRange});

    const opacity = translateX.interpolate({inputRange: yInputRange, outputRange: opacityOutputRange});

    return (
        <Animated.View style={[styles.activeIcon, {width: width * 0.6, height: width * 0.6, transform: [{translateY}], opacity}]}>
            <FeatherIcon name={icon} color="black" size={25} />
        </Animated.View>
    );
}

const TabBarCurve = ({width, height, activeIndex=0, activeIcon="", translateX}) => {
    return (
        <Animated.View style={[styles.curve, {transform: [{translateX}]}]}>
            <Svg width={width} height={height}>
                <Path fill="#ff0034" d={`M 0 0 C 0,0 10,0 10,10 C 10,10 ${(width-10)/2},${(height-10) * 1.75} ${(width-10)},10 C ${width-10},10 ${width-10},0 ${width},0`} />
            </Svg>

            <ActiveIcon width={width} height={height} activeIndex={activeIndex} translateX={translateX} icon={activeIcon} />
        </Animated.View>
    );
}

const TabBar = ({tabs=[], activeIndex=0, onPressTab, AnimationValue}) => {
    const TabWidth = width / (tabs.length || 1);
    const activeTab =  tabs[activeIndex];

    
    return (
        <View style={styles.tabBar}>
            {tabs.map(({icon}, i) => {
                const opacityInputRange = [(i - 1) * TabWidth, i * TabWidth, (i + 1) * TabWidth];

                const opacityOutputRange = [1, 0, 1];

                const opacity = AnimationValue.current.interpolate({inputRange: opacityInputRange, outputRange: opacityOutputRange});

                return (
                    <TouchableOpacity style={{width: TabWidth, height: TabHeight}} key={i} onPress={() => {onPressTab(i); Animated.timing(AnimationValue.current, {duration: 500 * Math.max(1, Math.abs(activeIndex-i)/2), toValue: TabWidth * i, easing: Easing.out(Easing.exp), useNativeDriver: true}).start(); return true}}>
                        <Animated.View style={[styles.tabBar, {width: TabWidth, height: TabHeight, opacity}]}>
                            <FeatherIcon  name={icon} color="grey" size={24} />
                        </Animated.View>
                    </TouchableOpacity>
                );
            })}

            <TabBarCurve translateX={AnimationValue.current} width={TabWidth} height={TabHeight} activeIndex={activeIndex} activeIcon={activeTab.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    tabBar: {
        width,
        height: TabHeight,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    curve: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0
    },
    activeIcon: {
        position: "absolute",
        top: 0,
        width: 40,
        height: 40,
        borderRadius: 40,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    }
})
 
export default TabBar;