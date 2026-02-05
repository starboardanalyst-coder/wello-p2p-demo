"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  DollarSign, Wallet, User, Mail, Phone, Lock,
  Upload, CheckCircle2, Loader2, ArrowRight, Building2,
  FileText, Camera, Shield,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
const steps = ["Select Role", "Basic Info", "Identity Verification", "Under Review", "Complete"]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<"lender" | "borrower" | null>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" })
  const [verifyProgress, setVerifyProgress] = useState(0)
  const [verified, setVerified] = useState(false)

  // Auto-progress for verification step
  useEffect(() => {
    if (step !== 4) return
    const timer = setInterval(() => {
      setVerifyProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          setVerified(true)
          return 100
        }
        return p + 1
      })
    }, 30)
    return () => clearInterval(timer)
  }, [step])

  const progressPct = (step / 5) * 100

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                i + 1 <= step ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"
              }`}>
                {i + 1 < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-xs sm:inline ${i + 1 <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
            </div>
          ))}
        </div>
        <Progress value={progressPct} className="h-1.5" />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Role Selection */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Select Your Role</h1>
              <p className="mt-1 text-muted-foreground">Different roles unlock different platform features</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                  role === "lender" ? "border-emerald-500 bg-emerald-500/5 glow-green" : "border-border/50 hover:border-border"
                }`}
                onClick={() => setRole("lender")}
              >
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">I am a Lender</h3>
                  <p className="text-sm text-muted-foreground">Lender</p>
                  <div className="mt-4 space-y-1 text-xs text-muted-foreground text-left">
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> Lend funds and earn interest</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> $U Yield 4.5% APY</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> AI matches quality borrowers</div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                  role === "borrower" ? "border-cyan-500 bg-cyan-500/5 glow-blue" : "border-border/50 hover:border-border"
                }`}
                onClick={() => setRole("borrower")}
              >
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                    <Wallet className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">I am a Borrower</h3>
                  <p className="text-sm text-muted-foreground">Borrower</p>
                  <div className="mt-4 space-y-1 text-xs text-muted-foreground text-left">
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-cyan-400" /> Access low-rate financing</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-cyan-400" /> Progressive credit limits</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-cyan-400" /> Flexible repayment options</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button
              className="mt-6 w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
              size="lg"
              disabled={!role}
              onClick={() => setStep(2)}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Basic Information</h1>
              <p className="mt-1 text-muted-foreground">Please fill in your registration details</p>
            </div>
            <Card className="border-border/50">
              <CardContent className="space-y-4 p-6">
                <div>
                  <label className="mb-1 flex items-center gap-2 text-sm">
                    {role === "borrower" ? <Building2 className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    {role === "borrower" ? "Company Name" : "Full Name"}
                  </label>
                  <Input
                    placeholder={role === "borrower" ? "e.g., Sahel Trade Co." : "e.g., John Smith"}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-2 text-sm">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </label>
                  <Input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-2 text-sm">
                    <Phone className="h-3.5 w-3.5" /> Phone Number
                  </label>
                  <Input type="tel" placeholder="+234 xxx xxxx xxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-2 text-sm">
                    <Lock className="h-3.5 w-3.5" /> Password
                  </label>
                  <Input type="password" placeholder="Set password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="border-border/50" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => setStep(3)}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: KYC/KYB */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">{role === "borrower" ? "KYB Business Verification" : "KYC Identity Verification"}</h1>
              <p className="mt-1 text-muted-foreground">{role === "borrower" ? "Upload business documents (Demo simulation)" : "Upload identity documents (Demo simulation)"}</p>
            </div>

            <div className="space-y-4">
              {role === "borrower" ? (
                <>
                  {["Business License", "Director ID", "Bank Account Proof", "Operational Data"].map((doc) => (
                    <Card key={doc} className="border-border/50">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{doc}</div>
                          <div className="text-xs text-muted-foreground">Click to upload (Demo simulation)</div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1 border-border/50 text-xs">
                          <Upload className="h-3 w-3" /> Upload
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <Card className="border-border/50">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">ID Card / Passport</div>
                        <div className="text-xs text-muted-foreground">Front and back photos (Demo simulation)</div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1 border-border/50 text-xs">
                        <Upload className="h-3 w-3" /> Upload
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Camera className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Face Verification</div>
                        <div className="text-xs text-muted-foreground">Live photo verification (Demo simulation)</div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1 border-border/50 text-xs">
                        <Camera className="h-3 w-3" /> Capture
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="border-border/50" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => setStep(4)}>
                Submit Verification <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Verification */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              {!verified ? (
                <>
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-400" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold">Under Review...</h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {verifyProgress < 30 && "Verifying identity information..."}
                    {verifyProgress >= 30 && verifyProgress < 60 && "Checking business credentials..."}
                    {verifyProgress >= 60 && verifyProgress < 90 && "Assessing credit limit..."}
                    {verifyProgress >= 90 && "Generating review report..."}
                  </p>
                  <div className="w-64">
                    <Progress value={verifyProgress} className="h-2" />
                  </div>
                </>
              ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold">Verification Approved! 🎉</h2>
                  <p className="mb-2 text-muted-foreground">Congratulations, your identity verification is complete.</p>
                  {role === "borrower" && (
                    <div className="mb-4 rounded-lg bg-secondary/50 px-4 py-2 text-sm">
                      Initial Limit: <span className="font-bold text-emerald-400">$5,000</span> (Lv.1)
                    </div>
                  )}
                  <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => setStep(5)}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 5: Complete */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20"
              >
                <Shield className="h-10 w-10 text-emerald-400" />
              </motion.div>
              <h1 className="mb-2 text-2xl font-bold">Registration Complete!</h1>
              <p className="mb-6 text-muted-foreground">You have successfully registered as a {role === "lender" ? "Lender" : "Borrower"}</p>
              <Link href={role === "lender" ? "/lender/dashboard" : "/borrower/dashboard"}>
                <Button size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
