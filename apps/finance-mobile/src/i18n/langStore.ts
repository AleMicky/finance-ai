import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "lang";

export async function getSavedLang(): Promise<"es" | "en" | null> {
    const v = await AsyncStorage.getItem(KEY);
    if (v === "es" || v === "en") return v;
    return null;
}

export async function saveLang(lang: "es" | "en") {
    await AsyncStorage.setItem(KEY, lang);
}