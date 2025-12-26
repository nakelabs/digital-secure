import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, DollarSign, AlertCircle, CheckCircle, Shield, Zap } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'

const PayPalPayment = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const investmentAmount = location.state?.amount || 0

  const handlePayPalPayment = () => {
    // In a real app, this would integrate with PayPal SDK
    toast({
      title: "Redirecting to PayPal",
      description: "You will be redirected to PayPal to complete your payment.",
    })
    
    // Simulate PayPal redirect
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your investment has been processed successfully!",
      })
      navigate('/portfolio')
    }, 3000)
  }

  const paypalDetails = {
    merchantEmail: "payments@digitalinvestment.com",
    businessName: "Digital Investment Platform",
    amount: investmentAmount,
    currency: "USD",
    invoiceId: `PAYPAL-${Date.now()}`
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">PayPal Payment</h1>
            <p className="text-slate-400">Complete your investment quickly and securely with PayPal</p>
          </div>
        </div>

        {/* Investment Summary */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Investment Amount:</span>
                <span className="font-semibold text-green-400">${investmentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Processing Fee:</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Processing Time:</span>
                <span className="text-blue-400">Instant</span>
              </div>
              <hr className="border-slate-700" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-green-400">${investmentAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PayPal Benefits */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-500" />
              PayPal Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Instant Processing</h4>
                  <p className="text-slate-400 text-sm">Your investment is processed immediately</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Buyer Protection</h4>
                  <p className="text-slate-400 text-sm">PayPal's purchase protection included</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Secure Payment</h4>
                  <p className="text-slate-400 text-sm">Your financial information stays private</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <DollarSign className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <h4 className="font-semibold">No Additional Fees</h4>
                  <p className="text-slate-400 text-sm">Pay exactly what you invest</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Merchant:</span>
              <span>{paypalDetails.businessName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Amount:</span>
              <span>${paypalDetails.amount.toLocaleString()} {paypalDetails.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Invoice ID:</span>
              <span className="font-mono text-sm">{paypalDetails.invoiceId}</span>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-500">
              <AlertCircle className="w-5 h-5 mr-2" />
              Payment Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                You will be redirected to PayPal to complete the payment
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Your investment will be activated immediately after payment
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                You will receive a confirmation email
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Return to this site after completing payment on PayPal
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Card className="bg-gradient-to-r from-blue-600 to-yellow-500 border-0 mb-6">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Complete Your Investment?</h3>
            <p className="text-blue-100 mb-4">Click below to proceed with PayPal payment</p>
            <Button
              onClick={handlePayPalPayment}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold px-8 py-3 text-lg"
              size="lg"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Pay ${investmentAmount.toLocaleString()} with PayPal
            </Button>
          </CardContent>
        </Card>

        {/* Alternative Actions */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/portfolio')}
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Go to Portfolio
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PayPalPayment