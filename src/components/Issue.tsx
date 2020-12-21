import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { Alert, Button, Card, Classes, Collapse, Icon, Menu, Popover } from "@blueprintjs/core";


type Props = {
    issue: IIssue,
    service: IService,
}


export const Issue: React.FC<Props> = ({issue, service}) => {
    const dispatch: Dispatch<any> = useDispatch()
    const [expanded, setExpanded] = React.useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    const users: readonly IUser[] = useSelector(
        (state: KevbanState) => state.users,
        shallowEqual
    )
    const lanes: readonly ILane[] = useSelector(
        (state: KevbanState) => state.lanes,
        shallowEqual
    )
    const assignUserDispatch = React.useCallback(
        (issue: IIssue, user: IUser | null) => dispatch(service.assignUser(issue, user)),
        [dispatch, service.assignUser]
    )
    const moveIssueDispatch = React.useCallback(
        (issue: IIssue, lane: ILane) => dispatch(service.moveIssue(issue, lane)),
        [dispatch, service.moveIssue]
    )
    const deleteIssueDispatch = React.useCallback(
        (issue: IIssue) => dispatch(service.deleteIssue(issue)),
        [dispatch, service.deleteIssue]
    )

    const menuItem = (user: null | IUser) => (
        <Menu.Item
            text={user === null ? <i>Unassign</i> : user.name}
            onClick={() => assignUserDispatch(issue, user)}
        />
    )

    const userMenuItems = [
        menuItem(null)
    ].concat(
        users.map((user: IUser) => (menuItem(user)))
    )

    const assigneeArea = (
        <Popover>
            <Button
                icon={issue.userLoading ? "cloud-upload" : "user"}
                rightIcon="caret-down"
                disabled={issue.userLoading}
            >
                {issue.assigneeName === null ? <i>Unassigned</i> : issue.assigneeName}
            </Button>
            <Menu>
                {userMenuItems}
            </Menu>
        </Popover>
    )

    const moveItem = (lane: ILane) => (
        <Menu.Item
            text={lane.name}
            onClick={() => moveIssueDispatch(issue, lane)}
        />
    )

    const laneArea = (
        <Popover>
            <Button
                text="Move"
                icon={issue.issueLoading ? "cloud-upload" : "arrow-right"}
                rightIcon="caret-down"
                disabled={issue.issueLoading}
            />
            <Menu>
                {lanes.map((lane: ILane) => moveItem(lane))}
            </Menu>
        </Popover>
    )

    const deleteOk = () => {
        deleteIssueDispatch(issue)
        setDeleteDialogOpen(false)
    }

    const deleteCancel = () => {
        setDeleteDialogOpen(false)
    }

    const deleteArea = (
        <div>
            <Button
                icon="trash"
                onClick={() => setDeleteDialogOpen(true)}
            />
            <Alert
                icon="trash"
                cancelButtonText="Cancel"
                confirmButtonText="Delete Issue"
                onCancel={deleteCancel}
                onConfirm={deleteOk}
                isOpen={deleteDialogOpen}
            >
                <p>Delete issue '{issue.title}'?</p>
            </Alert>
        </div>
    )

    return <div>
        <Card
            interactive={false}
        >
            <Button minimal={true} onClick={() => setExpanded(!expanded)}>
                <h4>{issue.title}</h4>
            </Button>
            <Collapse isOpen={expanded}>
                <p>{issue.body}</p>
            </Collapse>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                {assigneeArea}
                {laneArea}
                {deleteArea}
            </div>
        </Card>
    </div>
}
