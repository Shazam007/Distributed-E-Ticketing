const { CloudFormationClient, CreateStackCommand, DeleteStackCommand, DescribeStackEventsCommand  } = require("@aws-sdk/client-cloudformation");
const { readFile } = require("fs").promises;

const cloudformation = new CloudFormationClient({ region: "us-east-1" }); 
const stackName = 'EasyPass-Stack';
const templateFile = './cloudformation.yaml';

async function createStack() {
  try {
    const templateBody = await readFile(templateFile, 'utf-8');
    const params = {
      StackName: stackName,
      TemplateBody: templateBody
    };
    await cloudformation.send(new CreateStackCommand(params));
    console.log(`Stack ${stackName} creation initiated.`);
    await printStackEvents();
  } catch (err) {
    console.error('Error creating stack:', err);
  }
}

async function deleteStack() {
  try {
    const params = {
      StackName: stackName
    };
    await cloudformation.send(new DeleteStackCommand(params));
    console.log(`Stack ${stackName} deletion initiated.`);
    await printStackEvents();
  } catch (err) {
    console.error('Error deleting stack:', err);
  }
}

async function printStackEvents() {
    try {
      const params = {
        StackName: stackName
      };
      const response = await cloudformation.send(new DescribeStackEventsCommand(params));
      console.log('Stack events:');
      response.StackEvents.forEach(event => {
        console.log(`- ${event.ResourceStatus} : ${event.ResourceStatusReason}`);
      });
    } catch (err) {
      console.error('Error fetching stack events:', err);
    }
  }

async function main() {
  const action = process.argv[2];
  switch (action) {
    case 'create':
      await createStack();
      break;
    case 'delete':
      await deleteStack();
      break;
    default:
      console.log('Invalid action. Please specify "create" or "delete".');
  }
}

main();