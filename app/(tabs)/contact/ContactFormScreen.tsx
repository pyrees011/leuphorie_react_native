import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

const ContactFormScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    alert("Message sent successfully!");
  };

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-5">Send Us a Message</Text>

      <TextInput className="bg-gray-200 p-4 rounded-xl mb-3" placeholder="Name" value={name} onChangeText={setName} />
      <TextInput className="bg-gray-200 p-4 rounded-xl mb-3" placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput className="bg-gray-200 p-4 rounded-xl mb-3" placeholder="Subject" value={subject} onChangeText={setSubject} />
      <TextInput className="bg-gray-200 p-4 rounded-xl mb-5 h-28" placeholder="Message" value={message} onChangeText={setMessage} multiline />

      <TouchableOpacity className="bg-[#4CAF50] p-4 rounded-xl items-center" onPress={handleSendMessage}>
        <Text className="text-white text-lg font-semibold">Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactFormScreen;
