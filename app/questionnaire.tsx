import { useState } from 'react';
import { Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// utils
import { cn } from '../lib/utils';

// icons
import { Smile, ThumbsUp, Meh, Frown, Activity, Calendar, CalendarDays, XCircle, Zap, AlertCircle, AlertTriangle, Moon, CloudMoon, Cloud, CloudOff, Apple, Sandwich, Pizza, Cookie, Battery, BatteryMedium, BatteryLow, Coffee, Check } from 'lucide-react-native';

interface QuestionnaireCardProps {
    options: {
        id: string;
        label: string;
        Icon: typeof Smile;
    };
    selectedOption: string;
    handleQuestionnaireCardPress: (option: string) => void;
}

export default function QuestionnaireScreen() {
  const [selectedOption, setSelectedOption] = useState('design');
  const [currentStep, setCurrentStep] = useState(1);

  const handleQuestionnaireCardPress = (id: string) => {
    setSelectedOption(id);
    setTimeout(() => {
        if (currentStep < 6) {
            setCurrentStep(currentStep + 1);
        } else {
            router.replace('/(tabs)');
        }
    }, 200);
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      {/* Logo */}
      <View className="flex-row items-center mb-6">
        <Image source={require('../assets/images/logo.png')} className="w-10 h-10 mr-2" />
        <Text className="text-[20px] font-semibold">Leuphorie</Text>
      </View>

      {/* Progress Bar */}
      <View className="flex-row gap-1 mb-2">
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            className={cn(`h-2 flex-1 rounded-sm`, {
                'bg-green-900': index < currentStep - 1,
                'bg-green-500': index === currentStep - 1,
                'bg-gray-200': index > currentStep - 1,
            })}
          />
        ))}
      </View>
      <Text className="text-sm text-gray-500 mb-6">{currentStep} of 6</Text>

      {/* Question */}
      <Text className="text-2xl font-semibold mb-6">
        {questions[currentStep - 1].question}
      </Text>

      {/* Options Grid */}
      <View className="grid grid-cols-2 gap-3 mb-6">
        {questions[currentStep - 1].options.map((option) => (
            <QuestionnaireCard
              key={option.id}
              options={option}
              selectedOption={selectedOption}
              handleQuestionnaireCardPress={handleQuestionnaireCardPress}
            />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-start mt-6">
        <TouchableOpacity className="p-3" onPress={() => {
            if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
            }
        }}>
          <Text className="text-gray-500 text-base font-medium">Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const QuestionnaireCard = ({ options, selectedOption, handleQuestionnaireCardPress }: QuestionnaireCardProps) => {
    const Icon = options.Icon;
    return (
        <TouchableOpacity
            key={options.id}
            className={`w-[${(Dimensions.get('window').width - 52) / 2}px] p-4 rounded-xl border ${
              selectedOption === options.id
                ? 'bg-[#1C1F1E] border-[#1C1F1E]'
                : 'bg-white border-gray-200'
            } relative`}
            onPress={() => handleQuestionnaireCardPress(options.id)}
          >
            <View className="mb-2">
              <Icon color={selectedOption === options.id ? 'white' : 'currentColor'} />
            </View>
            <Text
              className={`text-sm font-medium ${
                selectedOption === options.id ? 'text-white' : 'text-[#1C1F1E]'
              }`}
            >
              {options.label}
            </Text>
          </TouchableOpacity>
    )
}

const questions = [
    {
      id: 1,
      question: "Rate your overall physical health?",
      options: [
        { id: "excellent", label: "Excellent - I feel great", Icon: Smile },
        { id: "good", label: "Good - Generally healthy", Icon: ThumbsUp },
        { id: "fair", label: "Fair - Could be better", Icon: Meh },
        { id: "poor", label: "Poor - Need improvement", Icon: Frown }
      ]
    },
    {
      id: 2, 
      question: "How often do you exercise?",
      options: [
        { id: "daily", label: "Daily", Icon: Activity },
        { id: "weekly", label: "2-3 times per week", Icon: Calendar },
        { id: "monthly", label: "A few times per month", Icon: CalendarDays },
        { id: "rarely", label: "Rarely or never", Icon: XCircle }
      ]
    },
    {
      id: 3,
      question: "Describe your stress levels?",
      options: [
        { id: "low", label: "Low - Well managed", Icon: Coffee },
        { id: "moderate", label: "Moderate - Sometimes stressed", Icon: AlertCircle },
        { id: "high", label: "High - Often stressed", Icon: Zap },
        { id: "severe", label: "Severe - Constantly stressed", Icon: AlertTriangle }
      ]
    },
    {
      id: 4,
      question: "How well do you sleep on average?",
      options: [
        { id: "verywell", label: "Very well (7-9 hours)", Icon: Moon },
        { id: "okay", label: "Okay (5-7 hours)", Icon: CloudMoon },
        { id: "poor", label: "Poor (3-5 hours)", Icon: Cloud },
        { id: "insomnia", label: "Difficulty sleeping", Icon: CloudOff }
      ]
    },
    {
      id: 5,
      question: "How would you rate your diet?",
      options: [
        { id: "excellent", label: "Very healthy & balanced", Icon: Apple },
        { id: "good", label: "Generally healthy", Icon: Sandwich },
        { id: "fair", label: "Sometimes healthy", Icon: Pizza },
        { id: "poor", label: "Needs improvement", Icon: Cookie }
      ]
    },
    {
      id: 6,
      question: "Energy levels throughout the day?",
      options: [
        { id: "always", label: "Always energetic", Icon: Zap },
        { id: "mostly", label: "Mostly energetic", Icon: Battery },
        { id: "sometimes", label: "Sometimes energetic", Icon: BatteryMedium },
        { id: "rarely", label: "Rarely energetic", Icon: BatteryLow }
      ]
    }
  ]