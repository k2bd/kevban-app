import React from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { Issue } from "./components/Issue"
import { IssueBoard } from './components/IssueBoard';

import { simulateAssignUser } from "./store/actionCreators"


const App: React.FC = () => {
    const issues: readonly IIssue[] = useSelector(
        (state: KevbanState) => state.issues,
        shallowEqual
    )

    return (
        <div className="App">
            <IssueBoard
                deleteIssue={(issue: IIssue) => null} // TODO
                assignUser={simulateAssignUser}
            />
        </div>
    );
}

export default App;
