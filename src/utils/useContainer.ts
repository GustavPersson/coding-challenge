import { Containers, appContainer } from "../Composition/AppContainer";

export default function useContainer<T>(containerId: Containers): T {
  return appContainer.get<T>(containerId);
}
