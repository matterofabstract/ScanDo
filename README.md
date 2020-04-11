# Scan Do Scan

ScanDo is a QR Code scanner that gets stuff done.

You scan a QR code and depending on it's contents, ScanDo provides you compatible actions.

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
yarn && yarn electron-dev
```

You can generate a build for macOS, Windows and Linux all in one go with:

```sh
yarn electron-pack
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
