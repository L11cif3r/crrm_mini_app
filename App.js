import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { store } from "./store/store";
import { theme } from "./config/theme";
import RootNavigator from "./navigation/RootNavigator";
import { loginUser } from "./features/auth/authSlice";

function PersistAuth({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Save or delete token when it changes
  useEffect(() => {
    if (token) {
      SecureStore.setItemAsync("userToken", token);
    } else {
      SecureStore.deleteItemAsync("userToken");
    }
  }, [token]);

  // On app launch, try to read token
  useEffect(() => {
    (async () => {
      const savedToken = await SecureStore.getItemAsync("userToken");
      if (savedToken) {
        // You can also fetch user info from your API if needed
        dispatch(loginUser({ user: { name: "Saved User" }, token: savedToken }));
      }
    })();
  }, []);

  return children;
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <PersistAuth>
          <RootNavigator />
        </PersistAuth>
      </PaperProvider>
    </ReduxProvider>
  );
}
