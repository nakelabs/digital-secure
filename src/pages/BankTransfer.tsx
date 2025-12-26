import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Building2, AlertCircle, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'

const BankTransfer = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const investmentAmount = location.state?.amount || 0

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    })
  }

  const bankDetails = {
    bankName: "Digital Investment Bank",
    accountName: "Digital Investment Platform Ltd",
    accountNumber: "1234567890",
    routingNumber: "987654321",
    swiftCode: "DIBKUS33",
    reference: `INV-${Date.now()}`
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
            <h1 className="text-3xl font-bold">Bank Transfer</h1>
            <p className="text-slate-400">Complete your investment via bank transfer</p>
          </div>
        </div>

        {/* Investment Summary */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-500" />
              Investment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Investment Amount:</span>
                <span className="font-semibold text-green-400">${investmentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Processing Time:</span>
                <span>1-3 business days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle>Bank Account Details</CardTitle>
            <p className="text-slate-400 text-sm">
              Please transfer the exact amount to the following account:
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Bank Name", value: bankDetails.bankName },
              { label: "Account Name", value: bankDetails.accountName },
              { label: "Account Number", value: bankDetails.accountNumber },
              { label: "Routing Number", value: bankDetails.routingNumber },
              { label: "SWIFT Code", value: bankDetails.swiftCode },
              { label: "Reference", value: bankDetails.reference }
            ].map((detail, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                <div>
                  <div className="text-slate-400 text-sm">{detail.label}</div>
                  <div className="font-mono">{detail.value}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(detail.value, detail.label)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-500">
              <AlertCircle className="w-5 h-5 mr-2" />
              Important Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Include the reference number in your transfer
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Transfer the exact amount: ${investmentAmount.toLocaleString()}
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Your investment will be processed within 1-3 business days
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                You will receive a confirmation email once payment is received
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={() => navigate('/portfolio')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
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

export default BankTransfer