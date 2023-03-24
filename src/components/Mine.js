import React from "react";

export default function Mine(props) {

    const styles = {
        backgroundColor: props.isPushed ? "#59E391" : "white"
    }

    return (
        <div
            className="mine-face"
            style={styles}
            onClick={props.pressMine}
        >
            <h3>
                {props.value}
            </h3>
        </div>
    )
}