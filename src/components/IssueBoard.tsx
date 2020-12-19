import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { Divider } from "@blueprintjs/core";

import { IssueLane } from "./IssueLane"


type Props = {
    deleteIssue: (issue: IIssue) => void,
    assignUser: (issue: IIssue, user: IUser | null) => void,
    moveIssue: (issue: IIssue, lane: ILane) => void,
}


export const IssueBoard: React.FC<Props> = ({deleteIssue, assignUser, moveIssue}) => {
    const lanes: readonly ILane[] = useSelector(
        (state: KevbanState) => state.lanes,
        shallowEqual
    )

    const renderedLanes = lanes.map(
        (lane: ILane) => (
            <div>
                <IssueLane
                    lane={lane}
                    deleteIssue={deleteIssue}
                    assignUser={assignUser}
                    moveIssue={moveIssue}
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
