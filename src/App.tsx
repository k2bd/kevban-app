import React from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { ControlBar } from './components/ControlBar';
import { Issue } from "./components/Issue"
import { IssueBoard } from './components/IssueBoard';

import { simulateAssignUser, simulateCreateIssue, simulateMoveIssue } from "./store/actionCreators"


const App: React.FC = () => {
    const issues: readonly IIssue[] = useSelector(
        (state: KevbanState) => state.issues,
        shallowEqual
    )

    return (
        <div className="App">
            <ControlBar createIssue={simulateCreateIssue}/>
            <IssueBoard
                deleteIssue={(issue: IIssue) => null} // TODO
                assignUser={simulateAssignUser}
                moveIssue={simulateMoveIssue}
            />
        </div>
    );
}

export default App;
