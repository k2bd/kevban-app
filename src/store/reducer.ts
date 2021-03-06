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
            issueLoading: false,
        },
        {
            title: "Make a billion dollars",
            body: "Get money",
            assigneeName: null,
            laneName: "To do",
            userLoading: false,
            issueLoading: false,
        },
        {
            title: "Learn the basics of React",
            body: "Go through the basics of React, Redux, and TypeScript",
            assigneeName: "Kevin",
            laneName: "In progress",
            userLoading: false,
            issueLoading: false,
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
            name: "Blocked",
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
    if ((action.issue === undefined) || action.user === undefined) {
        throw "Undefined value encountered in ASSIGN_USER_REQUESTED"
    }
    const newIssues = state.issues.map(
        (issue: IIssue) => {
            if (issue.title === action.issue!.title) {
                return {
                    ...issue,
                    userLoading: true,
                    assigneeName: action.user === null ? null : action.user!.name,
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
    if ((action.issue === undefined) || action.user === undefined) {
        throw "Undefined value encountered in ASSIGN_USER_OK"
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


const create_issue_requested = (action: KevbanAction, state: KevbanState) => {
    if (action.issue === undefined) {
        throw "Undefined issue encountered in CREATE_ISSUE_REQUESTED"
    }
    return {
        ...state,
        issues: state.issues.concat([action.issue]),
    }
}


const create_issue_ok = (action: KevbanAction, state: KevbanState) => {
    return state
}


const move_issue_requested = (action: KevbanAction, state: KevbanState) => {
    if ((action.issue === undefined) || action.lane === undefined) {
        throw "Undefined value encountered in MOVE_ISSUE_REQUESTED"
    }
    const newIssues = state.issues.map(
        (issue: IIssue) => {
            if (issue.title === action.issue!.title) {
                return {
                    ...issue,
                    issueLoading: true,
                    laneName: action.lane!.name,
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


const move_issue_ok = (action: KevbanAction, state: KevbanState) => {
    if ((action.issue === undefined) || action.lane === undefined) {
        throw "Undefined value encountered in MOVE_ISSUE_OK"
    }
    const newIssues = state.issues.map(
        (issue: IIssue) => {
            if (issue.title === action.issue!.title) {
                return {
                    ...issue,
                    issueLoading: false,
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


const delete_issue_requested = (action: KevbanAction, state: KevbanState) => {
    if (action.issue === undefined) {
        throw "Undefined value encountered in DELETE_ISSUE_REQUESTED"
    }
    const newIssues = state.issues.filter(
        (issue: IIssue) => (issue.title != action.issue!.title)
    )
    return {
        ...state,
        issues: newIssues,
    }
}


const delete_issue_ok = (action: KevbanAction, state: KevbanState) => {
    return state
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
        case actionTypes.CREATE_ISSUE_REQUESTED:
            return create_issue_requested(action, state)
        case actionTypes.CREATE_ISSUE_OK:
            return create_issue_ok(action, state)
        case actionTypes.MOVE_ISSUE_REQUESTED:
            return move_issue_requested(action, state)
        case actionTypes.MOVE_ISSUE_OK:
            return move_issue_ok(action, state)
        case actionTypes.DELETE_ISSUE_REQUESTED:
            return delete_issue_requested(action, state)
        case actionTypes.DELETE_ISSUE_OK:
            return delete_issue_ok(action, state)
    }
    return state
}

export default reducer
