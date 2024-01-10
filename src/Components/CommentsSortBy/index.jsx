import React from "react";
import "./styles.css";
import Button from "../Button";
import ArrowDown from "../Icons/ArrowDown";
import { useSelector } from "react-redux";
import { toggleSortOrderAction } from "../../Store/actions";

export default function CommentsSortBy() {
    const sortOrder = useSelector((state) => state.sortOrder);

    return (
        <div className="sort-by">
            <span className="sort-by-text">Sort By :</span>
            <Button
                className="sort-by-btn"
                variantType="text"
                variant="tertiary"
                onClick={toggleSortOrderAction}
            >
                <span>Date and Time</span>
                <ArrowDown size={16} className={sortOrder ? "down" : "up"} />
            </Button>
        </div>
    );
}
