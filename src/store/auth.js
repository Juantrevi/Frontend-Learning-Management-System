import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

/*
* Zustand store
* for managing authentication state in a React
* application. It includes functions to get user
* data, set user data, set loading state, and check
* if a user is logged in. Additionally, it integrates
* with development tools for debugging purposes.
* */
const useAuthStore = create((set, get) => ({
    // Initial state: `allUserData` is set to null.
    allUserData: null,
    // Initial state: `loading` is set to false.
    loading: false,

    // A function that returns an object with `user_id` and `username` from `allUserData`.
    user: () => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
    }),

    // A function to update the `allUserData` state.
    setUser: (user) => set({
        allUserData: user
    }),

    // A function to update the `loading` state.
    setLoading: (loading) => set({ loading }),

    // A function that returns true if `allUserData` is not null, indicating the user is logged in.
    isLoggedIn: () => get().allUserData !== null, // Check if `allUserData` is not null.
}));

// If the environment is development, mount the store to the devtools for debugging.
if (import.meta.env.DEV) {
    mountStoreDevtool("Store", useAuthStore);
}

// Export the `useAuthStore` hook so it can be used in other parts of the application.
export { useAuthStore };
