import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Banknote, AlertCircle, CheckCircle, Globe } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'

const WireTransfer = () => {
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

  const wireDetails = {
    bankName: "Digital Investment International Bank",
    accountName: "Digital Investment Platform Ltd",
    accountNumber: "INT-9876543210",
    swiftCode: "DIIBGB22",
    iban: "GB82 DIIB 1234 5698 7654 32",
    routingNumber: "123456789",
    bankAddress: "123 Financial District, London, UK, EC2V 8RF",
    intermediaryBank: "Chase Bank New York",
    intermediarySwift: "CHASUS33",
    reference: `WIRE-${Date.now()}`
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
            <h1 className="text-3xl font-bold">International Wire Transfer</h1>
            <p className="text-slate-400">Complete your investment via international wire transfer</p>
          </div>
        </div>

        {/* Investment Summary */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-500" />
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
                <span>Same day processing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wire Fee:</span>
                <span className="text-yellow-400">$25 - $50 (varies by bank)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wire Transfer Details */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle>Wire Transfer Details</CardTitle>
            <p className="text-slate-400 text-sm">
              Please use these details for your international wire transfer:
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Beneficiary Bank", value: wireDetails.bankName },
              { label: "Bank Address", value: wireDetails.bankAddress },
              { label: "SWIFT Code", value: wireDetails.swiftCode },
              { label: "IBAN", value: wireDetails.iban },
              { label: "Account Name", value: wireDetails.accountName },
              { label: "Account Number", value: wireDetails.accountNumber },
              { label: "Intermediary Bank", value: wireDetails.intermediaryBank },
              { label: "Intermediary SWIFT", value: wireDetails.intermediarySwift },
              { label: "Reference", value: wireDetails.reference }
            ].map((detail, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                <div>
                  <div className="text-slate-400 text-sm">{detail.label}</div>
                  <div className="font-mono text-sm">{detail.value}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(detail.value, detail.label)}
                  className="text-green-400 hover:text-green-300"
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
              Important Wire Transfer Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Include the reference number for faster processing
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Transfer amount: ${investmentAmount.toLocaleString()} USD
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Processing time: Same business day if sent before 3 PM EST
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                Wire fees typically range from $25-$50 depending on your bank
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                You will receive confirmation once payment is received
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={() => navigate('/portfolio')}
            className="flex-1 bg-green-600 hover:bg-green-700"
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

export default WireTransfer