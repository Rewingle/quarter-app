'use client'
import { create } from 'zustand'

const useStore = create(set => ({
    _id: 0,
    email: 'zaxx',
    firstName: '',
    lastName: '',
    userName: '',
    profilePic: '',
    address: {
        province: '',
        district: '',
        neighborhood: ''
    },
    setId: (_id) => set(state=>({_id: _id})),
    setEmail: (email) => set(state => ({ email: email })),
    setFirstName: (firstName) => set(state => ({ firstName: firstName })),
    setLastName: (lastName) => set(state => ({ lastName: lastName })),
    setUserName: (userName) => set(state => ({ userName: userName })),
    setProfilePic: (profilePic) => set(state => ({ profilePic: profilePic })),
    setAddress: (address) => set(state => ({ address: address })),
}))
export {
    useStore
}