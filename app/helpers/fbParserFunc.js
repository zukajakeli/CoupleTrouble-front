import * as FileSystem from 'expo-file-system';

const compressName = (name, options) => {
  if (!name) return 'u';
  let cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  return (
    options.nameMap[name] ||
    cleanName.split(' ')[0].substring(0, 4).toLowerCase()
  );
};

const cleanMessage = (message, options) => {
  if (!message) return '';

  // Remove messages that are just Unicode references (likely reply links)
  if (message.match(/^[\u0080-\uffff\s]+$/)) return '';

  let cleaned = message
    .replace(/\\u[\dA-Fa-f]{4}/g, '')
    .replace(/\\x[\dA-Fa-f]{2}/g, '')
    .replace(/[\u0080-\uffff]+/g, '')
    .replace(/\\[urfnt]/g, '')
    .replace(/\u200B-\u200D\uFEFF/g, '');

  cleaned = cleaned
    .replace(/â/g, "'")
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/ð/g, '')
    .replace(/\[.*?\]/g, '');

  if (options.removeUrls) {
    if (cleaned.match(/^https?:\/\/\S+$/)) return '';
    cleaned = cleaned.replace(/https?:\/\/\S+/g, '[url]');
  }

  if (options.removeFillers) {
    const fillers = [
      'okay',
      'ok',
      'uhu',
      'hmm',
      'hm',
      'please',
      'thanks',
      'thank you',
    ];
    fillers.forEach((filler) => {
      cleaned = cleaned.replace(new RegExp(`\\b${filler}\\b`, 'gi'), '');
    });
  }

  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned.length < 2 ? '' : cleaned;
};

const timestampToDate = (timestamp_ms) => {
  try {
    const date = new Date(parseInt(timestamp_ms));
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return '';
  }
};

const isSameDay = (timestamp1, timestamp2) => {
  const date1 = new Date(parseInt(timestamp1));
  const date2 = new Date(parseInt(timestamp2));
  return date1.toDateString() === date2.toDateString();
};

const parseChat = (jsonData, options) => {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

    if (!data.messages || !Array.isArray(data.messages)) {
      throw new Error('Invalid chat data format');
    }

    const validMessages = data.messages
      .filter((msg) => {
        if (!msg || !msg.timestamp_ms) return false;
        if (!msg.content) return false;
        const cleanContent = cleanMessage(msg.content, options);
        return cleanContent.length > 0;
      })
      .sort((a, b) => parseInt(a.timestamp_ms) - parseInt(b.timestamp_ms));

    if (validMessages.length === 0) {
      return { chat: [] };
    }

    let currentUser = '';
    let currentMessages = [];
    let minimizedChat = [];
    let lastTimestamp = null;

    const processCurrentGroup = (timestamp) => {
      if (currentMessages.length === 0) return;

      const combinedMessage = currentMessages
        .map((msg) => cleanMessage(msg, options))
        .filter((msg) => msg.length > 0)
        .join(' ');

      if (combinedMessage.trim().length > 0) {
        // Add date marker if day changed
        if (lastTimestamp === null || !isSameDay(lastTimestamp, timestamp)) {
          minimizedChat.push({
            type: 'date',
            date: timestampToDate(timestamp),
          });
        }

        minimizedChat.push({
          type: 'message',
          user: compressName(currentUser, options),
          message: combinedMessage,
        });

        lastTimestamp = timestamp;
      }
      currentMessages = [];
    };

    validMessages.forEach((msg) => {
      if (msg.sender_name !== currentUser) {
        processCurrentGroup(msg.timestamp_ms);
        currentUser = msg.sender_name;
      }
      currentMessages.push(msg.content);
    });

    // Process final group
    if (validMessages.length > 0) {
      processCurrentGroup(validMessages[validMessages.length - 1].timestamp_ms);
    }

    return { chat: minimizedChat };
  } catch (error) {
    return { chat: [] };
  }
};

const formatOutput = (parsedChat) => {
  if (!parsedChat || !parsedChat.chat) {
    return '';
  }

  return parsedChat.chat
    .map((entry) => {
      if (entry.type === 'date') {
        return entry.date;
      }
      return `${entry.user}: ${entry.message}`;
    })
    .join('\n');
};

const saveToFile = async (outputText, options) => {
  if (!outputText) return false;

  try {
    const fileUri = FileSystem.documentDirectory + options.outputFile;
    await FileSystem.writeAsStringAsync(fileUri, outputText, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default processChat = async (input, options) => {
  try {
    const jsonData =
      typeof input === 'string'
        ? await FileSystem.readAsStringAsync(input)
        : input;
    const parsed = parseChat(jsonData, options);
    const output = formatOutput(parsed);
    const saved = await saveToFile(output, options);

    return {
      success: saved,
      outputText: output,
      fileName: options.outputFile,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Example usage with Expo
// You can use Expo's DocumentPicker and FileSystem APIs to pick a file and pass the URI to `processChat`.
