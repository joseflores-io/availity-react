# @availity/feedback

> Availity feedback with simley faces react component.

## Installation

```bash
npm install @availity/feedback --save
```

### Usage

```javascript
import React from 'react';
import Feedback from '@availity/feedback';
// ... 
<Feedback>
  {/* ... */}
</Feedback>
// ...
```

#### Feedback (Default export)
A component which does awesome things!

##### Props

- **`appName`**: String. Required. The name of the application this feedback is for. It is used in the API request to indicate where the feedback came from.
- **`formProps`**: Object. Optional. Props which will be passed to the underlying `FeedbackForm`. See the props for `FeedbackForm` below.
- **`children`**: Text. Optional. The text which displays on the button. Default: `"Give Feedback"`
- **`color`**: String. Optional. The color of the button. Default: `"light"`
- **`outline`**: Boolean. Optional. Indicates if the button should use the "outline" styles or not. Default: `false`
- **`prompt`**: String. Optional. Text which prompts/asks the user to provide feedback. Default: `"Tell us what you think about ${appName}."`
- **`onFeedbackSent`**: Function. Optional. Callback for when the feedback is submitted. It will be called with the feedback object.

##### Usage

```javascript
import React from 'react';
import Feedback from '@availity/feedback';
// ... 
<Feedback
      appName="Payer Space"
      prompt="Please provide some feedback"
      color="primary"
    >
      Provide Feedback
    </Feedback>
// ...
```

#### FeedbackForm

This is the underlying form which is exposed in case you need to gather feedback inline.

##### Props

- **`name`**: String. Required. The name of the application this feedback is for. It is used in the API request to indicate where the feedback came from.
- **`formProps`**: Object. Optional. Props which will be passed to the underlying `FeedbackForm`. See the props for `FeedbackForm` below.
- **`faceOptions`**: Array of Objects containing **`icon`** and **`description`**. Optional. Allows you to override the smiley face options which appear. Default: Smiley Face, Meh Face, and Frowny Face.
- **`aboutOptions`**: Array of Objects containing **`value`** and **`label`**. Optional. Allows a dropdown displaying the options provided to let the uer indicate what the feedback is about.
- **`prompt`**: String. Optional. Text which prompts/asks the user to provide feedback. Default: `"Tell us what you think about ${appName}."`
- **`onFeedbackSent`**: Function. Optional. Callback for when the feedback is submitted. It will be called with the feedback object.

##### Usage

```javascript
import React from 'react';
import { FeedbackForm } from '@availity/feedback';
// ... 
<FeedbackForm
  name={text('Application Name', 'Payer Space')}
  prompt={text('Prompt')}
/>
// ...
```