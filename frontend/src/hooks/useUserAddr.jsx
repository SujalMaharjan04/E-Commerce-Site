import { useQuery } from "@tanstack/react-query";
import userService from '../services/user'
import { useContext } from "react";
import { UserContext } from "../context/adminContext";

const useUserAddr = () => {
    const [user, dispatchUser] = useContext(UserContext)

    const userAddr = useQuery({
        queryKey: ['user-address', user?.id],
        enabled: !!user?.token,
        queryFn: () => userService.getUserAddress(),
        retry: 0
    })

    return userAddr
}

export default useUserAddr