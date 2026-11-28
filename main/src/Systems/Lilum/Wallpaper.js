export default function (wallpaperId, custom = false, list = false) {
  const wallpapers = [
    {
      id: 1,
      name: "With Our Wounded Hand",
      image: `/Wallpapers/L-1.png`,
    },
    {
      id: 2,
      name: "Night City",
      image: `/Wallpapers/L-0.png`,
    },
    {
      id: 3,
      name: "Kitty :3",
      image: `/Wallpapers/L-2.png`,
    },
    {
      id: 4,
      name: "Bliss (4K)",
      image: `/Wallpapers/L-3.png`,
    },
  ];
  if (list) {
    return wallpapers;
  }
  if (custom) {
    return {
      id: 0,
      name: "Custom Wallpaper",
      image: wallpaperId,
    };
  }

  let seletedWallaper = wallpapers.find(
    (wallpaper) => wallpaper.id === wallpaperId,
  );
  return seletedWallaper;
}
