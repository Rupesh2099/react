/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const styles = (theme: Theme) =>
  createStyles({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  });

class MuiVirtualizedTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        cellContentRenderer: PropTypes.func,
        dataKey: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
      }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func,
  };

  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }: { index: number }) => {
    const {
      classes,
      rowClassName,
      onRowClick,
    } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={clsx(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const data: Array<[string, number, number, number, number]> = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

interface DataRow {
  id: number;
  dessert: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

function createData(
  id: number,
  dessert: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): DataRow {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows: DataRow[] = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)];
  rows.push(createData(i, ...randomSelection));
}

function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }: { index: number }) => rows[index]}
        onRowClick={(event: Event) => console.log(event)}
        columns={[
          {
            width: 200,
            flexGrow: 1.0,
            label: 'Dessert',
            dataKey: 'dessert',
          },
          {
            width: 120,
            label: 'Calories (g)',
            dataKey: 'calories',
            numeric: true,
          },
          {
            width: 120,
            label: 'Fat (g)',
            dataKey: 'fat',
            numeric: true,
          },
          {
            width: 120,
            label: 'Carbs (g)',
            dataKey: 'carbs',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein (g)',
            dataKey: 'protein',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;
