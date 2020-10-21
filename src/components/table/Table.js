import React from 'react';
import {Table,
TableContainer,
Paper,TableBody,
TableHead,TableRow,
TableCell,createMuiTheme,
makeStyles,withStyles,ThemeProvider,
Typography
} from '@material-ui/core';
import CountUp from 'react-countup';
import "./Table.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
    width:50
  },
  body: {
    fontSize: 14,
    width:1
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      
      
    },
  },


}))(TableRow);

const useStyles = makeStyles({
  table: {
    height:700,
    overflow :'auto'
    
    
    
    
  },
});


function MyTable({data}) {
    
    const classes = useStyles();
    //console.log(data);
    return(
      <div className="table" >
    <ThemeProvider  >
    <TableContainer className={classes.table} component={Paper}>
      <Table   aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>State</StyledTableCell>
            <StyledTableCell align="right">Active</StyledTableCell>
            <StyledTableCell align="right">Confirmed</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data
          .filter(
              row => row.state!=='Total'
          )
          .map((row) => (
            <StyledTableRow style={{height: 1}} key={row.state}>
              <StyledTableCell component="th" scope="row">
                {row.state}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography >
                    <CountUp
                        start={0}
                        end={row.active} 
                        duration ={1}
                        separator=","
                    />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Typography >
                    <CountUp
                        start={0}
                        end={row.confirmed}
                        duration ={1}
                        separator=","
                    />
                </Typography>
              
              </StyledTableCell>
              <StyledTableCell align="right">
              <Typography >
                    <CountUp
                        start={0}
                        end={row.recovered}
                        duration ={1}
                        separator=","
                    />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography >
                    <CountUp
                        start={0}
                        end={row.deaths}
                        duration ={1}
                        separator=","
                    />
                </Typography>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
    </div>
    
    )
}

export default MyTable;