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

    const userMenuItems = [
        <Menu.Item text={<i>Unassign</i>} onClick={() => assignUser(issue, null)}/>
    ].concat(
        users.map(
            (user: IUser) => (
                <Menu.Item text={user.name} onClick={() => assignUser(issue, user)}/>
            )
        )
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
