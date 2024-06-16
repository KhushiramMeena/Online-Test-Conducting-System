import { connect } from "react-redux";
import React from "react";
import { getTeacherDetails, TeacherToggleStatus } from "../../../redux/actions/teacherDetails";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

class TeacherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleStatusChange(status, id) {
    this.props.TeacherToggleStatus(status, id, this.props.getTeacherDetails);
  }

  buttonTextBasedOnStatus(status) {
    return status? "Block" : "Unblock";
  }

  componentDidMount() {
    if (!this.props.teachers.retrieved) {
      this.props.getTeacherDetails();
    }
  }

  render() {
    if (this.props.teachers.retrived === false) {
      this.props.getTeacherDetails();
      return (<div style={{ textAlign: 'center' }}>Fetching Teachers data...</div>);
  }
    const { teachers } = this.props;
  
    return (
      <TableContainer component={Paper} className="main">
        <h2 className="title" style={{ fontWeight: 'bold', color:'black' }}align="center">ALL REGISTERED TEACHERS</h2>
         <hr/>
        <Table aria-label="teacher table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Name of Teacher</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Teacher Status</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.list.map((val, key) => (
              <TableRow key={key} sx={{ '&:nth-child(even)': { backgroundColor: '#f2f2f2' } }}>
                <TableCell align="center" sx={{ padding: 1 }}>{key + 1}</TableCell>
                <TableCell align="center" sx={{ padding: 1 }}>{val.name}</TableCell>
                <TableCell align="center" sx={{ padding: 1 }}>
                                {val.status? "Active" : "Inactive"}
                            </TableCell>
                <TableCell align="center" sx={{ padding: 1 }}>
                  <Button variant="outlined" color="error" onClick={() => this.handleStatusChange(val.status, val.id)}>
                    {this.buttonTextBasedOnStatus(val.status)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
}

const mapStateToProps = (state) => ({
  teachers: state.teachers,
});

export default connect(mapStateToProps, {
  getTeacherDetails,
  TeacherToggleStatus,
})(TeacherTable);
