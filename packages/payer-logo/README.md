# @availity/payer-logo

> Easy to use component to display the payer&#x27;s logo given the payer&#x27;s ID

## Installation

```bash
npm install @availity/payer-logo --save
```

### Usage

```javascript
import React from 'react';
import PayerLogo from '@availity/payer-logo';
// ... 
<PayerLogo spaceId="73162546201441126239486200007187" alt="The word 'Payer' in green" />
// ...
```

#### PayerLogo (Default export)
A component which does awesome things!

##### Props

At least one of the following props must be provided:

- **`spaceId`**: String. Optional, required if `payerId` is not provided. The payer spaces ID for the payer for which you want a logo.
- **`payerId`**: String. Optional, required if `spaceId` is not provided. The payer ID for the payer for which you want a logo.

##### Usage

```javascript
import React from 'react';
import PayerLogo from '@availity/payer-logo';
// ... 
<PayerLogo spaceId="73162546201441126239486200007187" alt="The word 'Payer' in green" />
<PayerLogo payerId="PayerID" alt="The word 'Payer' in green" />
// ...
```