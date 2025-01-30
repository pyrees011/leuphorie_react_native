import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const faqs = [
  { question: "How do I get started?", answer: "Sign up for an account and complete the initial health assessment. We'll create a personalized plan for you." },
  { question: "What's included in the free plan?", answer: "The free plan includes basic health tracking, daily reminders, and access to our community features." },
  { question: "How secure is my data?", answer: "We use industry-standard encryption and security measures to protect your personal information." },
  { question: "Can I export my data?", answer: "Yes, you can export your health data and progress reports at any time from your account settings." },
  { question: "Do you offer mobile apps?", answer: "Yes, we have iOS and Android apps available for download from the respective app stores." },
  { question: "What support options are available?", answer: "We offer 24/7 email support, live chat during business hours, and comprehensive help documentation." },
];

const FAQScreen = () => {
  return (
    <View className="flex-1 bg-white p-5 mt-4">
      <Text className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</Text>
      <ScrollView>
        {faqs.map((faq, index) => (
          <View key={index} className="mb-4">
            <Text className="text-lg font-semibold">{faq.question}</Text>
            <Text className="text-md text-gray-600 mt-1">{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FAQScreen;
