import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useState } from "react";
import { Link } from "expo-router";

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="bg-zinc-900 flex-row items-center gap-3 w-full p-3 pt-8">
      <View className="flex-1 flex-row items-center gap-3">
        <Image
          source={require("@/assets/bible-120px.png")}
          className="h-12 w-12"
        />
        <Text className="text-zinc-100 text-xl font-heading">
          Biblia A Mensagem
        </Text>
      </View>
      <Feather name="search" size={32} color={colors.zinc[400]} />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Feather name="menu" size={32} color={colors.zinc[400]} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        className="absolute right-0 top-0"
      >
        <View className="gap-4 bg-zinc-900/80">
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center gap-3 px-4">
              <Image
                source={require("@/assets/bible-120px.png")}
                className="h-12 w-12"
              />
              <Text className="text-zinc-100 text-xl font-heading">
                Biblia A Mensagem
              </Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Feather name="x" size={32} color={colors.zinc[400]} />
            </TouchableOpacity>
          </View>
          {/* <Link href="/" asChild>
            <View className="flex-row gap-3 items-center">
              <Feather name="home" size={24} color={colors.zinc[100]} />
              <Text className="text-zinc-100 font-body text-lg">Início</Text>
            </View>
          </Link>
          <Link href="/gift" asChild>
            <View className="flex-row gap-3 items-center">
              <Feather name="gift" size={24} color={colors.zinc[100]} />
              <Text className="text-zinc-100 font-body text-lg">
                Contribuir
              </Text>
            </View>
          </Link> */}
          <Link href="/about" asChild>
            <View className="flex-row gap-3 items-center">
              <Feather name="info" size={24} color={colors.zinc[100]} />
              <Text className="text-zinc-100 font-body text-lg">Sobre</Text>
            </View>
          </Link>
        </View>
      </Modal>
    </View>
  );
}
