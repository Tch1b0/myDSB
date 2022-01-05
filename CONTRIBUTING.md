# Contributing to myDSB

Thank you for taking the time to contribute!

In order to contribute to this repository, make sure you have [nodejs](https://nodejs.org/en/) installed.

1. Fork this repository by accessing: https://github.com/tch1b0/myDSB/fork

2. Clone your fork:

    ```
    $ git clone https://github.com/<YOUR USERNAME>/myDSB
    ```

    remember to replace `<YOUR USERNAME>` with your actual username.

3. Install the required dependencies:

    ```
    $ npm ci
    ```

4. Code what you wanted to code and don't forget to run

    ```
    $ npm run lint
    ```

    from time to time.

5. Run the code:

    **Browser**(with live updates):

    ```
    $ npm run serve
    ```

    **Android**(open afterwards in [Android Studio](https://developer.android.com/studio/)):

    ```
    $ npm run build:android
    ```

    **iOS**(open afterwards in [Xcode](https://developer.apple.com/xcode/)):

    ```
    $ npm run build:ios
    ```

6. Test the code by running the following commands in **two seperate terminals**

    ```
    $ npm run serve
    ```

    ```
    $ npm run test:main
    ```

7. Once you are done working on your changes, you can commit them:

    ```
    $ git add my/changed/files
    ```

    ```
    $ git commit
    ```

8. Push your commit to your fork:

    ```
    $ git push
    ```

9. Open a new pull request from your fork to the official repo and describe what you changed.
