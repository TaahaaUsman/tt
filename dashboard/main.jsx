import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./redux/store.js";
import { initializeMockAuth } from "./redux/features/authSlice.js";
import { setupMockBackend } from "./mockBackend/index.js";
import MainRoute from "./Routes/Route.jsx";
import App from "./App.jsx";

// Initialize mock backend if enabled
setupMockBackend();

// Authentication removed - initialize mock auth on app start
function GlobalAppWrapper() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // Initialize mock auth if role is not set (after rehydration)
    if (!auth?.role || !auth?.token) {
      dispatch(initializeMockAuth());
    }
  }, [dispatch, auth?.role, auth?.token]);

  return <RouterProvider router={MainRoute} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Toaster position="top-center" reverseOrder={false} />
        <GlobalAppWrapper />
      </PersistGate>
    </Provider>
  </StrictMode>
);
