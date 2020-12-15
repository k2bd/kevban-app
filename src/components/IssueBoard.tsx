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
    const issues: readonly IIssue[] = useSelector(
        (state: KevbanState) => state.issues,
        shallowEqual
    )
    const lanes: readonly ILane[] = useSelector(
        (state: KevbanState) => state.lanes,
        shallowEqual
    )

    const renderLane = (lane: ILane) => {
        const issuesForLane = issues.filter(
            (issue: IIssue) => issue.laneName === lane.name
        )
        return <IssueLane
            lane={lane}
            issues={issuesForLane}
            deleteIssue={deleteIssue}
            assignUser={assignUser}
        />
    }

    // TODO what if there are no lanes
    const renderedLanes = lanes.map(
        (lane: ILane) => (
            <div>
                {renderLane(lane)}
            </div>
        )
    )

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>{renderedLanes}</div>
    )
}
