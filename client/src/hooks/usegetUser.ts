import { useAppSelector } from "./useAppStore";



export const usegetUser = () => {
    const { userData } = useAppSelector((state) => state.auth);
    return userData
}