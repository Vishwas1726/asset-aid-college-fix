
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  assetId: z.string().min(1, { message: "Asset ID is required" }),
  assetType: z.string().min(1, { message: "Asset type is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  issueType: z.string().min(1, { message: "Issue type is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  priority: z.string().min(1, { message: "Priority is required" }),
});

type FormValues = z.infer<typeof formSchema>;

// Function to generate a request ID
const generateRequestId = () => {
  // Generate a simple ID in format REQ-XXX where XXX is a random 3-digit number
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `REQ-${randomNum}`;
};

export const RequestForm: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: "",
      assetType: "",
      location: "",
      issueType: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Create a new request object
    const newRequest = {
      id: generateRequestId(),
      title: `Issue with ${data.assetType} - ${data.assetId}`,
      location: data.location,
      requester: "Current User", // In a real app, this would come from auth context
      status: "pending",
      priority: data.priority,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      description: data.description,
      issueType: data.issueType
    };
    
    console.log("Creating new request:", newRequest);
    
    // In a production app, we would store this in a database via an API
    // For now, we'll store it in localStorage so it persists between page refreshes
    const existingRequests = JSON.parse(localStorage.getItem('repairRequests') || '[]');
    const updatedRequests = [newRequest, ...existingRequests];
    localStorage.setItem('repairRequests', JSON.stringify(updatedRequests));
    
    // Show success message
    toast.success("Request submitted successfully!");
    
    // Reset form
    form.reset();
    
    // Navigate to requests list after a short delay
    setTimeout(() => {
      navigate('/requests');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Repair Request</CardTitle>
        <CardDescription>
          Fill out this form to request a repair for a college asset.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="assetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. PC-LAB-001" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the ID from the asset tag
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="computer">Computer / Laptop</SelectItem>
                        <SelectItem value="printer">Printer</SelectItem>
                        <SelectItem value="projector">Projector</SelectItem>
                        <SelectItem value="network">Network Equipment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lab1">Computer Lab 1</SelectItem>
                        <SelectItem value="lab2">Computer Lab 2</SelectItem>
                        <SelectItem value="lib">Library</SelectItem>
                        <SelectItem value="admin">Admin Office</SelectItem>
                        <SelectItem value="faculty">Faculty Room</SelectItem>
                        <SelectItem value="classroom">Classroom</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="issueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware Issue</SelectItem>
                        <SelectItem value="software">Software Issue</SelectItem>
                        <SelectItem value="network">Network Issue</SelectItem>
                        <SelectItem value="peripheral">Peripheral Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe the issue in detail" 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide as much detail as possible about the issue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
