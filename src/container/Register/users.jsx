import React,{Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import {addUser} from '../actions/add';
import {editUser} from '../actions/edit';
import {updateUser} from '../actions/update';
import {deleteUser} from '../actions/delete';
import './node_modules/bootstrap/dist/css/bootstrap.min.css';

class User extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="form-group">
                List
                <table border="1" class="table">
                    <thead>
                        <tr>
                            <td>
                                ID
                            </td>
                            <td>
                                First Name
                            </td>
                            <td>
                                Last Name
                            </td>
                            <td>
                                Address
                            </td>
                            <td>
                                City
                            </td>
                            <td>
                                Pin Code
                            </td>
                            <td>
                                Phone Number
                            </td>
                            <td>
                                Email
                            </td>
                            <td>
                                Car
                            </td>
                            <td>
                                User Type
                            </td>
                            <td>
                                Action
                            </td>
                        </tr>
                    </thead>
                    {
                        this.props.users.map((cur)=>{
                            return(
                                <tbody>
                                    <tr>
                                        <td>
                                            {cur.id}
                                        </td>
                                        <td>
                                            {cur.fname}
                                        </td>
                                        <td>
                                            {cur.lname}
                                        </td>
                                        <td>
                                            {cur.address}
                                        </td>
                                        <td>
                                            {cur.city}
                                        </td>
                                        <td>
                                            {cur.pc}
                                        </td>
                                        <td>
                                            {cur.ph}
                                        </td>
                                        <td>
                                            {cur.email}
                                        </td>
                                        <td>
                                            {cur.car}
                                        </td>
                                        <td>
                                            {cur.userType}
                                        </td>
                                        <td>
                                            <div class="form-group">
                                                <input type="submit" name="btnEdit" value="Edit" 
                                                onClick={() => this.props.editEmp(cur)} />
                                                <input type="submit" name="btnDelete" value="Delete"    
                                                onClick={() => this.props.deleteEmp(cur.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    }
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    users: state.users
  })
  
  const mapDispatchToProps = (dispatch) => ({
    deleteEmp : (id) => dispatch(deleteUser(id)),
    editEmp : (emp) => dispatch(editUser(emp))
  })
  User.defaultProps={
    users:[]
}

export default connect(mapStateToProps, mapDispatchToProps)(User);