import { withStyles} from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from '../../basic/Homepage/main.png'
import { MainCard } from "../Card/card";
import TeacherImg from '../teacher.png';
import StudentImg from '../student.jfif';
import SubjectImg from '../subject.jfif';
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = (theme)=>({
  logout_btn : {
    marginLeft : '80%'
  },
  headerMargin : {
    marginTop : 80
  },
  inlineblock : {
    display : 'inline-block'
  },
  linkbtn : {
    color:'black'
  }
})

class DashboardMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.expand = "none"
  }

  logout(obj) {
    obj.props.logoutUser();
    obj.forceUpdate();
  }

  handleTableExapand(type) {
    console.log("handle table")
    if(type === this.expand) {
      this.expand = "none"
    } else {
      this.expand = type
    }
    this.forceUpdate();
  }

  render(){
    console.log(this.props.user);
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>);
    } else {
      if(!this.props.dashboardDetails.retrived){
        this.props.getDashboardCount();
      }
      let x;
      if(this.expand === "Teacher") {
        x = <TeacherTable/>;
      } else if (this.expand === "Student") {
        x = <StudentTable/>;
      } else if (this.expand === "Subject") {
        x = <SubjectTable/>;
      }
        return (
          <div>
            <HomepageHeader title='Admin Dashboard' img={logoImg}/>
            <div className={this.props.classes.headerMargin}></div>
            <Button variant="contained" onClick={()=>(this.logout(this))} className={this.props.classes.logout_btn} >Logout</Button>
            <br/>


            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid item xs={4}>
          <Item>

          <MainCard title='Teacher'  value={this.props.dashboardDetails.teacherActive} total={this.props.dashboardDetails.teacherActive + this.props.dashboardDetails.teacherBlocked}  image={TeacherImg} />
            <div className={this.props.classes.inlineblock}>
              <Button variant="contained" ><Link to="/addTeacher" className={this.props.classes.linkbtn}>Add Teacher</Link></Button>
              <br/><br/>
              <Button variant="contained" onClick={()=>(this.handleTableExapand("Teacher"))}>Show Data</Button>
            </div>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
          <MainCard title='Student' value={this.props.dashboardDetails.studentActive} total={this.props.dashboardDetails.studentActive + this.props.dashboardDetails.studentBlocked} image={StudentImg} />
          <Button variant="contained"onClick={()=>(this.handleTableExapand("Student"))}>See Data</Button>
          </Item>
        </Grid>
          
           <Grid item xs={4}>
          <Item>
          <MainCard title='Subject' value={this.props.dashboardDetails.subjectActive} total={this.props.dashboardDetails.subjectActive + this.props.dashboardDetails.subjectBlocked} image={SubjectImg} />
            <div className={this.props.classes.inlineblock}>
              <Button variant="contained" ><Link to="/addSubject" className={this.props.classes.linkbtn}>Add Subject</Link></Button>
              <br/><br/>
              <Button variant="contained" onClick={()=>(this.handleTableExapand("Subject"))}>See Data</Button>
            </div>

          </Item>
        </Grid>
      </Grid>
    </Box>



            <hr/>
            <br/>

            {x}


          </div>
        );

    }
    
  }
}

const mapStateToProps = state => ({
  user:state.user,
  dashboardDetails:state.dashboardDetails
});

export default withStyles(useStyles)(connect(mapStateToProps,{
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain));
