This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent guide for Create React App [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Trackable 

**Application Uses...**

```
  Firebase Authentication API
  Firebase Database API
  Firebase Storage API
  Dropzone
  Lodash 
  Redux
```

**What does Trackable do?**

It creates a user account that can hold music files. The user can then 
playback, edit, and delete the tracks they have uploaded accordingly.

**How does it do this?**

On a single page, the user has the choice of logging in or signing up, which
pops up their respective modals. The screenthen automatically updates so that 
the user is then able to upload their desired files. 

The plus button brings up the upload modal, where a user can place a file, its 
name, and a description of the track. Once the track is uploaded, the user can
then do one of three actions to the track:

1. Play: Opens a bar at the bottom of the screen with the title and audio bar.
2. Edit: Opens a modal that can update title and description.
3. Delete: Deletes track and automatically removes it from the list.

User also has option to delete account, which deletes all tracks as well.

**What other features can be added?**

Other features could include:

* Password recovery
* Shareable tracks
* User Settings