import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zippy - Shorten URLs Fast",
    short_name: "Zippy",
    description: "The fastest way to make long links short.",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    icons: [],
  };
}
