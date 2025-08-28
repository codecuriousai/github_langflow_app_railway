// // Create test-langflow-debug.js file
// require('dotenv').config();
// const fetch = require('node-fetch');

// async function debugLangflow() {
//     console.log('=== Langflow Debug Test ===');
//     console.log('Endpoint:', process.env.LANGFLOW_ENDPOINT);
//     console.log('API Key:', process.env.LANGFLOW_API_KEY ? '***SET***' : 'NOT SET');
//     console.log('Flow ID:', process.env.LANGFLOW_REVIEW_FLOW_ID);

//     // Test basic connectivity
//     try {
//         console.log('\n1. Testing basic connectivity...');
//         const response = await fetch(process.env.LANGFLOW_ENDPOINT, {
//             method: 'GET',
//             headers: {
//                 'User-Agent': 'Debug-Test/1.0'
//             }
//         });

//         console.log('Status:', response.status);
//         console.log('Headers:', Object.fromEntries(response.headers));

//         if (!response.ok) {
//             const text = await response.text();
//             console.log('Response:', text.substring(0, 500));
//         }

//     } catch (error) {
//         console.error('Connectivity test failed:', error.message);
//     }

//     // Test API endpoint
//     try {
//         console.log('\n2. Testing API endpoint...');
//         // const testData = {
//         //   title: "Test PR",
//         //   description: "Debug test",
//         //   author: "debug-user"
//         // };

//         const testData = {
//             body: "Hi",
//             session_id: "user_1756196104406",
//             tweaks: {
//                 "GitHubBranchPRsFetcher-HLWhI": {
//                     repo_url: "https://github.com/codecuriousai/react-project",
//                     branch_name: "code_review_coverage_analysis",
//                     github_token: "",
//                     per_page: 30,
//                     max_pages: 5,
//                     pr_number: 10
//                 }
//             }
//         }

//         const apiUrl = `${process.env.LANGFLOW_ENDPOINT}/run/${process.env.LANGFLOW_REVIEW_FLOW_ID}`;
//         console.log('API URL:', apiUrl);

//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.LANGFLOW_API_KEY}`,
//                 'User-Agent': 'Debug-Test/1.0',
//             },
//             body: JSON.stringify({
//                 input_value: JSON.stringify(testData),
//                 output_type: 'chat',
//                 input_type: 'chat'
//             }),
//         });

//         console.log('API Status:', response.status);
//         const result = await response.text();
//         console.log('API Response:', result.substring(0, 1000));

//     } catch (error) {
//         console.error('API test failed:', error.message);
//     }
// }

// debugLangflow();


// Updated test-langflow-debug.js with proper authentication
require('dotenv').config();
const fetch = require('node-fetch');

async function debugLangflow() {
  console.log('=== Langflow Astra Debug Test ===');
  console.log('Endpoint:', process.env.LANGFLOW_ENDPOINT);
  console.log('API Key:', process.env.LANGFLOW_API_KEY ? '***SET***' : 'NOT SET');
  console.log('Flow ID:', process.env.LANGFLOW_REVIEW_FLOW_ID);

  // Test API endpoint with authentication
  try {
    console.log('\n1. Testing API endpoint with authentication...');
    const testData = {
      body: "Hi",
      session_id: "user_1756196104406",
      tweaks: {
        "GitHubBranchPRsFetcher-HLWhI": {
          repo_url: "https://github.com/codecuriousai/react-project",
          branch_name: "code_review_coverage_analysis",
          github_token: process.env.GITHUB_TOKEN,
          per_page: 30,
          max_pages: 5,
          pr_number: 10
        }
      }
    }
    const apiUrl = `${process.env.LANGFLOW_ENDPOINT}/run/${process.env.LANGFLOW_REVIEW_FLOW_ID}`;
    console.log('API URL:', apiUrl);

    const requestBody = {
      input_value: JSON.stringify(testData),
      output_type: 'chat',
      input_type: 'chat',
      tweaks: {},
      stream: false
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LANGFLOW_API_KEY}`,
        'User-Agent': 'Debug-Test/1.0',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('API Status:', response.status);
    console.log('API Headers:', Object.fromEntries(response.headers));

    const result = await response.text();
    console.log('API Response (first 1000 chars):', result);
    console.log('API Response (first 1000 chars):', result.substring(0, 1000));

    if (response.ok) {
      console.log('\n✅ SUCCESS: Langflow API is working!');
      try {
        const jsonResult = JSON.parse(result);
        console.log('Parsed JSON response:', JSON.stringify(jsonResult, null, 2));
      } catch (e) {
        console.log('Response is not JSON format');
      }
    } else {
      console.log('\n❌ ERROR: API call failed');
    }

  } catch (error) {
    console.error('\n❌ ERROR: API test failed:', error.message);
  }

  // Test alternative endpoint format
  // try {
  //   console.log('\n2. Testing alternative endpoint format...');
  //   const altApiUrl = `${process.env.LANGFLOW_ENDPOINT}/flows/${process.env.LANGFLOW_REVIEW_FLOW_ID}/run`;
  //   console.log('Alternative API URL:', altApiUrl);

  //   const response = await fetch(altApiUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${process.env.LANGFLOW_API_KEY}`,
  //       'User-Agent': 'Debug-Test/1.0',
  //     },
  //     body: JSON.stringify({
  //       input_value: testData,
  //       output_type: 'chat',
  //       input_type: 'chat'
  //     }),
  //   });

  //   console.log('Alternative API Status:', response.status);

  //   if (response.ok) {
  //     console.log('✅ Alternative endpoint works!');
  //     const result = await response.text();
  //     console.log('Alternative response (first 500 chars):', result.substring(0, 500));
  //   } else {
  //     const error = await response.text();
  //     console.log('❌ Alternative endpoint failed:', error.substring(0, 500));
  //   }

  // } catch (error) {
  //   console.error('Alternative endpoint test failed:', error.message);
  // }
}

debugLangflow();