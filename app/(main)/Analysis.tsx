import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { Image } from 'expo-image';

type Props = {};

const Analysis = (Props: Props) => {
  const { chatText } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const animation = useRef<LottieView>(null);

  // console.log({ chatText });

  const sendToAi = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        'https://5b08-103-50-21-5.ngrok-free.app/conversation/analyze',
        {
          inputText: chatText.toString(),
        }
      );
      setResponseText(res.data);
      console.log('res', res);
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatText) {
      sendToAi();
    }
  }, [chatText]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: '#FFF',
            }}
            source={require('assets/lottie/LovePainting.json')}
          />
          <Text style={styles.loadingText}>
            Loading perfect relationship...
          </Text>
        </View>
      ) : (
        <>
          <Image
            placeholder={'opana'}
            contentFit='contain'
            transition={1000}
            style={{
              flex: 0.3,
              width: '100%',
              backgroundColor: '#fff',
            }}
            source={require('assets/images/ConvAnalyzeHeader.png')}
          />
          <ScrollView
            style={styles.container}
            contentContainerStyle={[
              styles.contentContainer,
              isLoading && { flex: 1 },
            ]}>
            <Text>{responseText}</Text>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    // flex: 1,
    // height: '100%',
    justifyContent: 'center',
  },
  loading: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
