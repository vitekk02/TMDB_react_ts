import { FunctionComponent, memo, useCallback, useContext } from "react";
import { authenticateUser, createNewToken } from "../model/api";
import { UserBase } from "../types/userBase";
import { LoggedInUserContext } from "../utils/logged-in-user-context";

const HomeBase: FunctionComponent = () => {
    const { setUser } = useContext(LoggedInUserContext);

    
    return (
        <>
        TEEEEEEEEEEST
        </>
    );
};

export const Home = memo(HomeBase);