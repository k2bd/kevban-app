import { isIP } from "net"
import * as actionTypes from "./actionTypes"


const initialState: KevbanState = {
    issues: [
        {
            title: "Create kevban board",
            body: "Create more than a single issue sitting in space",
            assigneeName: null,
            laneName: "To do",
            userLoading: false,
        },
        {
            title: "Make a billion dollars",
            body: "Get money",
            assigneeName: null,
            laneName: "To do",
            userLoading: false,
        },
        {
            title: "Learn the basics of React",
            body: "Go through the basics of React, Redux, and TypeScript",
            assigneeName: "Kevin",
            laneName: "In progress",
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
    lanes: [
        {
            name: "To do",
        },
        {
            name: "In progress",
        },
        {
            name: "Done",
        },
    ],
}


const assign_user_requested = (action: KevbanAction, state: KevbanState) => {
    if (action.issue === undefined) {
        throw "Undefined issue encountered in ASSIGN_USER_REQUESTED"
    }
    const newIssues = state.issues.map(
        (issue: IIssue) => {
            if (issue.title === action.issue!.title) {
                return {
                    ...issue,
                    userLoading: true,
                    assigneeName: action.user === undefined ? null : action.user.name,
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
    if (action.issue === undefined) {
        throw "Undefined issue encountered in ASSIGN_USER_REQUESTED"
    }
    const newIssues = state.issues.map(
        (issue: IIssue) => {
            if (issue.title === action.issue!.title) {
                return {
                    ...issue,
                    userLoading: false,
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
