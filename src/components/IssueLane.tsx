import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Issue } from "./Issue"


type Props = {
    lane: ILane,
    service: IService,
}


export const IssueLane: React.FC<Props> = ({lane,service}) => {
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
                service={service}
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
