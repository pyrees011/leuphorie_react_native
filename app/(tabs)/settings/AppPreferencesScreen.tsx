import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AppPreferencesScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>App Preferences</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
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

export default AppPreferencesScreen;
