// src/components/StructuredData.tsx
import React from "react";

export interface StructuredDataProps {
  data: Record<string, any>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => (
  <script
    type="application/ld+json"
    // dangerouslySetInnerHTML is safe here because data comes from your own props
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
  />
);