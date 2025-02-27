"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Mail, MapPin, Globe } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contact Me</h1>
        <p className="text-xl text-muted-foreground">Have a question or want to work together? Get in touch with me.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-background rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-between"
        >
          <div className="bg-background rounded-lg border p-6 shadow-sm mb-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:nahom@nahom.eu.org" className="text-muted-foreground hover:text-primary">
                    nahom@nahom.eu.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Ethiopia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Globe className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Website</h3>
                  <a
                    href="https://nahom.eu.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    nahom.eu.org
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>

            <div className="grid grid-cols-3 gap-4">
              <a
                href="https://github.com/nahom-d54"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-lg border hover:bg-muted transition-colors"
              >
                <Github className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/nahom-d54"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-lg border hover:bg-muted transition-colors"
              >
                <Linkedin className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>

              <a
                href="https://nahom.eu.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-lg border hover:bg-muted transition-colors"
              >
                <Globe className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Website</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Toaster />
    </div>
  )
}

