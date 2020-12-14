import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { Button, Card, Collapse, Menu, Popover } from "@blueprintjs/core";


type Props = {
    issue: IIssue,
    deleteIssue: (issue: IIssue) => void,
    assignUser: (issue: IIssue, user: null | IUser) => void,
}


export const Issue: React.FC<Props> = ({issue, deleteIssue, assignUser}) => {
    const dispatch: Dispatch<any> = useDispatch()
    const [expanded, setExpanded] = React.useState(false)
    const users: readonly IUser[] = useSelector(
        (state: KevbanState) => state.users,
        shallowEqual
    )
    const assignUserDispatch = React.useCallback(
        (issue: IIssue, user: null | IUser) => dispatch(assignUser(issue, user)),
        [dispatch, assignUser]
    )

    const menuItem = (user: IUser | null) => {
        return <Menu.Item
            text={user === null ? <i>Unassign</i> : user.name}
            onClick={() => assignUserDispatch(issue, user)}
        />
    }

    const userMenuItems = [
        menuItem(null)
    ].concat(
        users.map((user: IUser) => (menuItem(user)))
    )

    const assigneeArea = (
        <Popover>
            <p>👤: {issue.assignee_name ? issue.assignee_name : <i>Unassigned</i>}</p>
            <Menu>
                {userMenuItems}
            </Menu>
        </Popover>
    )

    return <div>
        <Card interactive={false}>
            <Button onClick={() => setExpanded(!expanded)}>
                <h4>{issue.title}</h4>
            </Button>
            <Collapse isOpen={expanded}>
                <p>{issue.body}</p>
            </Collapse>
            {assigneeArea}
            <p>{issue.userLoading}</p>
        </Card>
    </div>
}
