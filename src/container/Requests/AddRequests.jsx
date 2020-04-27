import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { addRequestAction } from '../../redux/actions/requests';

class AddRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
                itemName: '',
                quantity: '',
                urgency: '',
                urgencyOptions : [
                    {
                        id: 1,
                        value: 'In a Month'
                    },
                    {
                        id: 2,
                        value: 'In a few Weeks'
                    },
                    {
                        id: 3,
                        value: 'In a few days'
                    },
                    {
                        id: 4,
                        value: 'Urgently'
                    }
                ]
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
       
    }

    onSubmit = () => {
        this.props.addRequest({
            requested_item: this.state.itemName,
            requested_quantity: this.state.quantity,
            requested_urgency: this.state.urgency || this.state.urgencyOptions[0].value,
            userId: this.props.userId,
            areaId: this.props.areaId
        });

        this.props.onHideAddRequestModal();
    };

    render() {
        return (
            <Modal show = {this.props.showAddRequestModal} onHide = {this.props.onHideAddRequestModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item Requests</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className = "form-group"> 
                        <ul className="list-group">
                            <li className="list-group-item">
                                        <div className="row" >
                                            <label htmlFor="itemname" >Item Name</label>
                                            <input type="text" className="form-control" value={this.state.itemName}
                                                name="itemName" onChange={this.handleChange} />
                                            <label htmlFor="itemqty" >Quantity</label>
                                            <input type="text" className="form-control" value={this.state.quantity}
                                                name="quantity" onChange={this.handleChange} />
                                              <label htmlFor="itemurgency">Urgency</label>
                                            <select id="itemurgency" className="form-control" name="urgency" 
                                            placeholder="Select a urgency" onChange={this.handleChange}>
                                                {this.state.urgencyOptions.map(option => (
                                                    <option value={option.value} key={option.id} >
                                                        {option.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                </li>
                                </ul>
                                <p></p>
                                 <button className ="btn btn-primary" onClick={this.onSubmit}>
                                    Submit
                                </button>
                                <button style={{'margin-left': '10px'}} variant="secondary" className="btn btn-secondary" onClick={this.props.onHideAddRequestModal}>
                                    Cancel
                                </button>
                         </div> 
                   
                </Modal.Body>
           
               
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.user.userId,
    areaId: state.user.areaId
});

const mapDispatchToProps = (dispatch) => ({
    addRequest: (data) => dispatch(addRequestAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRequests);