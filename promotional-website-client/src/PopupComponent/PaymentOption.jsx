import React, { useState } from 'react';
import { Box,Button,Grid,Typography,Paper,RadioGroup,FormControlLabel,Radio,Divider,Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import UpiIcon from '@mui/icons-material/AccountBalanceWallet';
import CashIcon from '@mui/icons-material/LocalAtm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Toaster from '../Form/Toaster';
import './PopupStyle.css';

export default function PaymentOption({ handleBack, courseCost }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiID] = useState('coursebooking@upi'); // UPI ID
  const [openConfirmation, setOpenConfirmation] = useState(false); // Modal for confirmation
  const [paymentSelected,setPaymentSelected]=useState(false);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = () => {
    if (paymentMethod === 'UPI') {
      handleUPIPayment();
    } else if (paymentMethod === 'Cash') {
      setOpenConfirmation(true); 
    } else {
        setPaymentSelected(true);
    }
   
  };

  // Simulate UPI Payment
  const handleUPIPayment = () => {
    const upiUrl = `upi://pay?pa=${upiID}&pn=Course%20Booking&am=${courseCost}&cu=INR&tn=Course%20Enrollment`;
    // Simulate payment success after redirection
    setTimeout(() => {
      setOpenConfirmation(true); // Show confirmation modal
    }, 3000); // Adjust this based on the actual payment flow
    window.location.href = upiUrl;
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
                  Pay via UPI using our UPI ID: <strong>{upiID}</strong>
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
                Pay in cash at our center after booking and completing the free trial.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>

        <Divider className="payment-divider" />

        <Box className="payment-actions">
          <Button
            onClick={handleBack}
            className="back-button"
          >
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            className="submit-button"
          >
            Proceed with {paymentMethod || 'Payment'}
          </Button>
        </Box>
      </Paper>

      {/* Confirmation Modal */}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation} fullWidth maxWidth="sm">
        <DialogTitle>
          <CheckCircleOutlineIcon className="check-icon" />
          Course Enrolled Successfully!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {paymentMethod === 'UPI' ? (
              <>
                Your UPI payment for <strong>₹{courseCost}</strong> has been processed successfully.
                Thank you for enrolling!
              </>
            ) : (
              <>
                You have selected the <strong>Cash Payment</strong> option.
                Please complete the payment at our center.
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmation}
            className="close-button-confirm-popup"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
   {paymentSelected && <Toaster message="Please select a payment method" severity="error"/>}
    </>
  );
}
