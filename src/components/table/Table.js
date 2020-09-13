import React from 'react';
import {Table,
TableContainer,
Paper,TableBody,
TableHead,TableRow,
TableCell,
makeStyles,withStyles,
Typography
} from '@material-ui/core';
import CountUp from 'react-countup';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function MyTable({data}) {
    

    //console.log(data[0].active);
    return(
    <TableContainer component={Paper}>
      <Table align="center" style={{width: 700  }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State</StyledTableCell>
            <StyledTableCell align="right">Active</StyledTableCell>
            <StyledTableCell align="right">Confirmed</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
          .filter(
              row => row.state!=='Total'
          )
          .map((row) => (
            <TableRow style={{height: 5}} key={row.state}>
              <TableCell component="th" scope="row">
                {row.state}
              </TableCell>
              <TableCell align="right">
                <Typography >
                    <CountUp
                        start={0}
                        end={row.active} 
                        duration ={1}
                        separator=","
                    />
                </Typography>
              </TableCell>
              <TableCell align="right">
              <Typography >
                    <CountUp
                        start={0}
                        end={row.confirmed}
                        duration ={1}
                        separator=","
                    />
                </Typography>
              
              </TableCell>
              <TableCell align="right">
              <Typography >
                    <CountUp
                        start={0}
                        end={row.recovered}
                        duration ={1}
                        separator=","
                    />
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography >
                    <CountUp
                        start={0}
                        end={row.deaths}
                        duration ={1}
                        separator=","
                    />
                </Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default MyTable;