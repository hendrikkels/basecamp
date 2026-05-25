"use client";

import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th as PrimitiveTh, Td as PrimitiveTd } from "@/components/primitives";
import styles from "./DataTable.module.css";

/* ----- DataTable (wrapper) ----- */
export interface DataTableProps {
  children: React.ReactNode;
  className?: string;
}

function DataTableRoot({ children, className }: DataTableProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ");
  return (
    <Box className={classes}>
      <Table className={styles.table}>{children}</Table>
    </Box>
  );
}
DataTableRoot.displayName = "DataTable";

/* ----- DataTable.Head ----- */
export interface DataTableHeadProps {
  children: React.ReactNode;
}

function DataTableHead({ children }: DataTableHeadProps) {
  return <Thead>{children}</Thead>;
}
DataTableHead.displayName = "DataTable.Head";

/* ----- DataTable.Body ----- */
export interface DataTableBodyProps {
  children: React.ReactNode;
}

function DataTableBody({ children }: DataTableBodyProps) {
  return <Tbody>{children}</Tbody>;
}
DataTableBody.displayName = "DataTable.Body";

/* ----- DataTable.Row ----- */
export interface DataTableRowProps {
  selected?: boolean;
  children: React.ReactNode;
  className?: string;
}

function DataTableRow({ selected = false, children, className }: DataTableRowProps) {
  const classes = [styles.row, selected ? styles.rowSelected : undefined, className]
    .filter(Boolean)
    .join(" ");
  return <Tr className={classes}>{children}</Tr>;
}
DataTableRow.displayName = "DataTable.Row";

/* ----- DataTable.Th ----- */
export interface DataTableThProps {
  numeric?: boolean;
  children: React.ReactNode;
  className?: string;
}

function DataTableTh({ numeric = false, children, className }: DataTableThProps) {
  const classes = [styles.th, numeric ? styles.numeric : undefined, className]
    .filter(Boolean)
    .join(" ");
  return <PrimitiveTh className={classes}>{children}</PrimitiveTh>;
}
DataTableTh.displayName = "DataTable.Th";

/* ----- DataTable.Td ----- */
export interface DataTableTdProps {
  numeric?: boolean;
  children: React.ReactNode;
  className?: string;
}

function DataTableTd({ numeric = false, children, className }: DataTableTdProps) {
  const classes = [styles.td, numeric ? styles.numeric : undefined, className]
    .filter(Boolean)
    .join(" ");
  return <PrimitiveTd className={classes}>{children}</PrimitiveTd>;
}
DataTableTd.displayName = "DataTable.Td";

/* ----- Compose ----- */
export const DataTable = Object.assign(DataTableRoot, {
  Head: DataTableHead,
  Body: DataTableBody,
  Row: DataTableRow,
  Th: DataTableTh,
  Td: DataTableTd,
});
