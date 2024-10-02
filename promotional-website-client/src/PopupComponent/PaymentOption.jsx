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
} from '@mui/material';
import UpiIcon from '@mui/icons-material/AccountBalanceWallet';
import CashIcon from '@mui/icons-material/LocalAtm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'react-qr-code';
import axios from 'axios';
import './PopupStyle.css';

export default function PaymentOption({ handleBack, data, image }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [buyerUpiID, setBuyerUpiID] = useState('');
  const upiID = 'pavishk2005@oksbi'; // Your UPI ID
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const courseCost = 1000;

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorMessage(''); // Clear error when payment method changes
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
    const upiDeepLink = `upi://pay?pa=${upiID}&pn=Course%20Booking&am=${courseCost}&cu=INR&tn=Course%20Enrollment`;

    if (isMobile()) {
      window.location.href = upiDeepLink; // Redirect to UPI payment on mobile
    } else {
      setOpenConfirmation(true);
      saveEnrollment('UPI', courseCost);
      setIsPaid(true);
    }
  };

  const isMobile = () => window.innerWidth <= 768;

  const handleCashPayment = () => {
    saveEnrollment('Cash', courseCost);
    setOpenConfirmation(true);
  };

  const saveEnrollment = async (paymentType, amount) => {
    const username = JSON.parse(localStorage.getItem('userData')).data.name;
    try {
      const res = await axios.post("http://localhost:8080/courses/add-booked-course", {
        name: username,
        coursename: data?.name,
        imgsrc: data?.coursesrc,
        coursecost: amount,
        paymenttype: paymentType,
      });
      console.log(res.data.user);
      localStorage.setItem("enrolledCourses", JSON.stringify(res.data.user));
    } catch (err) {
      console.error('Error enrolling:', err.response);
    }
  };

  const handleCloseConfirmation = () => setOpenConfirmation(false);

  return (
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
            {/* UPI Payment Option */}
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

            {/* Cash Payment Option */}
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

        {/* Payment Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Pay Now
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
                : paymentMethod === 'Cash'
                ? 'Your course is booked! Pay at the training center after the free trial ends.'
                : 'Payment failed. Please try again.'}
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
  );
}
