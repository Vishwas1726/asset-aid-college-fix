
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RequestForm } from '@/components/forms/RequestForm';

const NewRequest: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Submit a Repair Request</h1>
        <RequestForm />
      </div>
    </MainLayout>
  );
};

export default NewRequest;
