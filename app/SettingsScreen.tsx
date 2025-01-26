import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const [username, setUsername] = useState("Elkan");
  const [email, setEmail] = useState("elkan@example.com");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.tabContainer}>
      <Text style={styles.sectionTitle}>Profile</Text>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={image ? { uri: image } : require("../assets/images/profile-placeholder.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const NotificationsTab = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  return (
    <View style={styles.tabContainer}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.toggleContainer}>
        <Text>Push Notifications</Text>
        <Switch value={pushNotifications} onValueChange={setPushNotifications} />
      </View>
      <View style={styles.toggleContainer}>
        <Text>Email Alerts</Text>
        <Switch value={emailAlerts} onValueChange={setEmailAlerts} />
      </View>
      <View style={styles.toggleContainer}>
        <Text>Sound Alerts</Text>
        <Switch value={soundAlerts} onValueChange={setSoundAlerts} />
      </View>
    </View>
  );
};

const PrivacyTab = () => {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.sectionTitle}>Privacy & Security</Text>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const PreferencesTab = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.tabContainer}>
      <Text style={styles.sectionTitle}>App Preferences</Text>
      <View style={styles.toggleContainer}>
        <Text>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  profile: ProfileTab,
  notifications: NotificationsTab,
  privacy: PrivacyTab,
  preferences: PreferencesTab,
});

export default function SettingsScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "profile", title: "Profile" },
    { key: "notifications", title: "Notifications" },
    { key: "privacy", title: "Privacy & Security" },
    { key: "preferences", title: "App Preferences" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar {...props} style={styles.tabBar} indicatorStyle={styles.tabIndicator} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tabContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "MonaSans",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#C4D6D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: "#FAC0CC",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabBar: {
    backgroundColor: "#E8F3E2",
  },
  tabIndicator: {
    backgroundColor: "#FAC0CC",
  },
});
