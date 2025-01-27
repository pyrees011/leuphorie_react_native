import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const settingsOptions = [
  { name: "Profile", screen: "ProfileScreen", icon: require("../../../assets/images/user.png") },
  { name: "Notifications", screen: "NotificationsScreen", icon: require("../../../assets/images/notification.png") },
  { name: "Privacy & Security", screen: "PrivacySecurityScreen", icon: require("../../../assets/images/verified.png") },
  { name: "App Preferences", screen: "AppPreferencesScreen", icon: require("../../../assets/images/settings.png") },
];

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {settingsOptions.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => router.push(`settings/${item.screen}`)}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.optionText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "MonaSans",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F3E2",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    fontFamily: "MonaSans",
  },
});

export default SettingsScreen;
