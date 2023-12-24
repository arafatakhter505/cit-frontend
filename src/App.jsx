import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AlertContaxtApi from "./contextApi/AlertContextApi";
import UserContext from "./contextApi/UserContext";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AlertContaxtApi>
        <UserContext>
          <RouterProvider router={router} />
        </UserContext>
      </AlertContaxtApi>
    </QueryClientProvider>
  );
};

export default App;
