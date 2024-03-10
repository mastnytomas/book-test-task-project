import create from "zustand";
import {
	loadIsAdminModeFromLocalStorage,
	setIsAdminModeToLocalStorage,
} from "../utils/utils";

interface AdminStoreState {
	isAdminMode: boolean;
	setIsAdminMode: (value: boolean) => void;
}

const useAdminStore = create<AdminStoreState>((set) => ({
	isAdminMode: loadIsAdminModeFromLocalStorage(),
	setIsAdminMode: (value) =>
		set(() => {
			setIsAdminModeToLocalStorage(value);
			return { isAdminMode: value };
		}),
}));

export default useAdminStore;
