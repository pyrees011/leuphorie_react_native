import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// Icons
import { Waves, Activity, Calendar, Bell } from 'lucide-react-native';

export default function Home() {
  // TODO: make this dynamic
  // TODO: connect to the database
  // TODO: fix the states
  // TODO: fix the scroll view
  // TODO: divide into components if possible
  const user = {
    username: "Ferdinand",
    avatar: "https://i.pinimg.com/736x/f3/d2/34/f3d2346a59335f12ec7b6c460177414a.jpg"
  };

  return (
    <View style={{ flexGrow: 1 }} className="bg-gray-100">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20
        }}
      >
        {/* Welcome Banner */}
        <View className="bg-gradient-to-r from-emerald-800/25 to-yellow-500/25 p-6">
          <View className="flex-row items-center space-x-2 mb-2">
            <Text className="text-2xl font-semibold">Hi, {user.username}!</Text>
            <Waves size={24} color="#EAB308" />
          </View>
          <Text className="text-gray-600 text-base">
            Let's help you stay on top of your health
          </Text>
        </View>

        {/* Dashboard Section */}
        <View className="p-4 gap-4">
          {/* Dashboard Overview */}
          <View className="bg-white rounded-xl p-4">
            <Text className="text-xl font-semibold mb-4">Dashboard Overview</Text>
            <View className="flex-row justify-between px-4">
              {dashboardData.map((item, index) => (
                <View className="items-center" key={index}>
                  <Text className="text-gray-600">{item.title}</Text>
                  <Text className="text-lg font-semibold">{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Stats */}
          <View className="bg-white rounded-xl p-4">
            <Text className="text-xl font-semibold mb-4">Quick Stats</Text>
            <View className="gap-2">
              {quickStatsData.map((item, index) => (
                <View className={`p-4 rounded-lg ${item.color}`} key={index}>
                  <Text className={`text-sm ${item.textColor}`}>{item.title}</Text>
                  <Text className={`text-xl font-semibold`}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tasks Section */}
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold">Priority Tasks</Text>
              <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                <Text className="text-gray-600">View All</Text>
              </TouchableOpacity> 
            </View>
            <View className="gap-2">
              {tasksData.map((item, index) => (
                <TouchableOpacity className="border border-gray-200 p-3 rounded-lg" key={index}>
                  <Text className="font-medium">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Activity Timeline */}
          <View className="bg-white rounded-xl p-4">
            <Text className="text-xl font-semibold mb-4">Recent Activity</Text>
            <View className="gap-2">
              {activityData.map((item, index) => (
                <View className="flex-row items-center space-x-3" key={index}>
                  <View className="w-2 h-2 rounded-full bg-emerald-400" />
                  <Text className="text-gray-600">{item.title}</Text>
                  <Text className="text-gray-400">{item.time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const dashboardData = [
  {
    title: "Steps",
    value: 8439
  },
  {
    title: "Sleep",
    value: 7.2
  },
  {
    title: "Calories",
    value: 1862
  }
]

const quickStatsData = [
  {
    title: "Daily Goals",
    value: 80,
    color: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    title: "Wellness Score",
    value: 92,
    color: "bg-yellow-50",
    textColor: "text-yellow-600"
  }
]

const tasksData = [
  {
    title: "Morning Meditation",
    description: "10 minutes"
  },
  {
    title: "Take Vitamins",
    description: "After breakfast"
  }
]

const activityData = [
  {
    title: "Completed morning meditation",
    time: "2h ago"
  },
  {
    title: "Updated wellness goals",
    time: "5h ago"
  }
]
