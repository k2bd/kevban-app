import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { Divider } from "@blueprintjs/core";

import { IssueLane } from "./IssueLane"



type Props = {
    deleteIssue: (issue: IIssue) => void,
    assignUser: (issue: IIssue, user: IUser | null) => void,
}


export const IssueBoard: React.FC<Props> = ({deleteIssue, assignUser}) => {
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
                />
            </div>
        )
    )

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>{renderedLanes}</div>
    )
}
