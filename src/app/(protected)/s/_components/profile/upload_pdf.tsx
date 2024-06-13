import { currentUser } from '@/lib/auth';
import React from 'react'
import {s3client, endpoint} from '@/lib/s3client'
import {v4 as uuid} from 'uuid'
import { PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { db } from "@/lib/db";

export default async function UploadPDF() {
    const user = await currentUser();
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }

  async function postCV(formData: FormData) {
    "use server"
    let url = formData.get("url");

    if (!url || !user) {
      console.log("hey");
      return;
    }

    if (url instanceof File) {
      try {
        console.log(url);
        const bytes = await url.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = url.name.split('.').pop();
        const bucketParams = {
          Bucket: process.env.S3_BUCKET_NAME, // Use the bucket name from .env
          Key: `${uuid()}.${fileExtension}`,
          Body: buffer,
          ACL: 'public-read' as ObjectCannedACL
        };
        const result = await s3client.send(new PutObjectCommand(bucketParams));
        console.log('result>', result);
        url = `${endpoint}/${bucketParams.Bucket}/${bucketParams.Key}`;
        await db.user.update({
          where: {
            id: user.id // Specify the user's ID here
          },
          data: {
            cv: url // Update the cv attribute with the new value
          }
        });
        console.log('Database updated with URL:', url);
      } catch (err: any) {
        console.error('Error uploading file or updating database:', err);
      }
    }
    console.log('urlupdated:', url)
  }
  return (
    <form className="space-y-4" action={postCV}>
      <input name="url" type="file" className="rounded-lg p-2" />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Upload</button>
    </form>
  )
}
