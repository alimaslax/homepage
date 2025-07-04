import { create } from "zustand";
import { persist } from "zustand/middleware";


type ProfileType = Record<string, any>; // Adjust based on your real profile shape

type SiteState = {
  PanOpen: boolean;
  isRobot: boolean;
  apiKey: string;
  profile: ProfileType;
  activeLink: string;
  togglePan: () => void;
  toggleIsRobot: (robot: boolean) => void;
  setApiKey: (apiKey: string) => void;
  setResume: (profile: ProfileType) => void;
  setActiveLink: (link: string) => void;
};

const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      PanOpen: true,
      isRobot: true,
      apiKey: "xxxx",
      profile: {},
      activeLink: "Home",
      togglePan: () => set((state) => ({ PanOpen: !state.PanOpen })),
      toggleIsRobot: (robot) => set(() => ({ isRobot: robot })),
      setApiKey: (apiKey) => set(() => ({ apiKey })),
      setResume: (profile) => set(() => ({ profile })),
      setActiveLink: (link: string) => set(() => ({ activeLink: link })),
    }),
    {
      name: "site-storage",
    }
  )
);

export default useSiteStore;