# inBank homework. Loan decision app

There are two apps. Decision-app and Decision-rest

### Decision-app

Simple UI to visualize input data for loan decision calculator (backEnd) app.  
UI is capable to accept input data (Personal code, loan request amount, loan request period),  
execute some validations on input fields and dispatch request to the backEnd.  
Display reponse data.  

### Decision-rest

BackEnd app which is responsible of loan decision calculation. It provides single service (api endpoint).  
App accepts request data, validates it, calcules the result and provides response:  

```json
{
  "error": "****",
  "requestedAmount": "*****",
  "maxAvailableAmount": "*******",
  "proposalPeriod": "******",
  "decision": "*******"
}
```

BackEnd service is covered with unit tests.

## Installation and download

Clone application repository to local folder  
`git clone https://github.com/Shatt001/Loan-decision-app.git`

Install necessary npm libraries for both app:  
Decision-app  
`cd decision-app`  
`npm install`  
`cd ..`  

Decision-rest  
`cd decision-rest`  
`npm install`  
`cd ..`  

## Test execution

Decision-rest app has unit tests coverage. To execute test run commands:  
`cd decision-rest`  
`npm test`  

## Start Decision-app (_hosted by webpack dev server_)

Open new terminal window  
`cd decision-app`  
`npm run start`  

## Start Decision-rest (_hosted by express server_)

Open new terminal window  
`cd decision-rest`  
`npm run start`  

Decision-app starts on port: 3000  
To verify open link: http://localhost:3000/  

Decision-rest starts on port: 3001  
To verify open link: http://localhost:3001/getDecision  
