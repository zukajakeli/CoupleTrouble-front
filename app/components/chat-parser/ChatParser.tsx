import React, { useState } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

// Functional parsing logic (from previous implementation)
const processChat =
  (options = {}) =>
  async (input) => {
    try {
      const parsed = parseChat(options)(input);
      const output = formatOutput(parsed);

      return {
        success: true,
        outputText: output,
        totalEntries: output.split('\n').length,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

// Functional chat parsing functions (copied from previous implementation)
const parseChat =
  (options = {}) =>
  (jsonData) => {
    // ... (previous parseChat implementation)
  };

const formatOutput = (parsedChat) => {
  // ... (previous formatOutput implementation)
};

export default function ChatParserComponent() {
  const [parseResult, setParseResult] = useState(null);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (result.type === 'success') {
        const fileContent = await FileSystem.readAsStringAsync(result.uri);
        const parsedResult = await processChat({
          removeUrls: true,
          removeFillers: true,
        })(JSON.parse(fileContent));

        setParseResult(parsedResult);
      }
    } catch (err) {
      setParseResult({
        success: false,
        error: err.message,
      });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title='Upload Chat JSON' onPress={handleFileUpload} />
      {parseResult && (
        <ScrollView style={{ marginTop: 20 }}>
          {parseResult.success ? (
            <>
              <Text>Parsed Successfully!</Text>
              <Text>Total Entries: {parseResult.totalEntries}</Text>
              <Text>{parseResult.outputText}</Text>
            </>
          ) : (
            <Text>Error: {parseResult.error}</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
