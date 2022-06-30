import { Button, TableCell, TableRow } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useCallback } from "react";
import IAdmin from "../../../domains/admin";

interface IAdminRow {
  admin: IAdmin;
  destroy(id: string): unknown;
  edit(id: IAdmin): unknown;
}

export default function AdminRow({ admin, destroy, edit }: IAdminRow) {
  const { id, email, lastUpdated, name } = admin;
  const destroyThis = useCallback(() => {
    destroy(id);
  }, [destroy, id]);
  const editThis = useCallback(() => {
    edit(admin);
  }, [edit, admin]);

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{lastUpdated.toLocaleString()}</TableCell>
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
