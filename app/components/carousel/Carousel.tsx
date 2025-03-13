import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: require('assets/lottie/ExportArrows.json'),
    title: 'Export your conversation',
  },
  {
    id: '2',
    image: require('assets/lottie/GuruComputer.json'),
    title: 'Send it to our AI Guru',
  },
  {
    id: '3',
    image: require('assets/lottie/CouplePark.json'),
    title: 'Enjoy your perfect relationship',
  },
];

const Carousel = () => {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      setActiveIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 4000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up interval
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}>
        {data.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: '100%',
                height: '90%',
                backgroundColor: '#FFF',
              }}
              source={item.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    fontStyle: 'italic',
  },
});

export default Carousel;
