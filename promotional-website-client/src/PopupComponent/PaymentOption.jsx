import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import UpiIcon from '@mui/icons-material/AccountBalanceWallet';
import CashIcon from '@mui/icons-material/LocalAtm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PopupStyle.css';

export default function PaymentOption({ handleBack, data }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [buyerUpiID, setBuyerUpiID] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const courseCost = data.cost;
  const navigate = useNavigate();

  const upiID = 'pavishk2005@oksbi'; // Your UPI ID

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (!paymentMethod) {
      setErrorMessage('Please select a payment method');
      return;
    }

    if (paymentMethod === 'UPI') {
      if (!buyerUpiID) {
        setErrorMessage('Please enter your UPI ID');
        return;
      }
      handleUPIPayment();
    } else if (paymentMethod === 'Cash') {
      handleCashPayment();
    }
  };

  const handleUPIPayment = () => {
    setLoading(true); // Show loading spinner
    const upiDeepLink = `upi://pay?pa=${upiID}&pn=Course%20Booking&am=${courseCost}&cu=INR&tn=Course%20Enrollment`;

    if (isMobile()) {
      window.location.href = upiDeepLink;
    } else {
      setOpenConfirmation(true);
      saveEnrollment('UPI', courseCost);
      setIsPaid(true);
    }
    setLoading(false); // Hide loading spinner after operation
  };

  const handleCashPayment = () => {
    setLoading(true); // Show loading spinner
    saveEnrollment('Cash', courseCost);
    setOpenConfirmation(true);
    setLoading(false); // Hide loading spinner after operation
  };

  const courseIncrementCount=async(courseId)=>{
    try{
      const res=await axios.put(`http://localhost:8080/courses/enrolled-course-count-increment/${courseId}`);
      console.log(res.data);
    }
    catch(err){
      console.log(err.response);    
    }
  }

  const saveEnrollment = async (paymentType, amount) => {
    const username = JSON.parse(localStorage.getItem('userData')).data.name;
    try {
      await axios.post("http://localhost:8080/courses/add-booked-course", {
        name: username,
        coursename: data?.name,
        imgsrc: data?.coursesrc,
        coursecost: amount,
        paymenttype: paymentType,
      });

      await courseIncrementCount(data._id);
    } catch (err) {
      console.error('Error enrolling:', err);
      setErrorMessage('Error occurred while saving enrollment.');
    }
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
    navigate('/course');
  };

  const isMobile = () => window.innerWidth <= 768;

  return (
    <>
      {/* Loading Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box className="payment-container">
        <Paper className="payment-paper">
          <Typography variant="h4" className="payment-title">
            Choose Payment Method
          </Typography>
          <Typography variant="subtitle1" className="payment-subtitle">
            Select your preferred payment method to proceed.
          </Typography>

          <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  className={`payment-option ${paymentMethod === 'UPI' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('UPI')}
                >
                  <FormControlLabel
                    value="UPI"
                    control={<Radio />}
                    label={<Typography variant="h6" className="payment-label">UPI Payment</Typography>}
                  />
                  <UpiIcon className="payment-icon" />
                  <Typography variant="body1" className="payment-description">
                    Pay via Google Pay using our UPI ID: <strong>{upiID}</strong>
                  </Typography>
                  {paymentMethod === 'UPI' && (
                    <TextField
                      label="Enter Your UPI ID"
                      variant="outlined"
                      fullWidth
                      value={buyerUpiID}
                      onChange={(e) => setBuyerUpiID(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  className={`payment-option ${paymentMethod === 'Cash' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('Cash')}
                >
                  <FormControlLabel
                    value="Cash"
                    control={<Radio />}
                    label={<Typography variant="h6" className="payment-label">Cash Payment</Typography>}
                  />
                  <CashIcon className="payment-icon" />
                  <Typography variant="body1" className="payment-description">
                    Pay cash directly at the training center after the free trial ends.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </RadioGroup>

          <Divider sx={{ my: 2 }} />

          {!isMobile() && paymentMethod === 'UPI' && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <QRCode value={`upi://pay?pa=${upiID}&pn=Course Booking&am=${courseCost}&cu=INR&tn=Course Enrollment`} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Scan to pay
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Confirm
            </Button>
          </Box>

          {/* Payment Confirmation Dialog */}
          <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
            <DialogTitle>
              <CheckCircleOutlineIcon sx={{ mr: 1 }} />
              Course Enrolled Successfully
            </DialogTitle>
            <DialogContent>
              <Typography>
                {paymentMethod === 'UPI' && isPaid
                  ? 'You have successfully completed your UPI payment and enrolled in the course.'
                  : 'Your course is booked! Pay at the training center after the free trial ends.'}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmation}>Close</Button>
            </DialogActions>
          </Dialog>

          {/* Error Message Snackbar */}
          {errorMessage && (
            <Snackbar
              open={!!errorMessage}
              autoHideDuration={4000}
              onClose={() => setErrorMessage('')}
              message={errorMessage}
              action={
                <IconButton size="small" color="inherit" onClick={() => setErrorMessage('')}>
                  <CloseIcon />
                </IconButton>
              }
            />
          )}
        </Paper>
      </Box>
    </>
  );
}
