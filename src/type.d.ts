// ----- DATA MODELS -----

interface IIssue {
    title: string,
    body: string,
    assigneeName: null | string,
    laneName: string,
    userLoading: boolean,
    issueLoading: boolean,
}


interface IUser {
    name: string,
}


interface ILane {
    name: string,
}


interface IService {
    createIssue: (issue: IIssue) => (dispatch: DispatchType) => void,
    assignUser: (issue: IIssue, user: IUser | null) => (dispatch: DispatchType) => void,
    moveIssue: (issue: IIssue, lane: ILane) => (dispatch: DispatchType) => void,
    deleteIssue: (issue: IIssue) => (dispatch: DispatchType) => void,
}


// ----- STATE -----

type KevbanState = {
    issues: IIssue[],
    users: IUser[],
    lanes: ILane[],
}


type KevbanAction = {
    type: string,
    issue?: IIssue,
    user?: IUser | null,
    lane?: ILane,
}

type DispatchType = (args: KevbanAction) => KevbanAction
