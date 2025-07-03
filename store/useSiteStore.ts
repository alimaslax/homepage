import { create } from "zustand";
import { persist } from "zustand/middleware";


type ProfileType = Record<string, any>; // Adjust based on your real profile shape

type SiteState = {
  PanOpen: boolean;
  isRobot: boolean;
  apiKey: string;
  profile: ProfileType;
  togglePan: () => void;
  toggleIsRobot: (robot: boolean) => void;
  setApiKey: (apiKey: string) => void;
  setResume: (profile: ProfileType) => void;
};

const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      PanOpen: true,
      isRobot: true,
      apiKey: "xxxx",
      profile: {},
      togglePan: () => set((state) => ({ PanOpen: !state.PanOpen })),
      toggleIsRobot: (robot) => set(() => ({ isRobot: robot })),
      setApiKey: (apiKey) => set(() => ({ apiKey })),
      setResume: (profile) => set(() => ({ profile })),
    }),
    {
      name: "site-storage",
    }
  )
);

export default useSiteStore;