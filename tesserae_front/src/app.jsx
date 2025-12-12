import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, lazy, createSignal, onMount, onCleanup, Show } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import { isAuthenticated, clearAuthData, validateToken } from "@/utils/api";
import "./App.css";
import "./index.css";

const Navigator = lazy(() => import("@/components/navigator"));

export default function App() {
  const [mounted, setMounted] = createSignal(false);

  let intervalId = null;
  onMount(() => {
    setMounted(true);
    const checkAuth = async () => {
      if (isAuthenticated()) {
        if (!(await validateToken())) {
          clearAuthData();
          window.location.href = "/auth";
        }
      }
      checkAuth();
      intervalId = window.setInterval(checkAuth, 6e5);
      onCleanup(() => clearInterval(intervalId));
    };
  });

  onCleanup(() => {
    if (intervalId) clearInterval(intervalId);
  });

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Show when={mounted()}>
            <Suspense>
              <Navigator />
            </Suspense>
          </Show>
          <Suspense>
            {props.children}
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
