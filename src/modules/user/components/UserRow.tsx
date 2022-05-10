import { Button, TableCell, TableRow } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useCallback } from "react";
import IUser from "../../../domains/user";

interface IUserRow {
  row: IUser;
  destroy(id: string): unknown;
  edit(id: IUser): unknown;
}

export default function UserRow({ row, destroy, edit }: IUserRow) {
  const { id, name, rocket, timestamp, twitter } = row;
  const destroyThis = useCallback(() => {
    destroy(id);
  }, [destroy, id]);
  const editThis = useCallback(() => {
    edit(row);
  }, [edit, row]);

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{rocket}</TableCell>
      <TableCell>{twitter}</TableCell>
      <TableCell>{new Date(timestamp).toLocaleString()}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" onClick={editThis}>
          <Edit />
        </Button>
        &nbsp;
        <Button variant="outlined" color="secondary" onClick={destroyThis}>
          <Delete />
        </Button>
      </TableCell>
    </TableRow>
  );
}
