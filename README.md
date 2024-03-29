# myDSB

![badge](https://img.shields.io/github/license/Tch1b0/myDSB) ![badge](https://img.shields.io/github/issues/Tch1b0/myDSB?style=flat) ![badge](https://img.shields.io/github/actions/workflow/status/tch1b0/myDSB/unit-test.yml?branch=main&label=unit%20tests) ![badge](https://img.shields.io/github/actions/workflow/status/tch1b0/myDSB/e2e-test.yml?branch=main&label=e2e%20tests)

An alternative for the DSBmobile app, for both Android and iOS 

## Screenshots

<img src="./demo/myDSB_login.jpg" width="200"> <img src="./demo/myDSB_timetable.jpg" width="200"> <img src="./demo/myDSB_news.jpg" width="200"> <img src="./demo/myDSB_settings.jpg" width="200">

## Philosophy

_Why is your Smartphone called smart?_
Because it does stuff automatically _for_ you instead of just giving all the information crunched together.

**myDSB** is a kind of app that actively **presents** information to you.

## npm scripts

### Start a local server

```
$ npm run serve
```

### Start cypress in a new window

Remember to run the local server parallel.

```
$ npm run test:gui
```

### Run eslint

```
$ npm run lint
```

### Build for android

```
$ npm run build:android
```

### Build for ios

```
$ npm run build:ios
```

### Adapt icon and splash screen

This should be executed right after building.

```
$ npm run resources
```

## Contributing

If you want to contribute, make sure to read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## License

Licensed under the [GNU-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) license.

## Built with

-   [ionic](https://ionic.io/)
-   [ionicons](https://github.com/ionic-team/ionicons)
-   [capacitor](https://capacitorjs.com/)
-   [Vue.js](https://vuejs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
