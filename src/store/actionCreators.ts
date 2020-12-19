import * as actionTypes from "./actionTypes"


export function simulateAssignUser(issue: IIssue, user: IUser | null) {
    const request_action: KevbanAction = {
        type: actionTypes.ASSIGN_USER_REQUESTED,
        issue: issue,
        user: user,
    }

    const response_ok_action: KevbanAction = {
        type: actionTypes.ASSIGN_USER_OK,
        issue: issue,
        user: user,
    }

    return simulateHttpRequest(request_action, response_ok_action)
}


export function simulateCreateIssue(issue: IIssue) {
    const request_action: KevbanAction = {
        type: actionTypes.CREATE_ISSUE_REQUESTED,
        issue: issue,
    }

    const response_ok_action: KevbanAction = {
        type: actionTypes.CREATE_ISSUE_OK,
        issue: issue,
    }

    return simulateHttpRequest(request_action, response_ok_action)
}


export function simulateMoveIssue(issue: IIssue, lane: ILane) {
    const request_action: KevbanAction = {
        type: actionTypes.MOVE_ISSUE_REQUESTED,
        issue: issue,
        lane: lane,
    }

    const response_ok_action: KevbanAction = {
        type: actionTypes.MOVE_ISSUE_OK,
        issue: issue,
        lane: lane,
    }

    return simulateHttpRequest(request_action, response_ok_action)
}


export function simulateDeleteIssue(issue: IIssue) {
    const request_action: KevbanAction = {
        type: actionTypes.DELETE_ISSUE_REQUESTED,
        issue: issue,
    }

    const response_ok_action: KevbanAction = {
        type: actionTypes.DELETE_ISSUE_OK,
        issue: issue,
    }

    return simulateHttpRequest(request_action, response_ok_action)
}


export function simulateHttpRequest(
    request_action: KevbanAction,
    response_ok_action: KevbanAction,
) {
    return (dispatch: DispatchType) => {
        dispatch(request_action)
        
        // Simulate HTTP request delay
        setTimeout(
            () => {dispatch(response_ok_action)},
            1000
        )
    }
}
