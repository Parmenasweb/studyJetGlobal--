import { ImageKitClient } from "imagekitio-next";

// Initialize ImageKit client for client-side operations
export const imagekitClient = new ImageKitClient({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  authenticator: async () => {
    try {
      const response = await fetch("/api/auth/imagekit");
      if (!response.ok) {
        throw new Error("Failed to get authentication parameters");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }
}); 