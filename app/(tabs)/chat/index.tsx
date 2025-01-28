import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";


interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! How can I assist you today?", sender: "AI", timestamp: "23:19" },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [timestampVisibility, setTimestampVisibility] = useState<{ [key: string]: boolean }>({});

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = { id: Date.now().toString(), text: inputText, sender: "user", timestamp: "Now" };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  const toggleTimestamp = (id: string) => {
    setTimestampVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => toggleTimestamp(item.id)} style={styles.messageWrapper}>
            <Animated.View style={item.sender === "AI" ? styles.aiMessage : styles.userMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
              {timestampVisibility[item.id] && (
                <Animated.Text style={styles.timestamp}>{item.timestamp}</Animated.Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },
  messageWrapper: {
    marginVertical: 5,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F3E2",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FAC0CC",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
    fontFamily: "MonaSans",
  },
  timestamp: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
    fontFamily: "MonaSans",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    fontFamily: "MonaSans",
  },
  emojiButton: {
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#FAC0CC",
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export default ChatScreen;
