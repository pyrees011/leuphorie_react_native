import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationsScreen = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Push Notifications</Text>
        <Switch value={pushNotifications} onValueChange={setPushNotifications} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Email Alerts</Text>
        <Switch value={emailAlerts} onValueChange={setEmailAlerts} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Sound Alerts</Text>
        <Switch value={soundAlerts} onValueChange={setSoundAlerts} />
      </View>
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
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8F3E2",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
    fontFamily: "MonaSans",
  },
});

export default NotificationsScreen;
