module.exports = {
  packagerConfig: {
    icon: 'src/img/icon',
    name: 'Zaasgobas_1.1',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // The ICO file to use as the icon for the generated Setup.exe
        iconUrl : "https://i.imgur.com/HlCQEye.png",
        authors: "Zaack",
        name: "Zaasgobas",
        setupIcon: 'src/img/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        options: {
        },
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
      },
    },
  ],
};
