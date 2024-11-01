import { IBibleBook } from "@/types/bible";
import { View, Text, ScrollView } from "react-native";
import { BooksItem } from "./books-item";

interface Props {
  books: IBibleBook[];
  title: string;
  testament: "old-testament" | "new-testament";
}

export function Books({ title, books, testament }: Props) {
  return (
    <View className="flex-1 mx-3">
      <Text className="text-xl text-zinc-100 font-bold text-center my-3">
        {title}
      </Text>
      <ScrollView className="bg-zinc-900 border border-zinc-400 rounded-md">
        {books.map((book) => (
          <BooksItem
            key={book.normalizedTitle}
            book={book}
            testament={testament}
          />
        ))}
      </ScrollView>
    </View>
  );
}
