
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

    if ((!url) || !user ){
      console.log("hey")
        return;
    }

    if (url instanceof File) {
        try {
            console.log(url)
            const bytes = await url.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const  fileExtension = url.name.split('.').pop()
            const bucketParams = {
                Bucket: 'xavio-bucket',
                Key: `${uuid()}.${fileExtension}`,
                Body: buffer,
                ACL: 'public-read' as ObjectCannedACL
            }
            const result = await s3client.send(new PutObjectCommand(bucketParams))
            console.log('result>',result)
            url = `${endpoint}/${bucketParams.Bucket}/${bucketParams.Key}`;
            await db.user.update({
              where: {
                id: user.id // Specify the user's ID here
              },
              data: {
                //@ts-ignore
                cv: url // Update the cv attribute with the new value
              }
            });
            
        } catch (err: any) {

        }
    }
    console.log('urlupdated:',url)
    // try {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/tasks/${params.task}/submits`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(submitData), // Replace `data` with the object containing the quiz fields to update
    //   });
    //   if (!res.ok) {
    //     throw new Error('Failed to fetch course');
    //   }
    //   const task = await res.json();
    //   console.log({task})      
    // } catch (error: any) {
    //   ;
    // }
  }
  return (
    <form className="space-y-4" action={postCV}>
      <input name="url" type="file" className="rounded-lg p-2" />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Upload</button>
    </form>
  )
}