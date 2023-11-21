/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

type Props = {
  heads: string[];
  rows: (string | number)[][];
  handleEdit: (value: string | number) => void;
  handleDelete: (value: string | number) => void;
};

export const TableComponent = ({ heads, rows, handleEdit, handleDelete }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table" >
            <TableHead>
              <TableRow>
                {heads.map((head, index) => (
                  <StyledTableCell align="center" key={index}> {head} </StyledTableCell>
                ))}
                <StyledTableCell align="center" >{t('options')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex} >
                  {row.map((cell, cellIndex) => (
                    <StyledTableCell align="center" key={cellIndex}>{cell}</StyledTableCell>  
                  ))}
                  <StyledTableCell align="center" key="actionItemColumn">
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button onClick = {() => handleEdit(row[0])}> <EditIcon /> </Button>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button onClick = {() => handleDelete(rowIndex+1)}> <DeleteIcon color="error" /> </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
