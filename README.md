# Cloud cannon s3

This project is a chrome extension allowing users to upload and browse images from an s3 bucket.


## Local development

- Clone this repo

- Under _chrome extensions_, click _Load unpacked_

- Select the folder of the cloned repo

- Ensure the extension is active

- Add the relevant credentials under the extension options


## Update version in chrome store

- Bump the version in `manifest.json`

- Create a `.zip` of this directory

- Go to [chrome developer dashboard](https://chrome.google.com/webstore/developer/dashboard)

- You have to be a member of the _ccs3-admins_ to be able to edit/publish a new version

- Click on _Edit_ for this extension

- Click _Upload updated package_ and follow the instructions to upload the `.zip` you created

- Once uploaded, make sure you _Publish changes_ on the extension edit page
