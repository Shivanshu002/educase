# Educase — React Native App

A full-featured React Native mobile application with authentication flow, Redux state management, and bottom tab navigation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.83.1 |
| Language | TypeScript |
| State Management | Redux Toolkit + React Redux |
| Navigation | React Navigation (Stack + Bottom Tabs) |
| Storage | AsyncStorage |
| HTTP / API | Custom service layer (`src/services`) |
| Icons | react-native-vector-icons (Ionicons) |
| Animations | react-native-reanimated + Worklets |
| Env Config | react-native-dotenv |

---

## Folder Structure

```
educase/
│
├── App.tsx                        ← Root component (Provider + Navigation setup)
├── index.js                       ← Entry point
├── .env                           ← Environment variables (API base URL, etc.)
│
├── src/
│   │
│   ├── screens/                   ← All UI screens
│   │   ├── SplashScreen.tsx       ← App launch screen
│   │   ├── OnboardingScreen.tsx   ← First-time user onboarding slides
│   │   ├── LoginScreen.tsx        ← Login form
│   │   ├── Register.tsx           ← Registration form
│   │   ├── ForgotPassword.tsx     ← Forgot password entry
│   │   ├── VerifyOtp.tsx          ← OTP verification
│   │   ├── ResetPassword.tsx      ← New password form
│   │   ├── Home.tsx               ← Main home tab
│   │   ├── Ryde.tsx               ← Ryde/list tab
│   │   ├── Profile.tsx            ← Profile/stats tab
│   │   └── Products.tsx           ← Products listing screen
│   │
│   ├── components/                ← Reusable UI components
│   │   └── Input.tsx              ← Custom text input component
│   │
│   ├── redux/                     ← Global state management
│   │   ├── store.ts               ← Redux store configuration
│   │   ├── slices/
│   │   │   ├── authSlice.ts       ← Auth state (isLoggedIn, user, token)
│   │   │   └── productSlice.ts    ← Products state (list, loading, error)
│   │   └── thunks/
│   │       ├── authThunk.ts       ← Async actions: login, register, OTP, reset
│   │       └── productThunk.ts    ← Async actions: fetch products
│   │
│   ├── services/
│   │   └── index.ts               ← Axios/fetch instance + API call helpers
│   │
│   ├── utils/
│   │   ├── constants.ts           ← App-wide constants
│   │   ├── routers.ts             ← API endpoint URL map
│   │   └── slides.ts              ← Onboarding slide data
│   │
│   ├── styles/                    ← Shared style definitions
│   │
│   └── assest/                    ← Static image assets
│       ├── login.png
│       ├── user.png
│       ├── Group.png
│       ├── Group 44.png
│       └── Group 46.png
│
└── android/                       ← Android native project
```

---

## App Flow Graph

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│  Redux Provider → SafeAreaProvider → NavigationContainer│
└───────────────────────────┬─────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  AuthLoader    │  ← Reads AsyncStorage on mount
                    │                │    dispatches setUserFromStorage
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │ RootNavigator  │  ← Checks isLoggedIn from Redux
                    └───┬───────┬───┘
                        │       │
          isLoggedIn=false     isLoggedIn=true
                        │       │
          ┌─────────────▼─┐   ┌─▼──────────────┐
          │  Auth Stack   │   │  Tab Navigator  │
          │               │   │                 │
          │  Splash       │   │  🏠 Home        │
          │  Onboarding   │   │  📋 Ryde        │
          │  Login        │   │  📊 Profile     │
          │  Register     │   └─────────────────┘
          │  ForgotPwd    │
          │  VerifyOtp    │
          │  ResetPwd     │
          └───────────────┘
```

---

## Redux State Graph

```
┌──────────────────────────────────────────────────────┐
│                    Redux Store                       │
│                                                      │
│  ┌─────────────────────┐  ┌────────────────────────┐ │
│  │     authSlice       │  │    productSlice        │ │
│  │                     │  │                        │ │
│  │  isLoggedIn: bool   │  │  products: []          │ │
│  │  user: object|null  │  │  loading: bool         │ │
│  │  token: string|null │  │  error: string|null    │ │
│  └──────────┬──────────┘  └──────────┬─────────────┘ │
│             │                        │               │
│  ┌──────────▼──────────┐  ┌──────────▼─────────────┐ │
│  │    authThunk        │  │    productThunk        │ │
│  │                     │  │                        │ │
│  │  loginUser()        │  │  fetchProducts()       │ │
│  │  registerUser()     │  └────────────────────────┘ │
│  │  forgotPassword()   │                             │
│  │  verifyOtp()        │                             │
│  │  resetPassword()    │                             │
│  └─────────────────────┘                             │
└──────────────────────────────────────────────────────┘
```

---

## API Endpoints (src/utils/routers.ts)

```
user/login           ← POST  Login with email + password
user/register        ← POST  Create new account
user/forgot-password ← POST  Request OTP to email
user/verify-otp      ← POST  Verify OTP code
user/reset-password  ← POST  Set new password
products             ← GET   Fetch product list
```

---

## Getting Started

### Prerequisites
- Node >= 20
- JDK 17+
- Android Studio / Xcode
- React Native CLI

### Install

```sh
npm install
```

### Environment Setup

Create a `.env` file in the root:

```env
API_BASE_URL=https://your-api-url.com/
```

### Run

```sh
# Start Metro bundler
npm start

# Android
npm run android

# iOS (install pods first)
bundle install
bundle exec pod install
npm run ios
```

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start Metro dev server |
| `npm run android` | Build & run on Android |
| `npm run ios` | Build & run on iOS |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
