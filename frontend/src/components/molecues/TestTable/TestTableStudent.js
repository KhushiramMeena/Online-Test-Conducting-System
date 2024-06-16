import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
// import { TableBody, TableCell, TableRow, Table, TableHead, TableContainer, Paper, Button } from "@material-ui/core";
import { studentTestRegister } from "../../../redux1/actions/studentTestAction";
import { getDatePretty, getTimePretty } from "../../../helper/common";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const useStyles = (theme)=> ({
  tableBorder:{
    background:'#e7e7e7',
    padding:'15px'
  },
  tableHeader:{
    background:'#3f51b5',
    color:'white'
  }
})

class TestTableStudent extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  onTestClick(event,id) {
    console.log(id);
  }

  onTestRegister(event,id) {
    this.props.studentTestRegister({testid:id});
  }


  render() {
    
    return(<div className={this.props.classes.tableBorder}>
      <TableContainer component={Paper} className='main'>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Test Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Status</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Max<br/>marks</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Duration</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Registration start</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Registration end</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Test start</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Test end</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Result</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Register</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.props.testlist.map((test,index)=>(
              <TableRow key={index}>
                <TableCell>{test.title}</TableCell>
                <TableCell style={{textTransform:'lowercase'}}>{test.status}</TableCell>
                <TableCell>{test.maxmarks}</TableCell>
                <TableCell>{getTimePretty(test.duration)}</TableCell>
                <TableCell>{getDatePretty(test.regStartTime)}</TableCell>
                <TableCell>{getDatePretty(test.regEndTime)}</TableCell>
                <TableCell>{getDatePretty(test.startTime)}</TableCell>
                <TableCell>{getDatePretty(test.endTime)}</TableCell>
                <TableCell>{getDatePretty(test.resultTime)}</TableCell>
                <TableCell>
  {test.isRegistered === false ? (
    test.status === 'Registration Started' ? (
      <Button
        variant="contained"
        onClick={(event) => this.onTestRegister(event, test._id)}
      >
        Register
      </Button>
    ) : (
      <span style={{ fontWeight: 'bold', color: 'red' }}>Not Registered</span>
    )
  ) : (
    <span style={{ fontWeight: 'bold', color: 'green' }}>Registered</span>
  )}
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
    </div>)
  }
}

const mapStatetoProps = state => ({
  testlist : state.testDetails.list
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  studentTestRegister
})(TestTableStudent));
