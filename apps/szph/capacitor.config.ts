import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "sk.szph.app",
  appName: "SZPH",
  webDir: ".next",
  server: {
    url: "http://192.168.1.228:3011",
    cleartext: true,
  },
  ios: {
    scheme: "SZPH",
    contentInset: "automatic",
    backgroundColor: "#0e264a",
  },
  backgroundColor: "#0e264a",
  android: {
    allowMixedContent: true,
  },
};

export default config;
