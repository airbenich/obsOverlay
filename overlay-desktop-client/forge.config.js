const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');

const { version } = packageJson;
const iconDir = path.resolve(__dirname, 'icons');

if (process.env['WINDOWS_CODESIGN_FILE']) {
  const certPath = path.join(__dirname, 'win-certificate.pfx');
  const certExists = fs.existsSync(certPath);

  if (certExists) {
    process.env['WINDOWS_CODESIGN_FILE'] = certPath;
  }
}

const config = {
  packagerConfig: {
    name: 'Overlay Manager',
    executableName: 'overlay-manager',
    asar: true,
    icon: path.resolve(__dirname, 'icons', 'icon'),
    appBundleId: 'com.airbenich.overlaymanager',
    usageDescription: {
      Camera:
        'Access is needed by certain built-in fiddles in addition to any custom fiddles that use the Camera',
      Microphone:
        'Access is needed by certain built-in fiddles in addition to any custom fiddles that use the Microphone',
    },
    appCategoryType: 'public.app-category.developer-tools',
    win32metadata: {
      CompanyName: 'Overlay Manager',
      OriginalFilename: 'Overlay Manager',
    },
    osxSign: {
      identity: '',
      hardenedRuntime: true,
      'gatekeeper-assess': false,
      entitlements: 'entitlements.plist',
      'entitlements-inherit': 'entitlements.plist',
      'signature-flags': 'library',
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => {
        const certificateFile = process.env.CI
          ? path.join(__dirname, 'cert.p12')
          : process.env.WINDOWS_CERTIFICATE_FILE;

        if (!certificateFile || !fs.existsSync(certificateFile)) {
          console.warn(
            `Warning: Could not find certificate file at ${certificateFile}`,
          );
        }

        return {
          name: 'overlay-manager',
          authors: 'Overlay Manager',
          exe: 'overlay-manager.exe',
          setupExe: 'Setup.exe',
          setupIcon: path.resolve(iconDir, 'icon.ico'),
          noMsi: true,
          setupExe: `overlay-manager-${version}-win32-${arch}-setup.exe`,
          setupIcon: path.resolve(iconDir, 'icon.ico'),
          certificateFile: process.env['WINDOWS_CODESIGN_FILE'],
          certificatePassword: process.env['WINDOWS_CODESIGN_PASSWORD'],
        };
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin','win32','linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {
        icon: {
          scalable: path.resolve(iconDir, 'icon.svg'),
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
    },
  ]
};

function notarizeMaybe() {
  if (process.platform !== 'darwin') {
    return;
  }

  if (!process.env.CI) {
    console.log(`Not in CI, skipping notarization`);
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.warn(
      'Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!',
    );
    return;
  }

  config.packagerConfig.osxNotarize = {
    appBundleId: 'com.airbenich.overlaymanager',
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    ascProvider: '',
  };
}

notarizeMaybe();

// Finally, export it
module.exports = config;