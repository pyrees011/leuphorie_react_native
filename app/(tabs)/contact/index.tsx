import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const contactOptions = [
  { name: "Email", screen: "EmailScreen", icon: require("../../../assets/images/email.png") },
  { name: "Phone", screen: "PhoneScreen", icon: require("../../../assets/images/phone.png") },
  { name: "Live Chat", screen: "LiveChatScreen", icon: require("../../../assets/images/chat.png") },
  { name: "Contact Form", screen: "ContactFormScreen", icon: require("../../../assets/images/customer-service.png") },
  { name: "FAQ", screen: "FAQScreen", icon: require("../../../assets/images/faq.png") },
];

const ContactScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Contact Section Container */}
        <View className="bg-white mx-4 rounded-xl shadow-sm">
          {/* Title inside the container */}
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-800">Contact Us</Text>
          </View>

          {/* Contact Options List */}
          {contactOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center p-4 border-b border-gray-200"
              onPress={() => router.push(`contact/${item.screen}`)}
            >
              <Image source={item.icon} style={{ width: 24, height: 24, resizeMode: "contain", marginRight: 12 }} />
              <Text className="text-lg font-medium">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;
