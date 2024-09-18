import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Paper, RadioGroup, FormControlLabel, Radio, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UpiIcon from '@mui/icons-material/AccountBalanceWallet';
import CashIcon from '@mui/icons-material/LocalAtm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Toaster from '../Form/Toaster';
import './PopupStyle.css';

export default function PaymentOption({ handleBack, data }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiID] = useState('pavishk2005@oksbi');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const courseCost = 1000;

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorMessage(''); // Clear any previous error
  };

  const handleSubmit = () => {
    if (paymentMethod === 'UPI') {
      handleUPIPayment();
    } else if (paymentMethod === 'Cash') {
      handleCashPayment();
    } else {
      setErrorMessage('Please select a payment method');
    }
  };

  const handleUPIPayment = () => {
    const upiDeepLink = `upi://pay?pa=${upiID}&pn=Course%20Booking&am=${courseCost}&cu=INR&tn=Course%20Enrollment`;
    const opened = window.open(upiDeepLink, '_blank');

    if (opened) {
      setTimeout(() => {
        setOpenConfirmation(true); // Assume success after UPI link opens
      }, 2000); // Simulate success after 2 seconds
    } else {
      setErrorMessage('Unable to open UPI payment app. Please ensure that a UPI app is installed.');
    }
  };

  const handleCashPayment = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <>
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

          <Divider className="payment-divider" />

          <Box className="payment-button-group" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button className="payment-back-button" onClick={handleBack} style={{ marginRight: '20px' }}>
              Back
            </Button>
            <Button className="payment-submit-button" onClick={handleSubmit}>
              Pay Now
            </Button>
          </Box>

          {/* Toaster for Error Handling */}
          {errorMessage && <Toaster message={errorMessage} />}

          {/* Payment Confirmation Dialog */}
          <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
            <DialogTitle className="confirmation-title">
              <CheckCircleOutlineIcon className="confirmation-icon" />
              &nbsp;Course Enrolled Successful
            </DialogTitle>
            <DialogContent>
              <Typography className="confirmation-message">
                {paymentMethod === 'UPI'
                  ? 'You have successfully completed your UPI payment and enrolled in the course.'
                  : 'Your course is booked! Pay at the training center after the free trial ends.'}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmation}>Close</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </>
  );
}
