import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { Divider } from "@blueprintjs/core";

import { IssueLane } from "./IssueLane"


type Props = {
    service: IService,
}


export const IssueBoard: React.FC<Props> = ({service}) => {
    const lanes: readonly ILane[] = useSelector(
        (state: KevbanState) => state.lanes,
        shallowEqual
    )

    const renderedLanes = lanes.map(
        (lane: ILane) => (
            <div>
                <IssueLane
                    lane={lane}
                    service={service}
                />
            </div>
        )
    )

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}>
            {renderedLanes}
        </div>
    )
}
