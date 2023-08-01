import React, { ChangeEvent, useEffect, useState } from "react";
import { useStyles } from "./styles";
import { TutenTableActions } from "./Actions/TutenTableActions";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
} from "@mui/material";
// import noData from "../../assets/images/no-data-found.svg";
import { TableColHeader } from "./Header";
import i18n from "@/i18n/i18n-es.json";
import { Column } from "@/utils/interfaces/interfaces";
import Image from "next/image";

type ActionsType = (...args: any[]) => any;
// type ActionsList = ActionsType[];

interface TableProps {
  actions: ActionsType;
  getData: any;
  columns: Column[];
  elevation: number | undefined;
  fieldToActive: string;
  refresh: boolean;
  rowPage: number | null;
}

const TutenTable = (props: TableProps) => {
  const classes = useStyles();
  const [currentSorting, setCurrentSorting] = useState<string | null>(null);
  const [order, setOrder] = useState<number | null>(null);
  const [selectedID, setSelectedID] = useState(null);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);

  let {
    actions,
    getData,
    columns = [],
    elevation,
    fieldToActive,
    refresh,
    rowPage = 5,
  } = props;
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowPage || 0);
  const [searched, setSearched] = useState("");
  const [searchedSubmit] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const ops = { year: "numeric", month: "2-digit", day: "2-digit" };

  const setupData = async (
    pageData: any,
    limit: number,
    field: string | null,
    orderData: number | null,
    filter: any
  ) => {
    let res = await getData(pageData, limit, field, orderData, filter);
    try {
      const resData = res;
      setTotal(resData.total);
      setTableData(
        resData.items.map((row: any) => ({ ...row, hoverEffect: false }))
      );
      if (resData.items) setLoadingData(false);
    } catch (e) {
      if (res?.status === 403) setTotal(0);
      setLoadingData(false);
    }
  };
  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const refreshData = async () => {
    setupData(page, rowsPerPage, currentSorting, order, searched);
    setPage(page);
  };

  const handleSort = (field: string, newOrder: number) => {
    setLoadingData(true);
    let od: number | null = newOrder;
    let fi: string | null = field;

    if (field === currentSorting) {
      if (newOrder == 2) {
        od = null;
        fi = null;
      }
      setOrder(newOrder);
    } else {
      setCurrentSorting(field);
      setOrder(0);
      od = 0;
    }
    setPage(0);
    setupData(0, rowsPerPage, fi, od, null);
  };

  const handleChangePage = async (event: any, newPage: number) => {
    setLoadingData(true);
    setupData(newPage, rowsPerPage, currentSorting, order, null);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const rows = parseInt(event.target?.value, 10);
    setLoadingData(true);
    setRowsPerPage(rows);
    const resData = await getData(0, rows, currentSorting, order, searched);
    if (resData.items) setLoadingData(false);
    setTotal(resData.total);
    setTableData(resData.items);
    setPage(0);
  };

  const activeRow = (index: number, isActive: boolean) => {
    const copy = JSON.parse(JSON.stringify(tableData));
    copy[index].hoverEffect = isActive;
    setTableData(copy);
  };

  useEffect(() => {
    setLoadingData(true);
    setupData(0, rowsPerPage, currentSorting, order, null);
  }, [refresh]);

  const generateCheckBoxTable = (row: any) => {
    if (row.id) return selectedID === row.id;
  };

  const generateTableCell = (row: any) => {
    if (row[fieldToActive]) {
      return null;
    } else {
      if (!fieldToActive) return null;
      else return "classes.inactive";
    }
  };

  const generateTableCellLink = (tag: string, quantity: boolean, row: any) => {
    if (quantity) return row[tag].length;
    else return row[tag];
  };

  const generateTableRowCell = (row: any, rowIndex: number) => {
    return (
      <TableRow
        hover
        aria-checked={
          row.id ? selectedID === row.id : selectedID === row.professionalId
        }
        selected={generateCheckBoxTable(row)}
        key={`${(row.name ? row.name : "") + rowIndex + 1}`}
        className={`${classes.row}  
        ${classes.tableRow} ${classes.tableRowClick}`}
        classes={{ hover: "classes.hover" }}
      >
        {actions && (
          <TableCell className={"classes.cell"}>
            <TutenTableActions
              active={activeRow}
              index={rowIndex}
              actions={actions}
              row={row}
            />
          </TableCell>
        )}
        {columns
          .filter(({ visible = true }) => visible)
          .map((column: Column, index: number) => {
            const { tag, quantity = false } = column;
            return (
              <TableCell
                key={index}
                className={`${"classes.cell"} ${generateTableCell(row)}`}
                style={{
                  color: "rgba(0, 0, 0, 0.87)",
                }}
              >
                {generateTableCellLink(tag, quantity, row)}
              </TableCell>
            );
          })}
      </TableRow>
    );
  };

  return (
    <Paper elevation={elevation}>
      <TableContainer
        id="contenedor"
        onContextMenu={(e) => e.preventDefault()}
        className={`${classes.containerTable}`}
      >
        <Table className={"classes.table"} aria-label="tuten table">
          <TableHead>
            <TableRow classes={{ hover: "classes.hover" }}>
              {!!actions && (
                <TableCell
                  style={{
                    width: 45,
                  }}
                  className={"classes.cellHeader"}
                />
              )}
              {columns
                .filter(({ visible = true }) => visible)
                .map((column: Column, index: number) => {
                  const { text, sort = false, tag, width } = column;
                  return (
                    <TableColHeader
                      key={index}
                      sort={sort}
                      text={text}
                      field={tag}
                      orderBy={currentSorting}
                      order={order}
                      width={width}
                      handleSort={handleSort}
                    />
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loadingData &&
              tableData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {generateTableRowCell(row, rowIndex)}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
        {loadingData && (
          <div className={"classes.containerLoading"}>
            <CircularProgress className={"classes.root"} />
            <p>{i18n.loading}</p>
          </div>
        )}
      </TableContainer>
      {tableData.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
          labelRowsPerPage={i18n.labelRowPerPage}
          count={total}
          page={page}
        />
      )}

      {!loadingData && tableData.length === 0 && (
        <div style={{ textAlign: "center" }}>
          {/* <Image
              className={"classes.noData"}
              src={"noData"}
              alt=""
              width={40}
              height={10}
            /> */}
          <Typography className={"classes.noDataText"}>
            {i18n.labelNoData}
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export { TutenTable };
