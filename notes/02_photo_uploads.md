# Setting up photo uploads to AWS S3 From Front End Using Heroku, React, and Express

- Follow this **getting access keys
  [guide](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)**
  on AWS

- Follow this **S3 Upload to Node
  [Guide](https://devcenter.heroku.com/articles/s3-upload-node)** On Heroku

- Look at the **Node Direct Uploader
  [Github Repository](https://github.com/willwebberley/NodeDirectUploader)** as
  an example

- Use the **Fetch Form Data
  [Guide](https://flaviocopes.com/how-to-upload-files-fetch/)** On the client
  side To upload using Fetch as opposed to xhr requests

- Use the **Formidable library
  [Guide](https://flaviocopes.com/express-forms-files/)** to handle parsing the
  files on the server.

route.get('/signed-form-upload', async (req, res) => { AWS.config.update({
accessKeyId: 'AAAAAAAAAAAAAAAA', // Generated on step 1 secretAccessKey:
'J21//xxxxxxxxxxx', // Generated on step 1 region: 'eu-west-1', // Must be the
same as your bucket signatureVersion: 'v4', }); const params = { Bucket:
'your-bucket-name', Key: 'my-awesome-object.webm', Fields: { Key:
'my-awesome-object.webm', }, }; const options = { signatureVersion: 'v4',
region: 'eu-west-1', // same as your bucket

    endpoint = new AWS.Endpoint('https://your-bucket-name.s3.amazonaws.com'),
    useAccelerateEndpoint = false,
    s3ForcePathStyle = true,  }

const client = new AWS.S3(options); const form = await (new Promise((resolve,
reject) => {

    client.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });

})); return res.json({ form: { ...form, url: config.aws.s3.AWS_S3_ENDPOINT } })
}
