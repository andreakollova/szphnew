import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "sk.szph.app",
  appName: "SZPH",
  webDir: ".next",
  server: {
    url: "https://szphnew-fieldhockey.vercel.app",
    cleartext: true,
  },
  ios: {
    scheme: "SZPH",
    contentInset: "automatic",
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
