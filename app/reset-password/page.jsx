import React from 'react'

const page = () => {
  return (
    <>
    <div style={{ color: "teal", padding: "70px 20px", textAlign: "center"}}>
        <h2 style={{ fontWeight: 'bolder', fontSize: '24px' }}>Password Reset Successful!</h2>
        <p style={{ fontWeight: 'bold', fontSize: '17px' }}>We've sent a password reset link to the email address you provided. Please check your inbox for the email and follow the instructions to create a new password.</p>
        <p style={{ fontWeight: 'bold', fontSize: '17px' }}>If you don't receive the email within a few minutes, please check your spam or junk folder.</p>
    </div>
    </>
  )
}

export default page