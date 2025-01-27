import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const [username, setUsername] = useState("Elkan");
  const [email, setEmail] = useState("elkan@example.com");
  const [profileImage, setProfileImage] = useState(require("../../../assets/images/profile-placeholder.png"));

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image source={profileImage} style={styles.profileImage} />
      </TouchableOpacity>

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "MonaSans",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#E8F3E2",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FAC0CC",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
