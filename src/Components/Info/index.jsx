import React from "react";
import "./styles.css";
import Button from "../Button";
import { resetAppStateAction } from "../../Store/actions";

export default function Info() {
    return (
        <ul className="info-list">
            <li>Use CMD + Enter or Windows + Enter to submit comment form</li>
            <li>Default sort is in decending order by date and time</li>
            <li>
                Clear application local storage to clean the app state or
                <Button
                    variantType="text"
                    variant="tertiary"
                    className={"reset-btn"}
                    onClick={resetAppStateAction}
                >
                    click here
                </Button>
            </li>
        </ul>
    );
}
