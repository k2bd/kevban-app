import React from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { Issue } from "./components/Issue"

import { simulateAssignUser } from "./store/actionCreators"


const App: React.FC = () => {
    const issues: readonly IIssue[] = useSelector(
        (state: KevbanState) => state.issues,
        shallowEqual
    )
    const dispatch: Dispatch<any> = useDispatch()

    const displayIssues = issues.map(
        (issue: IIssue) => (
            <Issue
                key={issue.title}
                issue={issue}
                deleteIssue={(i: IIssue) => null} // TODO, get action creator
                assignUser={simulateAssignUser}
            />
        )
    )

    return (
        <div className="App">
            {displayIssues}
        </div>
    );
}

export default App;
