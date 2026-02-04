// Supabase Storage client for file uploads

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET || 'documents';

export interface UploadResult {
  fieldName: string;
  fileName: string;
  publicUrl: string;
}

/**
 * Upload a single file to Supabase Storage
 */
export async function uploadFile(file: File, fieldName: string): Promise<UploadResult> {
  // Generate unique filename with timestamp
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `uploads/${timestamp}_${sanitizedName}`;

  // Upload using Supabase Storage API
  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${filePath}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': file.type || 'application/octet-stream',
        'x-upsert': 'true',
      },
      body: file,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Upload error:', errorText);
    throw new Error(`Failed to upload ${file.name}: ${response.statusText}`);
  }

  // Return the public URL
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;

  return {
    fieldName,
    fileName: file.name,
    publicUrl,
  };
}

/**
 * Upload multiple files to Supabase Storage
 */
export async function uploadFiles(files: Record<string, File>): Promise<Record<string, string>> {
  const uploadPromises = Object.entries(files).map(async ([fieldName, file]) => {
    const result = await uploadFile(file, fieldName);
    return { fieldName: result.fieldName, url: result.publicUrl };
  });

  const results = await Promise.all(uploadPromises);

  // Convert to object with fieldName as key and URL as value
  return results.reduce((acc, { fieldName, url }) => {
    acc[fieldName] = url;
    return acc;
  }, {} as Record<string, string>);
}
