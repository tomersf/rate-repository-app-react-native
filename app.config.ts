import { config } from "dotenv";
config();

export default {
  expo: {
    name: "rate-repository-app2",
    slug: "rate-repository-app2",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      ENV: process.env.ENV || "development",
      BACKEND_BASE_URL: process.env.API_BASE_URL || "localhost:5001",
    },
  },
};
