import React from 'react';
import { connect } from 'react-redux';
import { getSubjectDetails, SubjectToggleStatus } from '../../../redux/actions/subjectDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


class SubjectTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleStatusChange(status, id) {
        this.props.SubjectToggleStatus(status, id, this.props.getSubjectDetails);
    }

    buttonTextBasedOnStatus(status) {
        return status? "Block" : "Unblock";
    }
    

    render() {
        if (this.props.subjects.retrived === false) {
            this.props.getSubjectDetails();
            return (<div style={{ textAlign: 'center' }} >Fetching Subjects data...</div>);
        }

        return (
            <TableContainer component={Paper} className="main">
                <h2 style={{ fontWeight: 'bold', color:'black' }} align="center" className="title">ALL SUBJECTS</h2>
                <hr/>
                <Table aria-label="subject table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.subjects.list.map((val, key) => (
                            <TableRow key={key} sx={{ '&:nth-child(even)': { backgroundColor: '#f2f2f2' } }}>
                                <TableCell align="center" sx={{ padding: 1 }}>{key + 1}</TableCell>
                                <TableCell align="center" sx={{ padding: 1 }}>{val.subject}</TableCell>

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
    subjects: state.subjects
});

export default connect(mapStateToProps, {
    getSubjectDetails,
    SubjectToggleStatus
})(SubjectTable);
