import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Issue } from "./Issue"


type Props = {
    lane: ILane,
    deleteIssue: (issue: IIssue) => void,
    assignUser: (issue: IIssue, user: IUser | null) => void,
    moveIssue: (issue: IIssue, lane: ILane) => void,
}


export const IssueLane: React.FC<Props> = ({lane, deleteIssue, assignUser, moveIssue}) => {
    const allIssues: readonly IIssue[] = useSelector(
        (state: KevbanState) => state.issues,
        shallowEqual
    )

    const laneIssues = allIssues.filter(
        (issue: IIssue) => issue.laneName === lane.name
    )

    const displayIssues = laneIssues.map(
        (issue: IIssue) => (
            <Issue
                key={issue.title}
                issue={issue}
                deleteIssue={deleteIssue}
                assignUser={assignUser}
                moveIssue={moveIssue}
            />
        )
    )

    return (
        <div>
            <h2>{lane.name}</h2>
            {displayIssues}
        </div>
    )
}
