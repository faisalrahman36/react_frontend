import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
/*
const [toWalletAddress,setToWalletAddress]=useState('');
const [oderDescription,setOrderDescription]=useState('');
const [amount,setAmount]=useState(0);
const [transactionType,setTransactionType]=useState('');
const [transactionMessage,setTransactionMessage]=useState('');
*/

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toWalletAddress: '',
      orderDescription:'',
      amount:0,
      transactionType:'',
      transactionMessage:'',
      scheduledDateTime:'',
      txnHistory:[],
      sTxnHistory:[],
      userInfo:[],
    };
  }

  //transaction
   transaction() {
    const { user } = this.props.auth;
    console.log(user);
    console.log('here email',user.email);

    // Simple POST request with a JSON body using axios
    const tx = { 
      email:user.email,
      amount:this.state.amount,
      currency: user.currency,
      walletAddress: user.walletAddress,
      toWalletAddress:this.state.toWalletAddress,
      orderDescription:this.state.orderDescription,
      transactionType:this.state.transactionType

     
      };
    axios.post('http://localhost:5000/transaction/'+user.id, tx).
    then((res) => {
      console.log(res.data);
      this.setState({transactionMessage:res.data})
  }).catch((error) => {
      console.log(error)
  });
  };
  
  //scheduled transaction

  scheduledTransaction() {
    const { user } = this.props.auth;
    console.log(user);
    console.log('here email',user.email);

    // Simple POST request with a JSON body using axios
    const tx = { 
      email:user.email,
      amount:this.state.amount,
      currency: user.currency,
      walletAddress: user.walletAddress,
      toWalletAddress:this.state.toWalletAddress,
      orderDescription:this.state.orderDescription,
      transactionType:this.state.transactionType,
      scheduledDateTime :this.state.scheduledDateTime
     
      };
    axios.post('http://localhost:5000/scheduledTransaction/'+user.id, tx).
    then((res) => {
      console.log(res.data);
      this.setState({transactionMessage:res.data})
  }).catch((error) => {
      console.log(error)
  });
  };
  
  //show transactions
  showTransactions() {
    const { user } = this.props.auth;
    console.log(user);
    console.log('showTransactions');
    axios.get(`/showTransactions/`+user.walletAddress)
      .then(res => {
        const txnHistory = JSON.stringify(res.data);
        console.log('txnHistory update',txnHistory)
        this.setState({ txnHistory:txnHistory  });
      })
  }  


  //show scheduled transactions
  showScheduledTransactions() {
    const { user } = this.props.auth;
    console.log(user);
    console.log('showScheduledTransactions');
    axios.get(`/showScheduledTransactions/`+user.walletAddress)
      .then(res => {
        const sTxnHistory = JSON.stringify(res.data);
        console.log('txnHistory update',sTxnHistory)
        this.setState({ sTxnHistory:sTxnHistory  });
      })
  }  


  //show user info
  showUserInfo() {
    const { user } = this.props.auth;
    console.log(user);
    console.log('showUserInfo');
    axios.get(`/user/`+user.id)
      .then(res => {
        const userInfo = JSON.stringify(res.data);
        console.log('txnHistory update',userInfo)
        this.setState({ userInfo:userInfo  });
      })
  }  

  //---------------
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    
    const { user } = this.props.auth;
    console.log(user);
    console.log('here email',user.email);
    return (
      <div>
        <h2>Demo page for transaction, schedule transaction and view transaction history</h2>
        <h3>Transactions</h3>
        
               <input
                  onChange={(e) => this.setState({toWalletAddress:e.target.value})}
                  id="to"
                  type="text"
                  placeholder="To Wallet Address"
                  
                />
                <label>To walletAddress</label>

        
                <input
                  onChange={(e) => this.setState({amount:e.target.value})}
                  id="amount"
                  type="number"
                  placeholder="0.00"
                />
                <label> Amount</label>

                <input
                  onChange={(e) => this.setState({transactionType:e.target.value})}
                  id="transactionType"
                  type="text"
                  placeholder="Transaction Type"
                  
                />
                <label>Transaction Type</label>

                <input
                  onChange={(e) => this.setState({orderDescription:e.target.value})}
                  id="orderDescription"
                  type="text"
                  placeholder="Order Description"
                  
                />
                <label>Order Description</label>
                <br/>
                <button onClick={() => this.transaction()}>Transfer amount</button>
                <br/>


              <label><b>{this.state.transactionMessage}</b></label>
            <br/>
            <br/>
            <h3>Additional info for scheduled transactions</h3>
            <input
                  onChange={(e) => this.setState({scheduledDateTime:e.target.value})}
                  id="scheduledDatedTime"
                  type="text"
                  placeholder="yyyy-mm-dd"
                  
                />
                <label>Scheduled Date</label>
                <br/>
                <br/>
                <button onClick={() => this.scheduledTransaction()}>Scheduled transfer amount</button>
                <br/>


                <label> View Transaction History</label>
                <br/>
                <br/>
                <button onClick={() => this.showTransactions()}>Show transaction history</button>
                <br/>
                {this.state.txnHistory}
                <br/>


                <br/>


              <label> View Scheduled Transaction History</label>
              <br/>
              <br/>
              <button onClick={() => this.showScheduledTransactions()}>Show scheduled transaction history</button>
              <br/>
              {this.state.sTxnHistory}
              <br/>

              <label> View User info</label>
              <br/>
              <br/>
              <button onClick={() => this.showUserInfo()}>Show user info</button>
              <br/>
              {this.state.userInfo}
              <br/>
              
                     <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into demo walletapp 👏
              </p>
            </h4>
            <br/>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};const mapStateToProps = state => ({
  auth: state.auth
});export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);