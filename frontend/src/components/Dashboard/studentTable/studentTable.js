import React from 'react';
import { connect } from 'react-redux';
import { getStudentDetails, StudentToggleStatus } from '../../../redux/actions/studentDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

class StudentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleStatusChange(status, id) {
        this.props.StudentToggleStatus(status, id, this.props.getStudentDetails);
    }

    buttonTextBasedOnStatus(status) {
        return status? "Block" : "Unblock";
    }

    render() {
        if (this.props.students.retrived === false) {
            this.props.getStudentDetails();
            return (<div style={{ textAlign: 'center' }} >Fetching Students data...</div>);
        }

        return (
            <TableContainer component={Paper} className="main">
                <h2 style={{ fontWeight: 'bold', color:'black' }} align="center" className="title">ALL REGISTERED STUDENTS</h2>
                <hr/>
                <Table aria-label="student table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.students.list.map((val, key) => (
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

const mapStateToProps = state => ({
    students: state.students
});

export default connect(mapStateToProps, {
    getStudentDetails,
    StudentToggleStatus
})(StudentTable);
