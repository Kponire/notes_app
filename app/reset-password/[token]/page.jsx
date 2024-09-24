"use client"
import ResetPasswordForm from '@/components/ResetPasswordForm'
import React from 'react'

const ResetPassword = ({ params }) => {
  return (
    <>
    <ResetPasswordForm token={params.token} />
    </>
  )
}

export default ResetPassword