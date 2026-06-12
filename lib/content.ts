export type Film = {
  title: string;
  category: string;
  subtitle: string;
  image: string;
  video: string;
  orientation: "portrait" | "landscape";
};

const demoVideo =
  "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4";

export const films: Film[] = [
  {
    title: "AUREA",
    category: "FILM",
    subtitle: "Luxury Event Campaign",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85",
    video: demoVideo,
    orientation: "landscape"
  },
  {
    title: "DELISHIO",
    category: "CAMPAIGN",
    subtitle: "Brand Visuals",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=85",
    video: demoVideo,
    orientation: "portrait"
  },
  {
    title: "MPRV",
    category: "BRAND",
    subtitle: "Identity Film",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=85",
    video: demoVideo,
    orientation: "portrait"
  },
  {
    title: "SIDI BOU SAID",
    category: "FILM",
    subtitle: "Destination Film",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85",
    video: demoVideo,
    orientation: "landscape"
  },
  {
    title: "MAISON",
    category: "BRAND",
    subtitle: "Interior Campaign",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    video: demoVideo,
    orientation: "portrait"
  },
  {
    title: "ÉCLAT",
    category: "WEDDING",
    subtitle: "A Film About Two",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    video: demoVideo,
    orientation: "portrait"
  }
];
