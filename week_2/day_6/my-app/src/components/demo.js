import React from "react";

import './demo.css'

export default function Demo(props) {
return  (
<div className="example-card p-3 m-5">
    <h5>Name: {props.name}</h5>
    <h5>Job Title: {props.name}</h5>
</div>
);
}