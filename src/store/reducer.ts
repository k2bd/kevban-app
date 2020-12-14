import { isIP } from "net"
import * as actionTypes from "./actionTypes"


const initialState: KevbanState = {
    issues: [
        {
            title: "Create kevban board",
            body: "Create more than a single issue sitting in space",
            assignee_name: null,
            userLoading: false,
        },
    ],
    users: [
        {
            name: "Kevin",
        },
        {
            name: "Gonzo",
        },
    ],
}


const assign_user_requested = (action: KevbanAction, state: KevbanState) => {
    if (action.issue === null) {
        throw "Null value encountered in ASSIGN_USER_REQUESTED"
    }
    const newIssues = state.issues.map(
        (issue: IIssue) => {
            if (issue.title === action.issue!.title) {
                return {
                    ...issue,
                    userLoading: true,
                }
            } else {
                return issue
            }
        }
    )
    return {
        ...state,
        issues: newIssues,
    }
}


const assign_user_ok = (action: KevbanAction, state: KevbanState) => {
    if (action.issue === null) {
        throw "Null value encountered in ASSIGN_USER_REQUESTED"
    }
    const newIssues = state.issues.map(
        (issue: IIssue) => {
            if (issue.title === action.issue!.title) {
                return {
                    ...issue,
                    userLoading: false,
                    assignee_name: action.user ? null : action.user!.name,
                }
            } else {
                return issue
            }
        }
    )
    return {
        ...state,
        issues: newIssues,
    }
}


const reducer = (
    state: KevbanState = initialState,
    action: KevbanAction,
): KevbanState => {
    switch (action.type) {
        case actionTypes.ASSIGN_USER_REQUESTED:
            return assign_user_requested(action, state)
        case actionTypes.ASSIGN_USER_OK:
            return assign_user_ok(action, state)
    }
    return state
}

export default reducer
