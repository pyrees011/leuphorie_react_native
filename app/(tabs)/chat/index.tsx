import React, { useState, useRef } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Image, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, Bell } from "lucide-react-native";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! How can I assist you today?", sender: "AI", timestamp: "23:19" },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const flatListRef = useRef<FlatList>(null);

  const user = {
    username: "Ferdinand",
    avatar: "https://i.pinimg.com/736x/f3/d2/34/f3d2346a59335f12ec7b6c460177414a.jpg"
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = { 
      id: Date.now().toString(), 
      text: inputText, 
      sender: "user", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    
    // Scroll to bottom after sending message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Dismiss keyboard when tapping outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={40}
          className="flex-1"
        >
          {/* Welcome Banner */}
          <View className="bg-gradient-to-r from-emerald-800/25 to-yellow-500/25 p-6">
            <Text className="text-2xl font-semibold mb-2">Chat Assistant</Text>
            <Text className="text-gray-600">
              How can I help you today?
            </Text>
          </View>

          {/* Chat Messages */}
          <FlatList
            ref={flatListRef}
            className="flex-1 px-4"
            data={messages}
            keyExtractor={(item) => item.id}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => (
              <View className={`mb-4 max-w-[80%] ${
                item.sender === "AI" ? "self-start" : "self-end ml-auto"
              }`}>
                <View className={`p-4 rounded-2xl ${
                  item.sender === "AI" 
                    ? "bg-white" 
                    : "bg-emerald-500"
                }`}>
                  <Text className={
                    item.sender === "AI" 
                      ? "text-gray-900" 
                      : "text-white"
                  }>
                    {item.text}
                  </Text>
                </View>
                <Text className="text-gray-500 text-xs mt-1 ml-2">
                  {item.timestamp}
                </Text>
              </View>
            )}
          />

          {/* Input Area */}
          <View className="p-4 mb-24">
            <View className="flex-row justify-center items-center bg-gray-100 rounded-full px-4 py-2 border-black border-2">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a message"
                className="flex-1 text-base placeholder:text-gray-500 placeholder:mb-2"
                keyboardType="default"
                returnKeyType="send"
                autoCapitalize="sentences"
                autoCorrect={true}
                multiline
              />
              <TouchableOpacity 
                onPress={handleSend}
                className="ml-2 w-10 h-10 bg-emerald-500 rounded-full items-center justify-center"
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
