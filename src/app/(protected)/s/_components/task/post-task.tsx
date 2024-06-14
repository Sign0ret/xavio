import { currentUser } from '@/lib/auth';
import React from 'react'
import {s3client, endpoint} from '@/lib/s3client'
import {v4 as uuid} from 'uuid'
import { PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
type Props = {
    params: { 
      course: string,
      topic: string,
      task: string,
   }
  };

export default async function PostTask({ params }: Props) {
    const user = await currentUser();
  if (!user) {
    return (
      <div>ERROR FETCHING THE USER</div>
    )
  }

  async function postTask(formData: FormData) {
    "use server"
    const text = formData.get("text")?.toString();
    let url = formData.get("url");
    const comments = formData.get("comments")?.toString();

    if ((!text && !url) || !user ){
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
        } catch (err: any) {

        }
    }
    console.log('urlupdated:',url)

    const submitData = {
        sender: user.id,
        grade: 85,
        text: text,
        url: url ? url.toString() : "",
        comments: comments
    };  
    console.log("submitData:",submitData)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/topics/${params.topic}/tasks/${params.task}/submits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData), // Replace `data` with the object containing the quiz fields to update
      });
      if (!res.ok) {
        throw new Error('Failed to fetch course');
      }
      const task = await res.json();
      console.log({task})      
    } catch (error: any) {
      ;
    }
  }
  return (
    <form className="space-y-4" action={postTask}>
        <h1 className="text-white">Answer through text or File</h1>
        <div className="flex items-center space-x-4">
            <textarea
            name="text"
            className="w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline bg-white"
            placeholder="Escribe aquí tu respuesta"
            ></textarea>
        </div>
        <div>
            <h1 className="text-white">Delivery files</h1>
            <input name="url" type="file" className="border rounded-lg p-2 bg-white" />
        </div>
        {/* <div>
            <h1 className="text-white">Delivery comments</h1>
            <input
            name="comments"
            type="text"
            className="w-[40%] p-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            placeholder="Escribe aquí tu comentario"
            />
        </div> */}
        <div className="flex justify-end">
            <button 
            className="hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-3xl bg-slate-900"
            type="submit"
            >
            Send
            </button>
        </div>
    </form>
  )
}
