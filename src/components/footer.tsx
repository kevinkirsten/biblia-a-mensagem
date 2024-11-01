import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";

export function Footer() {
  return (
    <View className="bg-zinc-900 mt-3">
      <View className="flex-row justify-between px-8 py-4 w-full">
        <Link href="/">
          <Text className="font-body text-sm text-zinc-100">Início</Text>
        </Link>
        <Link href="/gift">
          <Text className="font-body text-sm text-zinc-100">Contribuir</Text>
        </Link>
        <Link href="/about">
          <Text className="font-body text-sm text-zinc-100">Sobre</Text>
        </Link>
      </View>
      {/* <View className="items-center py-3">
        <Link
          target="_blank"
          href="https://github.com/kevinkirsten/biblia-a-mensagem"
        >
          <Feather name="github" size={24} color={colors.zinc[100]} />
        </Link>
      </View> */}
      <Text className="text-zinc-400 text-xs font-body text-center">
        © 2024 Bíblia A Mensagem Online. Todos os direitos reservados.
      </Text>
    </View>
  );
}
