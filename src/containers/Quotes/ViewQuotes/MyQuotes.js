import React from 'react';
import * as userRepository from "../../../utility/repository/userRepository";
import Quotes from "./Quotes";


const MyQuotes = () => {
    const user = userRepository.getUser();
    return (
        <Quotes
            userId={user.id}
            title={"My Quotes"}
        />
    );
};

export default MyQuotes;
