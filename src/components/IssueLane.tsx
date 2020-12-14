import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Issue } from "./Issue"


type Props = {
    lane: ILane,
    issues: IIssue[],
    deleteIssue: (issue: IIssue) => void,
    assignUser: (issue: IIssue, user?: IUser) => void,
}


export const IssueLane: React.FC<Props> = ({lane, issues, deleteIssue, assignUser}) => {
    const displayIssues = issues.map(
        (issue: IIssue) => (
            <Issue
                key={issue.title}
                issue={issue}
                deleteIssue={deleteIssue}
                assignUser={assignUser}
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
