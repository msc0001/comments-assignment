import { useState } from "react";
import { getComments } from "../Helpers";

export const useComments = () => {
    const [{
        comments,
        connections,
        commentDict
    }] = useState(getComments());

    return {
        comments,
        commentDict,
        connections
    }
}