import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';

import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerAsset } from 'expo-document-picker';
import Button from 'app/components/button/Button';
import RadioButton from 'app/components/radio-button/RadioButton';
import { router, useNavigation } from 'expo-router';
import Carousel from 'app/components/carousel/Carousel';
// import { SocialChatParser } from 'app/helpers/fbParser';
import processChat from 'app/helpers/fbParserFunc';

type Props = {};

enum Source {
  telegram = 'telegram',
  whatsapp = 'whatsapp',
  facebook = 'facebook',
  instagram = 'instagram',
}

const UploadConv = (Props: Props) => {
  const navigation = useNavigation();
  // const [file, setFile] = useState<DocumentPickerAsset | undefined>();
  const [convSource, setConvSource] = useState<keyof typeof Source>('telegram');
  const [chatText, setChatText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Custom Header',
      headerShown: true,
      headerStyle: {},
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text> {`< Back`} </Text>
        </TouchableOpacity>
      ),

      headerTintColor: 'black',
    });
  }, [navigation]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      const options = {
        nameMap: {
          narfux_: 'narf',
          'RE:SORB': 'sorb',
        },
        removeUrls: true,
        removeFillers: true,
        outputFile: 'meta_chat_analysis.txt',
      };

      processChat(result?.assets?.[0].uri, options).then((result) => {
        if (result.success) {
          // console.log('Analysis saved to:', result.fileName);
          // console.log('\nOutput:');
          // console.log(result.outputText);

          setChatText(result.outputText);
        } else {
          console.error('Error:', result.error);
        }
      });

      // console.log('yooo', result?.assets?.[0]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Carousel />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Select Conversation Source:</Text>

          <Pressable
            onPress={() => setConvSource(Source.telegram)}
            style={styles.selectItem}>
            <RadioButton isChecked={convSource === Source.telegram} />
            <Text style={styles.selectText}>Telegram</Text>
          </Pressable>
          <Pressable
            style={styles.selectItem}
            onPress={() => setConvSource(Source.whatsapp)}>
            <RadioButton isChecked={convSource === Source.whatsapp} />
            <Text style={styles.selectText}>WhatsApp</Text>
          </Pressable>
          <Pressable
            style={styles.selectItem}
            onPress={() => setConvSource(Source.facebook)}>
            <RadioButton isChecked={convSource === Source.facebook} />
            <Text style={styles.selectText}>Facebook</Text>
          </Pressable>
          <Pressable
            style={styles.selectItem}
            onPress={() => setConvSource(Source.instagram)}>
            <RadioButton isChecked={convSource === Source.instagram} />
            <Text style={styles.selectText}>Instagram</Text>
          </Pressable>
        </View>
        <View>
          {chatText.length > 0 && (
            <Text style={{ marginBottom: 20 }}>
              File Selected
              {/* Selected: {file.name} ({file.size} bytes) */}
            </Text>
          )}
          <Button label='Upload Conversation' onPress={pickDocument} />
          <Button
            label='Send to Guru'
            style={{ marginTop: 8 }}
            disabled={chatText.length === 0}
            onPress={() =>
              router.push({
                pathname: '/(main)/Analysis',
                params: { chatText, convSource },
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default UploadConv;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  header: {
    flex: 0.5,
  },
  body: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 24,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: 'Poppins',
    color: '#030303',
    marginBottom: 32,
  },
  selectItem: {
    flexDirection: 'row',
    backgroundColor: '#e6e6fa',
    marginBottom: 16,
    alignItems: 'center',
    height: 36,
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  },
  selectText: {
    marginLeft: 8,
  },
});
