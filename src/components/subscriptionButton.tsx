'use client'
import React from 'react'
import { Button } from './ui/button';
import axios from 'axios';

type Props = {
  isPro: boolean,

}

export const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true)
      const respose = await axios.get('/api/stripe')
      window.location.href = respose.data.url
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <Button disabled={loading} className=' border-2 text-primary-200 bg-transparent font-semibold hover:bg-primary-200 hover:text-white border-primary-200 ' onClick={handleSubscription}>
      {props.isPro ? "Manage Subscription" : "Get Pro"}
    </Button>
  )
}