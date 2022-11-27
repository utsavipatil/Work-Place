import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function CommonTable({
  data, //array of objects,
  coloumnName, //array of objects with title & key
  handleClick,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {coloumnName.map((item) => {
              return (
                <StyledTableCell align="center">{item.title}</StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow
              sx={{
                opacity: row["status"] === "approved" ? "0.4" : 1,
                pointerEvents: row["status"] === "approved" ? "none" : "unset",
              }}
              key={i}
            >
              {coloumnName.map((item) => {
                if (item.key === "buttons") {
                  return (
                    <div>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ marginRight: "20px" }}
                        onClick={() => handleClick("accept", row)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleClick("reject", row)}
                      >
                        Reject
                      </Button>
                    </div>
                  );
                } else {
                  return (
                    <StyledTableCell align="center">
                      {" "}
                      {row[item.key]}{" "}
                    </StyledTableCell>
                  );
                }

                //item.key => title, location ,status
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommonTable;
