"use client"
import { create } from 'zustand'


const useUserStore = create(

    (set, get) => ({
        id: null,
        email: null,
        password: null,
        firstName: "",
        lastName: "",
        profilePic: null,
        address: {
            province: "",
            district: "",
            neighborhood: ""
        },
        setId: (_id) => set((state) => ({ id: _id })),
        setEmail: (_email) => set((state) => ({ email: _email })),
        setPassword: (_password) => set((state) => ({ password: _password })),
        setFirstName: (_firstName) => set((state) => ({ firstName: _firstName })),
        setLastName: (_lastName) => set((state) => ({ lastName: _lastName })),
        setProfilePic: (_profilePic) => set((state) => ({ profilePic: _profilePic })),
        setAddress: (_address) => set((state) => ({ address: _address }))
       
        /*  setFullName: (fullName)=>{
             const state = get();
             const fullName =
         } */

    }), {
    name: "user-storage",
    getUser: () => sessionStorage
}

)
export default useUserStore;