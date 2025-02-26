# Intl' Devs Assessment

## Methodology

- Firstly, I started with setting up the graphl api in which I defined the schemas for the mock data for the various game options
- Then I went on to Scaffold the expo application and setup my layouts.
- I focused on designing fleshing the home screen out because I wanted the app to be interactive in such a way that the games I picked would show straight in the BetSlip
- I put a check to ensure that you can only place a bet on one team in a game. i.e, not letting you place two bets from same game. This stops the edgecase of one placing a bets for two opposing teams in the same match

## Assumptions

- I didnt build out the Parlay Tab in the Betslip because I assumed the focus was on Singles

## To Get started

1. Install the dependencies for the api by entering the `graphql-api` folder and running:

   ```bash
   npm install
   ```

2. Start the app

```bash
    npm start
```

3. Install the dependencies for the mobile app running the command in the parent folder:

   ```bash
   npm install
   ```

4. Start the app

```bash
 npx expo start
```

In the output for the Mobile app, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
