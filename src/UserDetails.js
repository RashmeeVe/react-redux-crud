import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import store from "./store";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import * as actions from "./actionTypes";
import { withStyles } from "@material-ui/styles";

const styles = {
  UserDetailsTable: {
    width: "100%",
    textAlign: "center",
  },

  UserDetailsTableHead: {
    backgroundColor: "black",

    "& th": {
      color: "white",
      fontWeight: "bold",
    },
  },

  UserDetailsTable_empty: {
    align: "center",
  },

  UserDetailsRows: {
    padding: "10px",

    "&:hover": {
      background: "#efefef",
      cursor: "pointer",
    },
  },
};

const UserDetails = (props) => {
  const { users } = props;
  const { classes } = props;

  const deleteUser = (id) => {
    store.dispatch({
      type: actions.REMOVE_USER,
      payload: {
        id: id,
      },
    });
  };

  return (
    <Table className={classes.UserDetailsTable}>
      <TableHead className={classes.UserDetailsTableHead}>
        <TableRow>
          <TableCell>Employee Code</TableCell>
          <TableCell>Employee Name</TableCell>
          <TableCell>Employee Age</TableCell>
          <TableCell>Employee Profession</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => {
          return (
            <TableRow key={user.id} className={classes.UserDetailsRows}>
              <TableCell>{user.empCode}</TableCell>
              <TableCell>{user.empName}</TableCell>
              <TableCell>{user.empAge}</TableCell>
              <TableCell>{user.empProfession}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton
                    aria-label="edit"
                    onClick={() => props.editUser(index)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteUser(user.id)}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state,
  };
};
export default withStyles(styles)(connect(mapStateToProps)(UserDetails));
