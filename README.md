# ScanDo

[![Dependencies](https://david-dm.org/matterofabstract/ScanDo.svg)](https://github.com/matterofabstract/ScanDo)
![Github All Releases](https://img.shields.io/github/downloads/matterofabstract/ScanDo/total.svg)
![Lint](https://github.com/matterofabstract/ScanDo/workflows/Lint/badge.svg)
![Build/release](https://github.com/matterofabstract/ScanDo/workflows/Build/release/badge.svg)

ScanDo is a Computer Vision (CV) scanner that gets stuff done.

Scan something like a QR code or web cam feed and ScanDo will provide you with a list of compatible actions, allowing you to build and chain together powerful logistical workflows.

![Screenshot of ScanDo](https://bpk-disk.s3.us-east-1.amazonaws.com/scando-screenshot.png)

## Things you can scan

1. Random hash
2. Contacts
3. Calendar items
4. URLs
5. Email Address
6. SMS
7. Geo Location
8. Wifi Codes

## Development

Get a local develop instance running with:

```sh
npm i && npm run electron-dev
```

You can generate a build for macOS, Windows and Linux all in one go with:

```sh
npm run electron-pack
```

Don't forget to take a peak at `packages.json` for more commands.

## Releasing updates

Updates to ScanDo are done through GitHub Actions, namely Samuelmeuli's [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder). See the [workflows](https://github.com/matterofabstract/scando/tree/master/.github/workflows) directory for details.

When you want to create a new release, follow these steps:

1. Update the version in your project's `package.json` file (e.g. `1.2.3`)
2. Commit that change (`git commit -am v1.2.3`)
3. Tag your commit (`git tag v1.2.3`). Make sure your tag name's format is `v*.*.*`. Your workflow will use this tag to detect when to create a release
4. Push your changes to GitHub (`git push && git push --tags`)

After building successfully, the action will publish your release artifacts. By default, a new release draft will be created on GitHub with download links for your app. If you want to change this behavior, have a look at the [`electron-builder` docs](https://www.electron.build/).

![](https://bpk-disk.s3.us-east-1.amazonaws.com/designed-by-abstractly-footer.png?c=1)
